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
    Stack, HStack, VStack,
  
    Box,
  } from "@chakra-ui/react";
  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
  import TablesProjectRow from "components/Tables/TablesProjectRow";
  // table row
  import CustormersRow from "components/Tables/CustormersRow";
  import React,{useState,useEffect,useRef} from "react";
  import { tablesProjectData, tablesTableData } from "variables/general";
  import Pagination from "components/Pagination/Paginacion.js"
  import Capabilities from "components/Capabilities/Capabilities.js"
  
  import { Customer } from "models";
  
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

  import Create from "components/Customers/Create";

  
  import ListBatch from "components/product/ListBatch";


function Customers(){
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const borderRoleColor = useColorModeValue("white", "transparent");
    const bgRole = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
    
    // mensaje
    const toast = useToast()

    const [createCustomer,setCreateCustomer] = useState(false) 
    
    const [customers,setCustomers] = useState([])
  
    const {
        userOperationSelected,setUserOperationSelected,
        invoiceDraft,setInvoiceDraft,
    } = useUsers()

    console.log('userOperationSelected',userOperationSelected)

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

    
    const getCustomers = async(page = 0,limit = 0) => {
        try{  
          const pageOfset = page - 1
    
          
          const customers = await DataStore.query(Customer, Predicates.ALL, {
            page: pageOfset,
            limit: limit
          })
    
          setCustomers(customers)
          
          //const price = await products[0].price
          /*const price = await DataStore.query(ProductPrice, 
            c => c.productPriceProductId.eq(products[0].id),
            { sort: (s) => s.id(SortDirection.DESCENDING),limit: 1 }
          );*/
          
          
          
          
        }catch(err){
          console.log('Error: recolectar productos',err)
        }
    }


    useEffect( async() => {
        //getProducts() // Tarea de observacion
        await DataStore.start();
        getCustomers(currentPage,pageSize) // pimera pagina
    }, [total,currentPage,pageSize]);


    
    
   
    const handleCreateCostumer = () =>{
        setCreateCustomer(true)
    }


    const deleteRow = async(id) => {
        const toDelete = await DataStore.query(Customer, id);
        
        if (toDelete) {
          DataStore.delete(toDelete);
          // Se va cambiar total para renderizar de nuevo y cargar objetos restantes
          setTotal(total - 1)
        }
    }
    
    
    async function updateProperty(id, key, newValue) {
        try{
    
          const original = await DataStore.query(Customer, id);
        
          if (original) {
            const updatedPost = await DataStore.save(
              Customer.copyOf(original, updated => {
                updated[key] = newValue
              })
            );
          }
    
        }catch(err){
          console.log(err)
        }
    }
    
    return (
        <>
            {createCustomer ? (
                <Create setCreateCustomer={setCreateCustomer}/>
            ):(
                <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
                    <Flex style={{padding: "0 0 10px 0"}}>
                        <Card p='16px' >
                        
                            <CardBody px='5px'>
                                <FormControl display="flex" alignItems="center">
                                    <FormLabel htmlFor="email-alerts" mb="0">
                                    Create Customer
                                    </FormLabel>
                                    <IconButton aria-label="Search database" onClick={handleCreateCostumer} icon={<FiPlusSquare />} />
                                </FormControl>  
                            
                            </CardBody>  
                        
                        
                        </Card>
                    </Flex>
                    <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
                        <CardHeader p="6px 0px 22px 0px">
                            <Text fontSize="xl" color={textColor} fontWeight="bold">
                            Customers Table
                            </Text>
                        </CardHeader>
                        
                        <CardBody>
                            <Table variant="simple" color={textColor}>
                            <Thead>
                                <Tr my=".8rem" pl="0px" color="gray.400" >
                                <Th pl="0px" borderColor={borderColor} color="gray.400" >
                                    Name
                                </Th>
                                <Th borderColor={borderColor} color="gray.400" >Adress</Th>
                                <Th borderColor={borderColor} color="gray.400" >nit</Th>
                                <Th borderColor={borderColor} color="gray.400" >Phone</Th>
                                <Th borderColor={borderColor} color="gray.400" >Owner</Th>
                                <Th borderColor={borderColor} color="gray.400" >Seller</Th>
                                <Th borderColor={borderColor} color="gray.400" >Observacion de transporte</Th>
                                <Th borderColor={borderColor} color="gray.400" >Observations</Th>
                                <Th borderColor={borderColor} color="gray.400" >Departamento</Th>
                                <Th borderColor={borderColor} color="gray.400" >Municipio</Th>
                                <Th borderColor={borderColor} color="gray.400" >Transporte</Th>
                                <Th borderColor={borderColor} color="gray.400" >Sector</Th>
                                
                                </Tr>
                            </Thead>
                            <Tbody>
                                
                                {customers.map((customers, index, arr) => {
                                return (
                                    <CustormersRow
                                    id={customers.id}
                                    index={index}
                                    name={customers.name}
                                    address={customers.address}
                                    nit={customers.nit}
                                    phone={customers.phone}
                                    owner={customers.owner}
                                    seller={customers.seller} // model
                                    transportation_observations={customers.transportation_observations}
                                    observations={customers.observations}
                                    countryDepartment={customers.countryDepartment}
                                    municipality={customers.municipality}
                                    carrier={customers.carrier}
                                    sector={customers.sector}
                                    
                                    // functions
                                    
                                    //fillInputsEdit={fillInputsEdit}
                                    //setListBatchStatus={setListBatchStatus}
                                    
                                    //FUCNTIONS
                                    updateProperty={updateProperty}
                                    deleteRow={deleteRow}
                                    
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
            )}
        </>
    )
}


export default Customers