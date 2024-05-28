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

import {Capability, PaymentMethod, Payment} from "models"
import { FaLessThanEqual } from "react-icons/fa";

import { FiEdit, FiDelete, FiSettings, FiSave, FiArrowLeft, FiDollarSign, FiCheckCircle, FiBox, FiLayers, FiEye} from "react-icons/fi";
import { position } from "stylis";
import ListRoles from "components/dropdowns/ListRoles";

import { useUsers } from "contexts/UsersContext";
import { useTable } from "contexts/TableContext"; 

import ApsInput from "./Propertys/ApsInput";
import ApsDropDown from "./Propertys/ApsDropDown";

import {ProductPrice,Batch,BatchStatus,Invoice,InvoiceStatus} from "models";

import CustomerName from "components/Customers/CustomerName";

import { ImCancelCircle } from "react-icons/im";


// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';

import Moneda from "components/Monedas/Moneda";
import { TypeDocument } from "models";

import WhatInvoiceStatus from "components/invoices/WhatInvoiceStatus";
import WhatInvoiceTerm from "components/invoices/WhatInvoiceTerm";

import { FaFileInvoiceDollar } from "react-icons/fa6";

import UserName from "components/Users/UserName";


import { OptionsPaymentMethod } from "components/Payments/DropDownPaymentMethod";

function PaymentRow(props) {
  /**
   * @property {String} displayname nombre a mostrar en el app
   * @property {String} name Nombre del rol
   * @property {Funcion} handleCapabilities manejador para activar capabilities es handle esta el componente /roles
   */

  const {
    isLast,logo,
    id,index,
    userId,clientId,reference,method,amount,invoicePaymentId,createdAt,
    

    onInvoiceCancel,
    onUpdateProperty,
    
    //functions
    fillInputsEdit,
    onDelete,
    setListBatchStatus
    
  } = props;

  const {
    invoiceDraft,setInvoiceDraft,
    openContext,closeContext,isOpenContext,getValueOpenContext,CTX
  } = useUsers()

  const [price, setPrice] = useState([])
  const [productBatches,setProductBatches] = useState([])
  const [paymentInvoice,setPaymentInvoice] = useState([])
  //const [productQuantity,setProductQuantity] = useState(0)
  
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

  useEffect( async() =>{
    //invoicePaymentId
    const invoice = await DataStore.query(Invoice, invoicePaymentId);
    setPaymentInvoice(invoice)
    
    return () =>{

    }
  },[invoicePaymentId])

  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");


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

  

  return (
    <>
      <Stack direction={["column", "row","left"]} spacing="24px">
        
        
        <Controls 
          id={id} 
          status={status} 
          onView={handleView} 
          onEdit={handleEdit} 
          onInvoiceCancel={onInvoiceCancel}
          onDelete={onDelete}
          />

      </Stack>    
      <Tr>
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
        
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
           <Text
            fontSize="md"
            color={titleColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {/* {paymentInvoice.clientId} */}
            <CustomerName id={paymentInvoice.clientId}/>
            
          </Text>
         
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Text
            fontSize="md"
            color={titleColor}
            fontWeight="bold"
            minWidth="100%"
          >
            <UserName userId={paymentInvoice.cashierId} />
          </Text>
          
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
           <Text
            fontSize="md"
            color={titleColor}
            fontWeight="bold"
            minWidth="100%"
          >
            
            {invoicePaymentId}
          </Text>
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
           {/* <WhatPaymentMethod  paymentMethod={method}/> */}
           <ApsDropDown
              updateProperty={onUpdateProperty}
              id={id} 
              elements={<OptionsPaymentMethod />}
              placeholder="Ingrese el metodo de pago"
              value= {method}
              keyProperty="method"
              CustomText={WhatPaymentMethod}
          />
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          {/* <Moneda amount={amount}/> */}
          <ApsInput
              updateProperty={onUpdateProperty}
              id={id} 
              type="text"
              placeholder="Ingrese el monto"
              value= {parseFloat(amount).toFixed(2)}
              keyProperty="amount"
              isCurrency={true}
          />
        </Td>
       
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <ApsInput
              updateProperty={onUpdateProperty}
              id={id} 
              type="text"
              placeholder="Ingrese la referencia"
              value= {reference}
              keyProperty="reference"
          />
          
        </Td>

        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Text
            fontSize="md"
            color={titleColor}
            fontWeight="bold"
            minWidth="100%"
          >
            <UserName userId={userId} />
          </Text>
          
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Text
            fontSize="md"
            color={titleColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {createdAt}
          </Text>
          
        </Td>
        
        
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          {/* <Text
            fontSize="md"
            color={titleColor}
            fontWeight="bold"
            minWidth="100%"
          >
            <WhatInvoiceTerm term={term} />
          </Text> */}
          
        </Td>
       
        
       
        
      </Tr>
    </>
  );
}







function WhatPaymentMethod(props){
  const {value} = props
  
  switch(value){
    case PaymentMethod.CASH:
      return <>Efectivo</>
    case PaymentMethod.CREDIT_CARD:
      return <>Tarjeta de credito</>
    case PaymentMethod.DEBIT_CARD:
      return <>Tarjeta de debito</>
    case PaymentMethod.BANK_TRANSFER:
      return <>Tranferencia Bancaria</>
    case PaymentMethod.OTHER:
      return <>Otro</>
    default:
      return null
  }
}

function Controls(props){
  const {id,status,onView,onEdit,onInvoiceCancel,onDelete,onInvoicePayment} = props
  
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
            
          </>
        )
      default:
        return null
      
  }
}

export default PaymentRow;
