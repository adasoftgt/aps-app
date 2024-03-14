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
  import InvoicesRow from "components/Tables/InvoicesRow";
  import React,{useState,useEffect,useRef} from "react";
  import { tablesProjectData, tablesTableData } from "variables/general";
  import Pagination from "components/Pagination/Paginacion.js"
  import Capabilities from "components/Capabilities/Capabilities.js"
  
  import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, InvoiceStatus } from "models";
  
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
  

  
  import ListBatch from "components/product/ListBatch";


function NewItem(){
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const borderRoleColor = useColorModeValue("white", "transparent");
    const bgRole = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
    
    // mensaje
    const toast = useToast()
  
    const {userOperationSelected,setUserOperationSelected} = useUsers()

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

    const [createInvoiceStatus,setCreateInvoiceStatus] = useState(false)
    
    
    
    const handleCreateInvoice = () =>{
        
    }
    
    return (
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
                <Flex style={{padding: "0 0 10px 0"}}>
                    <Card p='16px' >
                      <CardBody px='5px'>
                        <FormControl display="flex" alignItems="center">
                          <FormLabel htmlFor="email-alerts" mb="0">
                            Regresar a lista de productos
                          </FormLabel>
                          <IconButton aria-label="Search database" 
                            onClick={ async() => {
                              await inputsClear()
                            }} 
                            icon={<FiArrowLeft />} />
                        </FormControl>  
                        
                      </CardBody>
                    </Card>
                  </Flex>
                <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap='22px' style={{padding: "10px 0 0 0"}}>
                  <Card p='16px'>
                    <CardHeader p='12px 5px' mb='12px'>
                      <Text fontSize='lg' color={textColor} fontWeight='bold'>
                        Agrega un pruducto
                      </Text>
                    </CardHeader>
                    <CardBody px='5px'>
                      <Flex direction='column'>
                        <Text fontSize='sm' color='gray.400' fontWeight='600' mb='20px'>
                          PRODUCTO
                        </Text>
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Name Product</FormLabel>
                            <Input 
                              type="text"
                              value={''}
                              onChange={(e) => e.target.value} 
                            />
                            <FormHelperText>Ingrese el nombre del proeducto</FormHelperText>
                          </FormControl>
                        </Flex>
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>SKU</FormLabel>
                            <Input 
                              type="text"
                              value={''}
                              onChange={(e) => e.target.value} 
                            />
                            <FormHelperText>Ingrese el SKU</FormHelperText>
                          </FormControl>
                        </Flex>
                      
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Description</FormLabel>
                            <Input 
                              type="text"
                              value={''}
                              onChange={(e) => e.target.value} 
                            />
                            <FormHelperText>Ingrese el SKU</FormHelperText>
                          </FormControl>
                        </Flex>
                        
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Category</FormLabel>
                            <Input 
                              type="text"
                              value={''}
                              onChange={(e) => e.target.value} 
                            />
                            <FormHelperText>Ingrese la categoria</FormHelperText>
                          </FormControl>
                        </Flex>
                        
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Status</FormLabel>
                            <Select placeholder="Select country" value={''} onChange={(event) => event.target.value}>
                              
                            </Select>
                            <FormHelperText>Ingrese el estado del producto</FormHelperText>
                          </FormControl>
                        </Flex>
                        
                      </Flex>
                    </CardBody>
                  </Card>
                  
                </Grid>
              </Flex>
        
    )
}


export default NewItem