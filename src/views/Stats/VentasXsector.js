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
  import { jsx } from "@emotion/react";
  
  import { Redirect } from 'react-router-dom';

  
  import ListBatch from "components/product/ListBatch";

  import InvoiceRow from "components/Tables/InvoiceRow";


  import { format } from "date-fns";

  import DropDownTypeDocument from "components/invoices/DropDownTypeDocument";



  import { ApsDataTable } from "components/Data/Table/DataTable";
import Moneda from "components/Monedas/Moneda";
import configAsp from "config/config";

import { SingleDatepicker } from "chakra-dayzed-datepicker";

function VentasXsector(){
    
    const {sellers} = useUsers()
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
        await Promise.all(configAsp.sectors.map( async(sector) =>{
            const customers = await DataStore.query(Customer, 
                c => c.sector.eq(sector)
            );

            
            
            let saldoSector = 0
            await Promise.all(
                customers.map( 
                    async(customer) => {
                       
                        const startDateFix = new Date(starDate); // June 1st, 2024 (month starts at 0)
                        startDateFix.setHours(0, 0, 0, 0);
                        const endDateFix = new Date(endDate); // June 7th, 2024
                        endDateFix.setHours(23, 59, 59, 999);

                        const invoices = await DataStore.query(
                            Invoice, 
                            c => c.and( c => [
                                c.clientId.eq(customer.id),
                                c.fecha.ge(startDateFix.toISOString()),
                                c.fecha.le(endDateFix.toISOString()),
                            ]),
                        )
                        //console.log('33368bcc-766c-489a-9d9d-65b2e6d7084a',invoices,customer.id)
                        //if (Array.isArray(invoices)) {
                            saldoSector += invoices.reduce((invoiceSum, invoice) => invoiceSum + invoice.total, 0);
                        //}
                    }
                )
            )
            


            console.log('6b8fdccd-1347-45d0-8f51-94b71e86eedd', saldoSector)
            
            const saldoUnformat = saldoSector
            
            console.log('77e4c2dd-31a0-4ea4-9b51-e9c5f2d54287',saldoUnformat)
            
            const saldo = <Moneda amount={saldoUnformat}/>
            const item = {
                name: sector,
                saldo: saldo,
                saldoUnFormat:saldoUnformat
            }

            items.push(item)
        }))

        const granTotal = items.reduce((itemSum, item) => itemSum + item.saldoUnFormat, 0)

        const itemTotal = {
            name: 'Total',
            saldo: <Moneda amount={granTotal}/>,
            saldoUnFormat:granTotal
        }

        items.push(itemTotal)
        
        setItems(items)
        setColumns([
            {
              name: 'Sector',
              selector: row => row.name,
              sortable: true,
            },
            {
              name: 'Saldo',
              selector: row => row.saldo,
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
                    VENTAS x SECTOR
                </CardBody>
            </Card>
            <ApsDataTable data={items} columns={columns}/>
        </Flex>
    )
}


export default VentasXsector


