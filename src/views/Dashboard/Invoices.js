// Chakra imports
import {
    Flex,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Grid,
    Switch,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button, ButtonGroup,
    IconButton,
  
    Select,
    Stack, HStack, VStack,StackDivider,
  
    Box,
    Tooltip,
  } from "@chakra-ui/react";
  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
  import TablesProjectRow from "components/Tables/TablesProjectRow";
  // table row
  import InvoicesRow from "components/Tables/InvoicesRow";
  import React,{useState,useEffect,useRef} from "react";
  import { tablesProjectData, tablesTableData } from "variables/general";
  import Pagination from "components/Pagination/Paginacion.js"
  import Capabilities from "components/Capabilities/Capabilities.js"
  
  import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, TypeDocument, InvoiceStatus,Customer,BatchChunk,Batch, Payment } from "models";
  
  import {USER_OPERATION} from "structures"
  
  
  // Amplify datastore
  import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
  
  
  
  
  import { useToast } from '@chakra-ui/react'
  
  // ICONS FI
  import { FiArrowLeft,FiPlusSquare, FiDollarSign, FiEdit} from "react-icons/fi";
  
  import { useTable } from "contexts/TableContext";
  import { useAuth } from "contexts/AuthContext";
  import { useUsers } from "contexts/UsersContext";
  import { jsx } from "@emotion/react";
  
  import { Redirect } from 'react-router-dom';

  
  import ListBatch from "components/product/ListBatch";

  import InvoiceRow from "components/Tables/InvoiceRow";


  import { format } from "date-fns";

  import DropDownTypeDocument from "components/invoices/DropDownTypeDocument";


