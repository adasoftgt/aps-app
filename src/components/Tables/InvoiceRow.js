import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
  Input,
  Grid,
  GridItem,
  IconButton,
  Switch,
  FormControl,
  FormLabel,
  FormHelperText,
  Center,
  Stack,
  Box,
  HStack,
} from "@chakra-ui/react";

import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Tooltip,
} from "@chakra-ui/react"


import {React,useEffect,useState,useRef, useMemo} from "react";

import {Capability} from "models"
import { FaLessThanEqual } from "react-icons/fa";

import { FiEdit, FiDelete, FiSettings, FiSave, FiArrowLeft, FiDollarSign, FiCheckCircle, FiBox, FiLayers, FiEye, FiExternalLink} from "react-icons/fi";
import { position } from "stylis";
import ListRoles from "components/dropdowns/ListRoles";

import { useUsers } from "contexts/UsersContext";
import { useTable } from "contexts/TableContext"; 

import ApsInput from "./Propertys/ApsInput";

import {ProductPrice,Batch,BatchStatus,Invoice,InvoiceStatus,Payment} from "models";

import CustomerName from "components/Customers/CustomerName";

import { ImCancelCircle } from "react-icons/im";


// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';

import Moneda from "components/Monedas/Moneda";
import { TypeDocument } from "models";

import WhatInvoiceStatus from "components/invoices/WhatInvoiceStatus";
import WhatInvoiceTerm from "components/invoices/WhatInvoiceTerm";

import { FaFileInvoiceDollar } from "react-icons/fa6";


import { useToast } from "@chakra-ui/react";

import { Redirect } from 'react-router-dom';

import UserName from "components/Users/UserName";

