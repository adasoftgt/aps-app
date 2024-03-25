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
    Progress,
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

  import Papa from 'papaparse'


function Customers(){
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const borderRoleColor = useColorModeValue("white", "transparent");
    const bgRole = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
    
    // mensaje
    const toast = useToast()

    const [createCustomer,setCreateCustomer] = useState(false) 
    
    const [customers,setCustomers] = useState([])

    const [csvData, setCsvData] = useState([]);
    const [fileCustomers,setFileCustomers] = useState(false)
    const [progressValue,setProgressValue] = useState(0)

  
    const {
        userOperationSelected,setUserOperationSelected,
        invoiceDraft,setInvoiceDraft,
        customerAi,setCustomerAi,
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
          toast({
            title: 'Update Custormer Proprety',
            description: "We've update Customer for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
        }catch(err){
          console.log(err)
        }
    }


    
    const handleFileUpload = async() => {
        const file = fileCustomers
        const reader = new FileReader();
        const todoslosCustomers = await DataStore.query(Customer); // Consulta todos los registros del schema
        await Promise.all(todoslosCustomers.map(dato => DataStore.delete(dato))); // Elimina todos los registros
        setCustomerAi('0')
        reader.onload = async(e) => {
            const text = e.target.result;
            const result = Papa.parse(text, { header: true }); // Parsear el contenido CSV
            const customers = result.data
            const position = customers.length - 1
            console.log('29db5772-1d71-4f11-a4fb-2257cb25ff96',customers[position])   
            var customerList = []
            var codigo = '0';
            for (let index = 0; index < customers.length; index++) {
                const customer = customers[index];
                if(customer?.CODIGO != ''){
                    const newCustomer = new Customer({
                        code: customer?.CODIGO ?? "",
                        name: customer?.CLIENTES ?? "",
                        address: customer?.DIRECCION ?? "",
                        nit: customer?.NIT ?? "",
                        phone: customer?.TELEFONO ?? "",
                        owner: customer?.PROPIETARIO ?? "",
                        seller: "3a282772-f4c0-43cf-b8ab-f13a3e35d8e3",
                        transportation_observations: customer["OBSERVACIONES DE TRANSPORTE"] ?? "",
                        observations: customer["OTRAS OBSERVACIONES"] ?? "",
                        countryDepartment: customer?.DEPARTAMENTO ?? "",
                        municipality: customer?.MUNICIPIO ?? "",
                        carrier: customer?.TRASPORTE ?? "SIN TRANSPORTE",
                        sector: customer?.SECTOR ?? "SIN SECTOR",
                    })
                    customerList = [...customerList,newCustomer]
                    codigo = customer?.CODIGO ?? ""
                    try{
                        const newCustomerStore = await DataStore.save(
                            newCustomer
                        );
                    console.log('f61c5f65-3f46-451c-b62f-5f7de89392c4',index,newCustomerStore)
                    }catch(err){
                        console.log('b88ce198-ab3f-460f-b824-1530902a0994',err)
                    }
                    if (index % 100 === 0) {
                        setProgressValue((index * 100) / customers.length)
                    }
                }
                
            }
            if(progressValue != 100){
                setProgressValue(100)
            }
            console.log('72a12284-5971-4798-b933-f40b30e4998b',codigo)
            setCustomerAi(codigo.toString())
            getCustomers(currentPage,pageSize)
        };

        reader.readAsText(file);
    };

    const handleFileChange = (event) =>{
        setFileCustomers(event.target.files[0])
    }
    
    return (
        <>
            {createCustomer ? (
                <Create setCreateCustomer={setCreateCustomer}/>
            ):(
                <>
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
                                <Pagination
                                total={total}
                                currentPage={currentPage}
                                pageSize={pageSize}
                                onPageChange={setCurrentPage}
                                /> 
                            
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
                                    Codigo
                                </Th>
                                <Th borderColor={borderColor} color="gray.400" >Name</Th>
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
                                
                                {customers.map((customer, index, arr) => {
                                return (
                                    <CustormersRow
                                    id={customer.id}
                                    index={index}
                                    code={customer.code}
                                    name={customer.name}
                                    address={customer.address}
                                    nit={customer.nit}
                                    phone={customer.phone}
                                    owner={customer.owner}
                                    seller={customer.seller} // model
                                    transportation_observations={customer.transportation_observations}
                                    observations={customer.observations}
                                    countryDepartment={customer.countryDepartment}
                                    municipality={customer.municipality}
                                    carrier={customer.carrier}
                                    sector={customer.sector}
                                    
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
                           
                        </CardBody>
                        
                    </Card>
                   
                </Flex>
                <Flex style={{padding: "0 0 10px 0"}}>
                        <Card p='16px' >
                            <CardBody px='5px'>
                                <Pagination
                                total={total}
                                currentPage={currentPage}
                                pageSize={pageSize}
                                onPageChange={setCurrentPage}
                                />
                            </CardBody>
                        </Card>
                </Flex>
                <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
                    <Flex style={{padding: "0 0 10px 0"}}>
                        <Card p='16px' >
                            <Progress hasStripe value={progressValue} />
                            <VStack spacing={4} align="flex-start">
                                <Input type="file" onChange={handleFileChange} />
                                
                                <Button colorScheme="blue" onClick={handleFileUpload} disabled={!fileCustomers} >
                                
                                    Subir archivo
                                </Button>
                            </VStack>
                        </Card>
                    </Flex>
                </Flex>
                </>
                
            )}
        </>
    )
}


export default Customers