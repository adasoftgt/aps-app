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
    Badge,
    Icon,
    Tooltip,
  } from "@chakra-ui/react";

  import { VSeparator, HSeparator } from "components/Separator/Separator"
  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
  import TablesProjectRow from "components/Tables/TablesProjectRow";
  // table row
  import InvoicesRow from "components/Tables/InvoicesRow";
  import React,{useState,useEffect,useRef,useMemo} from "react";
  import { tablesProjectData, tablesTableData } from "variables/general";
  import Pagination from "components/Pagination/Paginacion.js"
  import Capabilities from "components/Capabilities/Capabilities.js"
  
  import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, InvoiceStatus, InvoiceItemStatus, UserConfiguration,BatchChunk,Batch} from "models";
  
  import {USER_OPERATION} from "structures"
  
  import InvoiceCreateRow from "./InvoiceCreateRow";
  import InvoiceCreateTotal from "./InvoiceCreateTotal";
  
  
  // Amplify datastore
  import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
  
  
  
  
  import { useToast } from '@chakra-ui/react'
  
  // ICONS FI
  import { FiArrowLeft,FiPlusSquare, FiDollarSign, FiEdit, FiTrash2, FiSave } from "react-icons/fi";
  import { FaCheck } from "react-icons/fa";
  
  import { useTable } from "contexts/TableContext";
  import { useAuth } from "contexts/AuthContext";
  import { useUsers } from "contexts/UsersContext";
  import { jsx } from "@emotion/react";

  import { Redirect } from 'react-router-dom';

  import InfoCustomer from "components/Customers/Info2";

  import { v4 as uuidv4 } from 'uuid';

  import DropDownTypeDocument from "./DropDownTypeDocument";

  import {
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
  } from '@chakra-ui/react'

  import { Textarea } from '@chakra-ui/react'

import Moneda from "components/Monedas/Moneda";
import { TypeDocument } from "models";


