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
    Heading,
    Box,
    Tooltip,
  } from "@chakra-ui/react";
  import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
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
  
  import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, TypeDocument, InvoiceStatus,Customer,BatchChunk, BatchChunkStatus ,Batch, Payment } from "models";
  
  import {USER_OPERATION} from "structures"
  
  
  // Amplify datastore
  import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
  
  
  
  
  import { useToast } from '@chakra-ui/react'
  
  // ICONS FI
  import { FiArrowLeft,FiPlusSquare, FiDollarSign, FiEdit} from "react-icons/fi";
  
  // CONTEXTOS
  import { useTable } from "contexts/TableContext";
  import { useAuth } from "contexts/AuthContext";
  import { useUsers } from "contexts/UsersContext";
  import { useApsProductContext } from "contexts/ApsProductContext";
  import { useApsUserContext } from "contexts/ApsUserContext";
  
  import { jsx } from "@emotion/react";
  
  import { Redirect } from 'react-router-dom';

  
  import ListBatch from "components/product/ListBatch";

  import InvoiceRow from "components/Tables/InvoiceRow";


  import { format } from "date-fns";

  import DropDownTypeDocument from "components/invoices/DropDownTypeDocument";



  import { ApsDataTable } from "components/Data/Table/DataTable";
  import Moneda from "components/Monedas/Moneda";

  import { SingleDatepicker } from "chakra-dayzed-datepicker";

function UnidadesXPlaforma(){
    
    // SELLERS
    const {sellers} = useUsers()

    // MODELS PRODUCTS
    const { apsProductModels } = useApsProductContext()

    // USERS
    /**
     * @type {import("structures").UserOperation} la estrucura que contiene datos del usuario
     */
    const { userOperation } = useApsUserContext()

    console.log('eb454d39-c539-45d8-b457-763ebcd72e0b',userOperation)

    //const [data,setData] = useState(null)
    const [items,setItems] = useState([])
    const [columns,setColumns] = useState([])

    // DATEPICKER
    const [starDate, setStarDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isGenerate,setIsGenerate] = useState(false)

    // LOADERS
    const [isLoad,setIsLoad] = useState(false)

    const [nombreReporte,setNombreReporte] = useState('')

    const handleGenerate = () =>{
        setIsGenerate(!isGenerate)
    }
    
    useEffect( async() =>{
        setIsLoad(true)
        const items = []
       
            
        const startDateFix = new Date(starDate); // June 1st, 2024 (month starts at 0)
        startDateFix.setHours(0, 0, 0, 0);
        const endDateFix = new Date(endDate); // June 7th, 2024
        endDateFix.setHours(23, 59, 59, 999);

        let predicado = c => {}
        console.log('860ec950-c896-4a2a-a8d5-b344c8720340',Object.keys(userOperation).length)
        if(Object.keys(userOperation).length != 0){
            setNombreReporte(userOperation.username)
            predicado = c => c.and( c => [
                c.cashierId.eq(userOperation.userId),
                c.fecha.ge(startDateFix.toISOString()),
                c.fecha.le(endDateFix.toISOString()),
            ])
        }else{
            setNombreReporte('PLATAFORMA')
            predicado = c => c.and( c => [
                c.fecha.ge(startDateFix.toISOString()),
                c.fecha.le(endDateFix.toISOString()),
            ])
        }
        console.log('c59a964b-5b5e-4325-ad94-3bc2ae075b75',predicado)
        const products = []
        await Promise.all(apsProductModels?.map( async(apsProductModel) =>{
            const productId = apsProductModel.id
            
            const invoices = await DataStore.query(Invoice,
                predicado,
            );
            console.log('f359e037-e84d-4d90-b04e-5fe7536b7dfa',invoices)
            const quantityProduct = await invoices.reduce(
                async(invoiceSum, invoice) =>{
                    const invoiceId = invoice.id
                    const invoiceItems = await DataStore.query(InvoiceItem,
                        c => c.and( c => [
                            c.invoiceItemsId.eq(invoiceId),
                            c.productItemsId.eq(productId)
                        ]),
                    );
                    
                    //if(invoiceItems.length != 0){
                    const invoiceSumNumber = await invoiceSum
                        //}
                    
                    return invoiceSumNumber + await invoiceItems.reduce( async(itemSum, invoiceItem) => {
                        const invoiceItemId = invoiceItem.id
                        const chunks  = await DataStore.query(BatchChunk, 
                            c => c.and( c => [
                                c.invoiceItemChunksId.eq(invoiceItemId),
                                c.or(c => [
                                    c.status.eq(BatchChunkStatus.SALES_QUANTITY),
                                    c.status.eq(BatchChunkStatus.BONUS_QUANTITY)
                                ])
                            ]),
                            { sort: (s) => s.dateCreated(SortDirection.ASCENDING) }
                        );
                        const itemSumNumber = await itemSum

                        return itemSumNumber + chunks.reduce( (chunkSum,chunk) => chunkSum + chunk.quantity, 0)

                    },Promise.resolve(0))
                },Promise.resolve(0)
            )
            const product = {
                "sku": apsProductModel.sku,
                "name": apsProductModel.name,
                "model": apsProductModel,
                "quantity": quantityProduct,
                "quantityUnFormat":quantityProduct
            }
            products.push(product)
            

        }))

        
        
        
        
        

        const granTotal = products.reduce((productSum, product) => productSum + product.quantityUnFormat, 0)

        const itemTotal = {
            name: 'Total',
            quantity: granTotal,
            quantityUnFormat:granTotal
        }

        products.push(itemTotal)
        
        setItems(products)
        setColumns([
            
            {
                name: 'SKU',
                selector: row => row.sku,
                sortable: true,
            },
            {
              name: 'Producto',
              selector: row => row.name,
              sortable: true,
            },
            {
              name: 'Monto',
              selector: row => row.quantity,
              sortable: true,
            },

        ])

        setTimeout(() => {
            setIsLoad(false)
        }, 200);
        

    },[isGenerate,userOperation])
    
    return(
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
            <Card p='16px' alignItems="center" >
                <VStack spacing='24px'>
                    <HStack spacing='24px'>
                        <SingleDatepicker
                            name="date-input"
                            date={starDate}
                            onDateChange={setStarDate}
                        />
                        <Text>A</Text>
                        <SingleDatepicker
                            name="date-input"
                            date={endDate}
                            onDateChange={setEndDate}
                        />
                    </HStack>
                    <Button colorScheme='blue' onClick={handleGenerate}>Generar</Button>
                </VStack>
                {isLoad && (
                    <CircularProgress isIndeterminate color='yellow.300' />
                )}
                
            </Card>
            <Card p='16px' alignItems="center" >
                
                <CardBody px='5px'>
                    UNIDADES POR 
                    <Heading as='h2' size='2xl'>
                        {nombreReporte}
                    </Heading>
                </CardBody>
            </Card>
            <ApsDataTable data={items} columns={columns}/>
        </Flex>
    )
}


export default UnidadesXPlaforma