function Invoices(){
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const borderRoleColor = useColorModeValue("white", "transparent");
    const bgRole = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
    
    const [items,setItems] = useState([])

    

    //const [customerModel,setCustomerModel] = useState({})

    // mensaje
    const toast = useToast()
  
    const {
        userOperationSelected,setUserOperationSelected,
        invoiceDraft,setInvoiceDraft,
        customerModel,setCustomerModel,
        applyChanges,setApplyChanges,
        openContext,closeContext,isOpenContext,getValueOpenContext,CTX
    } = useUsers()

    const [typeDocument,setTypeDocument] = useState(invoiceDraft.typeDocument ?? TypeDocument.INVOICE)

    const {userId} = useAuth()

    const { 
        editRow,
        edit,setEdit,
        index,setIndex, 
        total, setTotal,
        currentPage, setCurrentPage, 
        pageSize,
        editGlobalEnabled,setEditGlobalEnabled,
        tableRolName,setTableRolName,
        tableRolDisplayName,setTableRolDisplayName,
        settingStatus,setSettingStatus,
        idCurrentRow

    } = useTable()


    const handleTypeDocument = async(typeDocument) =>{
        setTypeDocument(typeDocument)

    }

    const getItems = async(page = 0,limit = 0) => {
        try{  
            const pageOfset = page - 1
            var condicion = (i) => i.and(
                i => [
                    i.cashierId.eq(userId),
                    i.clientId.eq(customerModel.id)
                ]
            )
            if(Object.keys(customerModel).length === 0){
                condicion = (i) => i.and(
                    i => [
                        i.cashierId.eq(userId)
                    ]
                )
            }

            console.log('8ab636d8-78d6-4b8f-a8dc-25fecaf217f7',condicion)
          
          const products = await DataStore.query(Invoice, 
            condicion, 
            {
            page: pageOfset,
            limit: limit,
            sort: (i) => i.createdAt(SortDirection.ASCENDING)
          })
    
          setItems(products)
          
        }catch(err){
          console.log('Code: 7def93d4-4d86-4165-88b9-0c7141788933 Error: recolectar items',err)
        }
    }

    /**
     * Consultando si contexto esta abierto
     */
    useEffect( async() => {
        const isOpen = await isOpenContext(CTX.CUSTOMER_ID)
        if(isOpen && Object.keys(customerModel).length === 0){
            const customerId = await getValueOpenContext(CTX.CUSTOMER_ID)
            const customer = await DataStore.query(Customer,customerId)
            setCustomerModel(customer)
            
        }

        return () =>{

        }
    }, []);
    

    /**
     * Iniciando la solicitudad de los items
     */
    useEffect( async() => {
        await DataStore.start();
        getItems(currentPage,pageSize) // pimera pagina

        return () =>{

        }
    }, []);
    
    
    useEffect( async() => {
        getItems(currentPage,pageSize) // pimera pagina
        return () =>{

        }
    }, [customerModel]);

      
    
    /**
     * Obtener la lista de usuarios cuando cambie el useState currentPage
     */
    useEffect( async() => {
        getItems(currentPage,pageSize)
    },[currentPage])

    /**
     * Obtener la lista de usuarios cuando cambie el useState total
     * @property {int} total es el total de elemetos que se van a paginar
     */
    useEffect( async() => {
        getItems(currentPage,pageSize)
    },[total])
    
   
    const handleCreateInvoice = async() =>{
        const isCustumerOpenContext = await isOpenContext(CTX.CUSTOMER_ID)
        if(isCustumerOpenContext){
            const custumerId = await getValueOpenContext(CTX.CUSTOMER_ID)
            const newInvoiceDraft = await DataStore.save(
                new Invoice({
                    cashierId: userId,
                    clientId: custumerId,
                    total: 0,
                    status: InvoiceStatus.DRAFT,
                    term: InvoiceTerm.PAYMENT_ON_DELIVERY,
                    fecha: format(new Date(), 'dd/MM/yy'),
                    typeDocument: typeDocument
                })
            );
            await openContext(CTX.INVOICE_DRAFT,newInvoiceDraft.id)
            setInvoiceDraft(newInvoiceDraft)

            const curtomer = await DataStore.query(
                Customer, 
                c => c.id.eq(custumerId)
              );
    
            setUserOperationSelected(curtomer)
            
            
            toast({
                title: 'Create invoice Draft',
                description: "We've create the Invoice Draft for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            
        }else{
            toast({
                title: 'Not Create invoice Draft',
                description: "Plese select Customer as Context",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        
        
        
        
    }

    const handleDelete = async(id) => {
        const invoice = await DataStore.query(Invoice, id)
        if(invoice.status == InvoiceStatus.DRAFT){
            await deleteItemsChunks(id)
            setItems(items.filter((item) => item.id !== id));

            toast({
                title: 'Delete invoice',
                description: "We've delete the Invoice for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        
            // eliminar del shema en segundo plano
       
            DataStore.delete(invoice)
        }else{
            toast({
                title: 'Opsss. not delete invoice',
                description: "We've NO delete the Invoice for you.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }

        
    }

    const deleteItemsChunks = async(invoiceId) =>{
        return new Promise( async(resolve,reject) => {
            try{
                const items = await DataStore.query(InvoiceItem, 
                    i => i.invoiceItemsId.eq(invoiceId),
                    { sort: (i) => i.dateCreated(SortDirection.ASCENDING) }
                );

                for (let index = 0; index < items.length; index++) {
                    const item = items[index];
                    const BatchChunks = await DataStore.query(BatchChunk, 
                        c => c.invoiceItemChunksId.eq(item.id)
                    );
        
                    for (let index = 0; index < BatchChunks.length; index++) {
                        const toBatchChunk = BatchChunks[index];
                        const batch = await DataStore.query(Batch, toBatchChunk.batchChunksId)
                        
                        if (batch) {
                            const updatedPost = await DataStore.save(
                                Batch.copyOf(batch, updated => {
                                    updated['quantity'] = updated.quantity + toBatchChunk.quantity
                                })
                            );
                            if(toBatchChunk){
                                DataStore.delete(toBatchChunk);
                            }
                        }
                    }
                    DataStore.delete(item)
                }
                resolve()
            }catch(err){
                console.log('9793cac5-80c2-473b-bbb9-24b774cfacbc',err)
            }

        })

    }

    const handleInvoiceCancel = async(id) =>{
        const invoice = await DataStore.query(Invoice, id)
        if(invoice.status == InvoiceStatus.SENT){
            await cancelledItemsChunks(id)
            
            const updatedPost = await DataStore.save(
                Invoice.copyOf(invoice, updated => {
                    updated['status'] = InvoiceStatus.CANCELLED
                })
            );
            
            do{
                const invoice = await DataStore.query(Invoice, id)
                if(invoice.status == InvoiceStatus.CANCELLED){
                    getItems(currentPage,pageSize)
                }
            }while(updatedPost != InvoiceStatus.CANCELLED)
            
        }else{
            toast({
                title: 'Opsss. not Canceled invoice',
                description: "We've NO canceled the Invoice for you.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        
    }

    const cancelledItemsChunks = async(invoiceId) =>{
        return new Promise( async(resolve,reject) => {
            try{
                const items = await DataStore.query(InvoiceItem, 
                    i => i.invoiceItemsId.eq(invoiceId),
                    { sort: (i) => i.dateCreated(SortDirection.ASCENDING) }
                );

                for (let index = 0; index < items.length; index++) {
                    const item = items[index];
                    const BatchChunks = await DataStore.query(BatchChunk, 
                        c => c.invoiceItemChunksId.eq(item.id)
                    );
        
                    for (let index = 0; index < BatchChunks.length; index++) {
                        const toBatchChunk = BatchChunks[index];
                        const batch = await DataStore.query(Batch, toBatchChunk.batchChunksId)
                        
                        if (batch) {
                            const updatedPost = await DataStore.save(
                                Batch.copyOf(batch, updated => {
                                    updated['quantity'] = updated.quantity + toBatchChunk.quantity
                                })
                            );
                            // if(toBatchChunk){
                            //     DataStore.delete(toBatchChunk);
                            // }
                        }
                    }
                    //DataStore.delete(item)
                }
                resolve()
            }catch(err){
                console.log('9793cac5-80c2-473b-bbb9-24b774cfacbc',err)
            }

        })

    }
    
    return (
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
            {invoiceDraft &&(
                <Redirect 
                    to={{
                        pathname: '/admin/invoice_create',
                    }} 
                />
            )}
            <Flex style={{padding: "0 0 10px 0"}}>
                <Card p='16px' >
                
                    <CardBody px='5px'>
                    
                    <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="email-alerts" mb="0">
                        Create Document
                        </FormLabel>
                       
                        <Stack direction={["column", "row"]} spacing="24px" display="flex">
                            <Box w="150px" h="40px" >
                                <DropDownTypeDocument typeDocument={typeDocument} onTypeDocument={handleTypeDocument} />
                            </Box>
                            <Box w="40px" h="40px" >
                                <IconButton aria-label="Search database" onClick={handleCreateInvoice} icon={<FiPlusSquare />} />
                            </Box>
                        </Stack>
                    
                    </FormControl>
                    
                    
                    </CardBody>  
                
                
                </Card>
            </Flex>
            <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
                <CardHeader p="6px 0px 22px 0px">
                    <Text fontSize="xl" color={textColor} fontWeight="bold">
                    Invoices Table
                    </Text>
                </CardHeader>
                
                <CardBody>
                    <Table variant="simple" color={textColor}>
                    <Thead>
                        <Tr my=".8rem" pl="0px" color="gray.400" >
                        <Th pl="0px" borderColor={borderColor} color="gray.400" >
                            Codigo de factura
                        </Th>
                        <Th borderColor={borderColor} color="gray.400" >Nombre cajero</Th>
                        <Th borderColor={borderColor} color="gray.400" >Nombre de cliente</Th>
                        <Th borderColor={borderColor} color="gray.400" >Notas</Th>
                        <Th borderColor={borderColor} color="gray.400" >Estado</Th>
                        <Th borderColor={borderColor} color="gray.400" >Tipo</Th>
                        <Th borderColor={borderColor} color="gray.400" >Terms</Th>
                        <Tooltip label="Pendiente de pago">
                            <Th borderColor={borderColor} color="gray.400" >P.P</Th>
                        </Tooltip>
                        <Th borderColor={borderColor}>Total</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        
                        {items.map( (item, index, arr) => {
                        return (
                            <InvoiceRow
                            id={item.id}
                            index={index}
                            cashierId={item.cashierId}
                            clientId={item.clientId}
                            notes={item.notes}
                            //quantity={item.quantity}
                            status={item.status}
                            term={item.term}
                            total={item.total} // model
                            typeDocument={item.typeDocument}
                            currentPage={currentPage}
                            // functions
                            onDelete={handleDelete}
                            onInvoiceCancel={handleInvoiceCancel}
                            //fillInputsEdit={fillInputsEdit}
                            //setListBatchStatus={setListBatchStatus}
                            
                            isLast={false}
                            logo={''}
                            />
                        );
                        })}
                    </Tbody>
                    </Table>
                    <Pagination
                    total={total}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                    />
                </CardBody>
            </Card>
            
        </Flex>
    )
}


export default Invoices