function ListItems(){
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const borderRoleColor = useColorModeValue("white", "transparent");
    const bgRole = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
    
    const {
        userOperationSelected,setUserOperationSelected,
        invoiceDraft,setInvoiceDraft,
        configurations,
        openContext,closeContext,isOpenContext,getValueOpenContext,CTX,
    } = useUsers()


    const { userId } = useAuth()


    // mensaje
    const toast = useToast()
    const [items,setItems] = useState([])

    const [customerId,setCustomerId] = useState('')

    const [typeDocument,setTypeDocument] = useState(invoiceDraft.typeDocument ?? TypeDocument.INVOICE)

    const [totalInvoice,setTotalInvoice] = useState(0)

    const quantityRequest = useRef(0)

    const notes = useRef('')
    const timeoutId = useRef(null)
    //const [notes,setNotes] = useState('')

    
    const handleUpdateItem = async(index,copyof = false,property = false,newValor = false) =>{
        //const itemsUnmutated = [...items]
        
        //const invoiceItem = items[index]
        const invoiceItem = await DataStore.query(InvoiceItem, items[index].id)

        if(property && newValor){
            const newInvoiceItem = InvoiceItem.copyOf(invoiceItem, updated => {
                updated['price'] = items[index].price
                updated['total'] = items[index].total
                updated['status'] = items[index].status
                updated['dateCreated'] = items[index].dateCreated

                
                switch(property){
                    case 'price':
                    case 'total':
                        console.log('event.target.value',property,newValor)
                        updated[property] = parseFloat(newValor)
                        break;
                    default:
                        updated[property] = newValor
                        break;
                }
                    
            })
            items[index] = newInvoiceItem
            
            if(property == 'total'){
                handleTotal()
            }

            DataStore.save(
                newInvoiceItem
            )

            
            
        }else{
            
           /* items[index] = copyof
            DataStore.save(
                copyof
            )*/

        }

    
        
    }

    const handleTotal = async() =>{
        if(invoiceDraft){           
            var amount = 0
            items.map( (item,index,arr) =>{
                amount = parseFloat(amount) +  parseFloat(item.total)
            })
            setTimeout( async() => {
                const invoice = await DataStore.query(Invoice,invoiceDraft.id)
                const updatedInvoice = await DataStore.save(
                    Invoice.copyOf(invoice, updated => {
                        updated['total'] = amount
                    })
                ); 
            }, 50);
            setTotalInvoice(amount)
        }
        
        
    }

    // useEffect( ()=>{
    //     if(invoiceDraft){
            
    //         var amount = 0
    //         items.map( (item,index,arr) =>{
    //             amount = parseFloat(amount) +  parseFloat(item.total)
    //         })
    //         console.log('amount amount',amount)
    //         setTotalInvoice(amount) 
            
    //     }
    // },[items])
    
    

   

    /**
     * El contexto useUsers se revisa si existe la configuacion de invoice
     */

    useEffect( () =>{
        getItems()
    },[userOperationSelected])

    /**
     * @deprecated se esta deprecando este codigo porque se dio cuenta que ingresar a cualquier factura ya se tiene seteado a que customer se esta haciendo la factura
     */
    // useEffect ( async() =>{
       
    //     switch(invoiceDraft.status){
    //         case InvoiceStatus.DRAFT:
    //             const isOpenContextCustomer = isOpenContext(CTX.CUSTOMER_ID)
    //             if(isOpenContextCustomer){
    //                 const getValueOpenContext_aux = await getValueOpenContext(CTX.CUSTOMER_ID)
    //                 setCustomerId(getValueOpenContext_aux)
    //             }
    //             break;
    //         default:
    //             setCustomerId(invoiceDraft.clientId)
    //             break;
    //     }
        
    // },[invoiceDraft]) 


    const getItems = async() =>{
        if(invoiceDraft){

            const items = await DataStore.query(InvoiceItem, 
                i => i.invoiceItemsId.eq(invoiceDraft.id),
                { sort: (i) => i.dateCreated(SortDirection.ASCENDING) }
            );
            setItems(items)
        }
    }

    useEffect( async() =>{
        
        getItems()

        return () =>{

        }
    },[invoiceDraft])


        
    

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
        idCurrentRow,
        updateTotal,setUpdateTotal

    } = useTable()
    
    
    
    // const getItems = async() =>{
    //     const items = await DataStore.query(ProductPrice, 
    //         i => i.invoiceItemsId.eq(),
    //         { sort: (s) => s.dateCreated(SortDirection.DESCENDING),limit: 1 }
    //       );
    // }

    /**
     * Creacion de item de la factura
     */
    const handleCreateItem = async() =>{
        /*
        id: ID!
        product: Product @belongsTo
        chunks: [BatchChunk] @hasMany
        price: Float!
        total: Float!
        status: InvoiceItemStatus!
        invoice: Invoice @belongsTo
        dateCreated: String!
         */
        const date = new Date(Date.now()).toUTCString()
        const newItem = new InvoiceItem({
            price: 0.00,
            total: 0.00,
            status: InvoiceItemStatus.DRAFT,
            invoice: invoiceDraft,
            dateCreated: date,
        })
        const newInvoiceItemDraft = await DataStore.save(newItem);
        
        // concat para no alterar el estado original del map y que recarguen todos los elementos
        setItems([...items,newItem])
        //getItems()
        
        
    }

    const handleDelete = async(itemId,quantity) =>{
        
        await deleteChuncks(itemId,quantity)
        setItems(items.filter((item) => item.id !== itemId));
        
        // eliminar del shema en segundo plano
        const invoiceItem = await DataStore.query(InvoiceItem, itemId)
        //console.log('invoiceItem invoiceItem',invoiceItem)
        DataStore.delete(invoiceItem)
    }


    const deleteChuncks = async(invoiceItemId,quantity) =>{
        return new Promise( async(resolve,reject) => {
            quantityRequest.current = quantity * (-1)
            const BatchChunks = await DataStore.query(BatchChunk, 
                c => c.invoiceItemChunksId.eq(invoiceItemId)
            );

            for (let index = 0; index < BatchChunks.length; index++) {
                const toBatchChunk = BatchChunks[index];
                const batch = await DataStore.query(Batch, toBatchChunk.batchChunksId)
                
                if (batch) {
                    if(quantityRequest.current > toBatchChunk.quantity){
                        quantityRequest.current = quantityRequest.current + toBatchChunk.quantity
                        const updatedPost = await DataStore.save(
                            Batch.copyOf(batch, updated => {
                                updated['quantity'] = updated.quantity + toBatchChunk.quantity
                            })
                        );
                        if(toBatchChunk){
                            DataStore.delete(toBatchChunk);
                        }
                    }else{
                        const updatedPost = await DataStore.save(
                            Batch.copyOf(batch, updated => {
                                updated['quantity'] = updated.quantity - quantityRequest.current
                            })
                        );
                        const updatedChunk = await DataStore.save(
                            BatchChunk.copyOf(toBatchChunk, updated => {
                                updated['quantity'] = updated.quantity + quantityRequest.current
                            })
                        );
                        break;
                    }
                }
            }
            resolve()
        })



    }

    

    const handleDeleteDraft = async() =>{
        const isOpenContextDraft = await isOpenContext(CTX.INVOICE_DRAFT)
            
        if(isOpenContextDraft){
            try{
                const invoiceItems = await DataStore.query(InvoiceItem, 
                    c => c.invoiceItemsId.eq(invoiceDraft.id)
                );
                
                //console.log('invoiceItems afdasdasfd',invoiceItems)

                for (let index = 0; index < invoiceItems.length; index++) {
                    const toInvoiceItem = invoiceItems[index];
                    const BatchChunks = await DataStore.query(BatchChunk, 
                        c => c.invoiceItemChunksId.eq(toInvoiceItem.id)
                    );
                    
                    for (let index = 0; index < BatchChunks.length; index++) {
                        const toBatchChunk = BatchChunks[index];
                        const batch = await DataStore.query(Batch, toBatchChunk.batchChunksId)
                        console.log('batch 100',batch)
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

                    if(toInvoiceItem){
                        DataStore.delete(toInvoiceItem);
                    }
                    
                }
            }catch(err){
                console.log('invoiceItems',err)
            
            }
                
            try{ 

                
                const invoice_id = await getValueOpenContext(CTX.INVOICE_DRAFT)
                
                const toInvoiceDraft = await DataStore.query(Invoice, 
                    c => c.id.eq(invoice_id)
                );

                if(toInvoiceDraft){
                    await DataStore.delete(toInvoiceDraft);
                }   

                
                
            }catch(err){
                console.log('toInvoiceDraft',err)
            }

            toast({
                title: 'Delete invoice Draft',
                description: "We've delete the Invoice Draft for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            closeContext(CTX.INVOICE_DRAFT)
            setInvoiceDraft(false)
            getItems()
        }
        
    }
    
    const bgColor = useColorModeValue("gray.200", "gray.700");
    const color = useColorModeValue("gray.700", "gray.200");

    const handleTeminarFactura = async() =>{
        //openContext,closeContext,isOpenContext,getValueOpenContext,CTX,
        
        const open = await isOpenContext(CTX.INVOICE_DRAFT)
        if(open){
            const invoice_id = await getValueOpenContext(CTX.INVOICE_DRAFT)
            const invoice = await DataStore.query(Invoice,invoice_id);
            const updatedPost = await DataStore.save(
                Invoice.copyOf(invoice, updated => {
                    updated.status = InvoiceStatus.SENT,
                    updated.total = totalInvoice
                })
            );
            
            toast({
                title: 'Invoice terminate',
                description: "We've teminate the Invoice for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            
            await closeContext(CTX.INVOICE_DRAFT)
            setInvoiceDraft(false)

        }
        
        
       
        
    }
    const invoiceItemsMap = useMemo( () =>
        items.map((item, index, arr) => {
                                    
            const {
                id,
                quantity,
                bonus,
                price,
                total,
                status,
                productItemsId,
            } = item
            
            if(index == (items.length -1 )){
                handleTotal()
            }

            return (
                <>
                    <InvoiceCreateRow 
                        itemId={id}
                        index={index}
                        key={id}
                        quantity={quantity}
                        bonus={bonus}
                        price={price}
                        total={total}
                        status={status}
                        productItemsId={productItemsId}
                        handleTotal={handleTotal}
                        handleDelete={handleDelete}
                        onUpdateItem={handleUpdateItem}
                    />
                </>
            );
        })
        ,[items])

    const handleReturnInvoicesList = async() =>{
        await closeContext(CTX.INVOICE_DRAFT)
        setInvoiceDraft(false)
    }

    useEffect( () =>{
        notes.current = invoiceDraft.notes
    },[])
    const handleNotes = async(note) =>{
        

        // Cancelar cualquier temporizador de guardado anterior
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        // Establecer un nuevo temporizador de guardado
        const newTimeoutId = setTimeout( async() => {
            const invoice = await DataStore.query(Invoice,invoiceDraft.id);
            const updatedInvoce = await DataStore.save(
                Invoice.copyOf(invoice, updated => {
                    updated.notes = notes.current
                })
            );
        }, 5); // Tiempo de espera inicial (500ms)

        // Actualizar el ID del temporizador
        timeoutId.current = newTimeoutId
        notes.current = btoa(note)
    }


    const handleTypeDocument = async(typeDocument) =>{
        setTypeDocument(typeDocument)
        const invoice = await DataStore.query(Invoice,invoiceDraft.id);
        const updatedInvoce = await DataStore.save(
            Invoice.copyOf(invoice, updated => {
                updated.typeDocument = typeDocument
            })
        );
        
    }

   

    return (
        <>
            {!invoiceDraft &&(
                <Redirect to={{
                    pathname: '/admin/invoices',
                }} />
            )}
            {/* {userOperationSelected ?( */}
                <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
                    <Flex style={{padding: "0 0 10px 0"}}>
                        <Card p='16px' >
                            <CardBody px='5px' style={{ textAlign: 'center' }}>
                                {invoiceDraft.status}
                            </CardBody>
                        </Card>
                    </Flex>
                    <InfoCustomer id={invoiceDraft.clientId} />
                    <Flex style={{padding: "0 0 10px 0"}}>
                        <Card p='16px' >
                        
                            <CardBody px='5px'>
                                <VStack
                                    //divider={<StackDivider borderColor="gray.200" />}
                                    spacing={3}
                                    align="stretch"
                                    >
                                    <Box h="40px" >
                                        <FormControl display="flex" alignItems="center">
                                            <FormLabel htmlFor="email-alerts" mb="0">
                                            Necesitas editar
                                            </FormLabel>
                                            <Switch 
                                            id="email-alerts" 
                                            isChecked={editGlobalEnabled} // Vincula el estado al Switch
                                            onChange={() => setEditGlobalEnabled(!editGlobalEnabled)} // Actualiza el estado al cambiar
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box w='40px' h='40px'>
                                        <FormControl display="flex" alignItems="center">
                                            <Tooltip label="Return a invoice">
                                                <IconButton aria-label="Search database" onClick={handleReturnInvoicesList} icon={<FiArrowLeft />} />
                                            </Tooltip>
                                        </FormControl> 
                                    </Box>
                                </VStack>
                                -----------------------------
                                <HStack 
                                    spacing={3}
                                    align="stretch"
                                >
                                    
                                    
                                    <Controls 
                                        status={invoiceDraft.status}
                                        onCreateItem={handleCreateItem}
                                        onDeleteDraft={handleDeleteDraft}
                                        onTeminarFactura={handleTeminarFactura}
                                        onTypeDocument={handleTypeDocument}
                                        typeDocument={typeDocument}
                                    />



                                    <Box w='250px' h='40px'>
                                        <Text fontSize="4xl">
                                            <Moneda amount={parseFloat(totalInvoice).toFixed(2)} />
                                        </Text>
                                    </Box>
                                </HStack>
                                
                                
                                
                            </CardBody>  
                        
                        
                        </Card>
                    </Flex>
                    <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
                        <CardHeader p="6px 0px 22px 0px">
                            <Text fontSize="xl" color={textColor} fontWeight="bold">
                            Invoice Create Table
                            </Text>
                        </CardHeader>
                        
                        <CardBody>
                            <Table  key={uuidv4()} variant="simple" color={textColor}>
                            <Thead  key={uuidv4()}>
                                <Tr my=".8rem" pl="0px" color="gray.400" >
                                <Th pl="0px" borderColor={borderColor} color="gray.400" >
                                    SKU
                                </Th>
                                <Th borderColor={borderColor} color="gray.400" >Nombre</Th>
                                <Th borderColor={borderColor} color="gray.400" >Descripción</Th>
                                <Th borderColor={borderColor} color="gray.400" >Cantidad</Th>
                                <Th borderColor={borderColor} color="gray.400" >C/Bonificación</Th>
                                <Th borderColor={borderColor} color="gray.400" >---- Precio -----</Th>
                                <Th borderColor={borderColor} color="gray.400" >Tipo de precio</Th>
                                <Th borderColor={borderColor} color="gray.400" >Total</Th>
                                </Tr>
                            </Thead>
                            <Tbody  key={uuidv4()}>
                                
                                {
                                    items.map((item, index, arr) => {
                                        
                                        const {
                                            id,
                                            quantity,
                                            bonus,
                                            price,
                                            total,
                                            status,
                                            productItemsId,
                                        } = item
                                        
                                        return (
                                            <>
                                                <InvoiceCreateRow 
                                                    itemId={id}
                                                    index={index}
                                                    key={id}
                                                    quantity={quantity}
                                                    bonus={bonus}
                                                    price={price}
                                                    total={total}
                                                    status={status}
                                                    productItemsId={productItemsId}
                                                    handleTotal={handleTotal}
                                                    handleDelete={handleDelete}
                                                    onUpdateItem={handleUpdateItem}
                                                />
                                            </>
                                        );
                                    })
                                }
                                    
                                <InvoiceCreateTotal total={totalInvoice}/>
                                
                                
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
                    <Flex style={{padding: "0 0 10px 0"}}>
                        <Card p='16px' >
                            <CardBody px='5px'>
                                <Text fontSize='2xl'>
                                    Notas de factura
                                </Text>
                                <Textarea height="200px" placeholder='Here is a sample placeholder' defaultValue={atob(invoiceDraft.notes ?? 'dGV4dG8gc2luIGZvcm1hdG8=')} onChange={(e) => handleNotes(e.target.value)}/>
                            </CardBody>
                        </Card>
                    </Flex>
                    
                </Flex>
            {/* ):(
                <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
                    porfavor seleccione un usuario
                </Flex>
            )} */}
        </>
    )
}

function Controls(props){
    const  {status,onCreateItem,onDeleteDraft,onTeminarFactura,onTypeDocument,typeDocument} = props
    
    switch(status){
        case InvoiceStatus.DRAFT:
            return(
                <>
                <Box w='40px' h='40px'>
                    <FormControl display="flex" alignItems="center">
                        <Tooltip label="Create Item">
                            <IconButton aria-label="Search database" onClick={onCreateItem} icon={<FiPlusSquare />} />
                        </Tooltip>
                    </FormControl> 
                </Box>
                <Box w='40px' h='40px'>
                    <FormControl display="flex" alignItems="center">
                        <Tooltip label="Delete Draft">
                            <IconButton aria-label="Search database" onClick={onDeleteDraft} icon={<FiTrash2 />} />
                        </Tooltip>
                    </FormControl>
                </Box>
                <Box w='40px' h='40px'>
                    <FormControl display="flex" alignItems="center">
                        <Tooltip label="Terminar factura">
                            <IconButton aria-label="Search database" onClick={onTeminarFactura} icon={<FaCheck />} />
                        </Tooltip>
                    </FormControl>
                </Box>
                <Box w='250px' h='40px'>
                    <DropDownTypeDocument typeDocument={typeDocument} onTypeDocument={onTypeDocument} />
                </Box>
                </>
            )
        case InvoiceStatus.SENT:
        case InvoiceStatus.PAID:
        case InvoiceStatus.OVERDUE:
        case InvoiceStatus.CANCELLED: 
            return <></>
        default:
            return <></>
        
        
    }
}   

/*
    
    
*/

export default ListItems