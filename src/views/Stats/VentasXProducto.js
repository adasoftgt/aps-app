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
  import { useApsProductContext } from "contexts/ApsProductContext";
  import { jsx } from "@emotion/react";
  
  import { Redirect } from 'react-router-dom';

  
  import ListBatch from "components/product/ListBatch";

  import InvoiceRow from "components/Tables/InvoiceRow";


  import { format } from "date-fns";

  import DropDownTypeDocument from "components/invoices/DropDownTypeDocument";



  import { ApsDataTable } from "components/Data/Table/DataTable";
  import Moneda from "components/Monedas/Moneda";

  import { SingleDatepicker } from "chakra-dayzed-datepicker";

function VentasXProducto(){
    
    const {sellers} = useUsers()
    const { apsProductModels } = useApsProductContext()
    //const [data,setData] = useState(null)
    const [items,setItems] = useState([])
    const [columns,setColumns] = useState([])

    // DATEPICKER
    const [starDate, setStarDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isGenerate,setIsGenerate] = useState(false)

    // LOADERS
    const [isLoad,setIsLoad] = useState(false)

    const handleGenerate = () =>{
        setIsGenerate(!isGenerate)
    }
    
    useEffect( async() =>{
        setIsLoad(true)
        const items = []
       
            
        const startDateFix = new Date(starDate); // June 1st, 2024 (month starts at 0)
        const endDateFix = new Date(endDate); // June 7th, 2024


        
        const products = []
        await Promise.all(apsProductModels?.map( async(apsProductModel) =>{
            const productId = apsProductModel.id
            const invoices = await DataStore.query(Invoice,
                c => c.and( c => [
                    c.fecha.ge(startDateFix.toISOString()),
                    c.fecha.le(endDateFix.toISOString()),
                ]),
            );

            const amountProduct = await invoices.reduce(
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
                    
                    return invoiceSumNumber + invoiceItems.reduce( (itemSum, invoiceItem) => itemSum + invoiceItem.total,0)
                },Promise.resolve(0)
            )
            const product = {
                "sku": apsProductModel.sku,
                "name": apsProductModel.name,
                "model": apsProductModel,
                "amount": <Moneda amount={amountProduct}/>,
                "amountUnFormat":amountProduct
            }
            products.push(product)
            

        }))

        
        
        
        
        

        const granTotal = products.reduce((productSum, product) => productSum + product.amountUnFormat, 0)

        const itemTotal = {
            name: 'Total',
            amount: <Moneda amount={granTotal}/>,
            amountUnFormat:granTotal
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
              selector: row => row.amount,
              sortable: true,
            },

        ])

        setTimeout(() => {
            setIsLoad(false)
        }, 200);
        

    },[isGenerate])
    
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
                    VENTAS POR PRODUCTO
                </CardBody>
            </Card>
            <ApsDataTable data={items} columns={columns}/>
        </Flex>
    )
}


export default VentasXProducto