function InvoiceRow(props) {
  
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  
  const balanceActivoColor = useColorModeValue("gray", "gray");
  
  /**
   * @property {String} displayname nombre a mostrar en el app
   * @property {String} name Nombre del rol
   * @property {Funcion} handleCapabilities manejador para activar capabilities es handle esta el componente /roles
   */

  const {
    isLast,logo,
    id,index,
    cashierId,clientId,notes,status,term,total,typeDocument,
    currentPage,
    

    onInvoiceCancel,
    
    //functions
    fillInputsEdit,
    onDelete,
    setListBatchStatus
    
  } = props;

  const [redirectPayments,setRedirectPayments] = useState(false)

  const toast = useToast()

  const {
    invoiceDraft,setInvoiceDraft,
    invoiceModel,setInvoiceModel,
    openContext,closeContext,isOpenContext,getValueOpenContext,CTX
  } = useUsers()

  const [price, setPrice] = useState([])
  const [productBatches,setProductBatches] = useState([])
  const [remainingBalance,setRemainingBalance] = useState(0)

  const [remainingBalanceColor,setRemainingBalanceColor] = useState('transparent')
  
  const productQuantity = useMemo( () =>{
    let contador = 0
    productBatches.map( (batch) => {
      contador = contador + batch.quantity 
    })

    return contador
       
  },[productBatches])

 
  

  useEffect( async() =>{
    // precios
    const prices = await DataStore.query(ProductPrice, 
      c => c.productPriceProductId.eq(id),
      { sort: (s) => s.dateCreated(SortDirection.DESCENDING),limit: 1 }
    );
    const price = prices[0]
    setPrice(price)

    // cantidad de producto
    const batches = await DataStore.query(Batch, 
      c => c.productBatchesId.eq(id),
      { sort: (s) => s.expiration_date(SortDirection.ASCENDING) }
    );

    setProductBatches(batches)

    //setProductQuantity(contador)
    
    return () => {

    }
  },[])

  


  const { 
    editGlobalEnabled,
    settingStatus,setSettingStatus,
    idCurrentRow,
  } = useTable()

  const [editNameStatus,setEditNameStatus] = useState(false)
  
  const handleEdit = async(id) =>{
    await openContext(CTX.INVOICE_DRAFT,id)
    const invoice = await DataStore.query(Invoice, id);
    setInvoiceDraft(invoice)
  }

  const handleBatch = (id) => {
    console.log('llegue aqui handleBatch')
    idCurrentRow.current = id
    setListBatchStatus(true)
  }

  const handleView = async(id) =>{
    await openContext(CTX.INVOICE_DRAFT,id)
    const invoice = await DataStore.query(Invoice, id);
    setInvoiceDraft(invoice)
  }

  const handleInvoiceOpenContext = async(id) =>{
    //const isOpen = await isOpenContext(CTX.INVOICE_ID)
    //if(!isOpen){
      await openContext(CTX.INVOICE_ID,id)
      const invoice = await DataStore.query(Invoice, id);
      setInvoiceModel(invoice)
      toast({
        title: 'Open Context Invoice',
        description: "We've Open Context for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    //}
  }

  const handleInvoicePayment = (id) =>{
    handleInvoiceOpenContext(id)
    setRedirectPayments(true)
   
    
    
    
  }
  /**
   * Este efecto cargar el balance que tienes la facturas
   */
  useEffect( async() =>{

    const items = await DataStore.query(Payment, 
        i => i.invoicePaymentId.eq(id),
    );
    // monto pagado
    var amount = 0

    for (let index = 0; index < items.length; index++) {
        const element = items[index];
        amount = amount + element.amount 
    }

    const balance = parseFloat(total) - parseFloat(amount) 
    setRemainingBalance(balance)
    
    return () =>{

    }
  },[total,currentPage,id])


  useEffect( () =>{
    console.log('c808d622-b5f9-4e67-bbd5-4790cd749771',remainingBalance)
    if(remainingBalance != 0){
      setRemainingBalanceColor(balanceActivoColor)
    }else{
      setRemainingBalanceColor('transparent')
    }
  },[remainingBalance,currentPage,id])
  return (
    <>
      {redirectPayments &&(
        <Redirect 
            to={{
                pathname: '/admin/payments',
            }} 
        />
      )}
      <Stack direction={["column", "row","left"]} spacing="24px">
        
        
        <Controls 
          id={id} 
          status={status} 
          onView={handleView} 
          onEdit={handleEdit} 
          onInvoiceCancel={onInvoiceCancel}
          onDelete={onDelete}
          onInvoiceOpenContext={handleInvoiceOpenContext}
          onInvoicePayment={handleInvoicePayment}
          />

      </Stack>    
      <Tr style={{backgroundColor:remainingBalanceColor}}>
        <Td
          minWidth={{ sm: "250px" }}
          pl="0px"
          borderColor={borderColor}
          borderBottom={isLast ? "none" : null}
        >
          <Text
            fontSize="md"
            color={titleColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {id}
          </Text>
        </Td>
        {/* Nombre del cliente */}
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
           <CustomerName id={clientId}/>
        </Td>
        {/* UserName del Vendedor */}
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Text
            fontSize="md"
            color={titleColor}
            fontWeight="bold"
            minWidth="100%"
          >
            <UserName userId={cashierId}/>
          </Text>
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Text
            fontSize="md"
            color={titleColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {notes ? 'SI' : 'NO'}
          </Text>
          
        </Td>
       
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Text
            fontSize="md"
            color={titleColor}
            fontWeight="bold"
            minWidth="100%"
          >
            
            <WhatInvoiceStatus status={status}/>
          </Text>
          
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Text
            fontSize="md"
            color={titleColor}
            fontWeight="bold"
            minWidth="100%"
          >
            <WhatDocument typeDocument={typeDocument} />
          </Text>
          
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Text
            fontSize="md"
            color={titleColor}
            fontWeight="bold"
            minWidth="100%"
          >
            <WhatInvoiceTerm term={term} />
          </Text>
          
        </Td>
        <Td>
          <Moneda amount={remainingBalance}/>
        </Td>

        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Text
            fontSize="md"
            color={titleColor}
            fontWeight="bold"
            minWidth="100%"
          >
            <Moneda amount={parseFloat(total).toFixed(2)}/>
          </Text>
          
        </Td>
        
      </Tr>
    </>
  );
}





function WhatDocument(props){
  const {typeDocument} =props
  
  switch(typeDocument){
    case TypeDocument.INVOICE:
      return(
        <>Factura</>
      )
    case TypeDocument.SHIPPING:
      return(
        <>Envio</>
      )
    case TypeDocument.NOTE:
      return(
        <>Nota</>
      )
    default:
      return null
      
    

  }
}

function Controls(props){
  const {id,status,onView,onEdit,onInvoiceCancel,onDelete,onInvoicePayment,onInvoiceOpenContext} = props
  
  switch(status){
    case InvoiceStatus.DRAFT:
      return (
        <>
          <Box w="40px" h="40px" bg="transparent">
            <IconButton  aria-label="Delete" icon={<FiDelete />} onClick={() => onDelete(id)} />
          </Box>
          <Box w="40px" h="40px" bg="transparent">
            <IconButton aria-label="Settings" icon={<FiEdit />} onClick={() => onEdit(id)} />
          </Box>
        </>
        
      )
    case InvoiceStatus.CANCELLED:
    case InvoiceStatus.PAID:
    case InvoiceStatus.OVERDUE:
      return(
        <Box w="40px" h="40px" bg="transparent">
          <IconButton aria-label="Settings" icon={<FiEye />} onClick={() => onView(id)} />
        </Box>
      )
      case InvoiceStatus.SENT:
        return (
          <>
            <Box w="40px" h="40px" bg="transparent">
              <Tooltip label='Eliminar Factura'> 
                <IconButton  aria-label="Delete" icon={<FiDelete />} onClick={() => onDelete(id)} />
              </Tooltip>
            </Box>
            <Box w="40px" h="40px" bg="transparent">
              <Tooltip label='Ver factura'>
                <IconButton aria-label="Settings" icon={<FiEye />} onClick={() => onView(id)} />
              </Tooltip>
            </Box>
            <Box w="40px" h="40px" bg="transparent">
              <Tooltip label='Canceled'>
                <IconButton aria-label="Settings" icon={<ImCancelCircle />} onClick={() => onInvoiceCancel(id)} />
              </Tooltip>
            </Box>
            <Box w="40px" h="40px" bg="transparent">
              <Tooltip label='Pagos'>
                <IconButton aria-label="Settings" icon={<FaFileInvoiceDollar />} onClick={() => onInvoicePayment(id)} />
              </Tooltip>
            </Box>
            <Box w="40px" h="40px" bg="transparent">
              <Tooltip label='Agregar a contexto'>
                <IconButton aria-label="Settings" icon={<FiExternalLink />} onClick={() => onInvoiceOpenContext(id)} />
              </Tooltip>
            </Box>
            
          </>
        )
      default:
        return null
      
  }
}

export default InvoiceRow;
