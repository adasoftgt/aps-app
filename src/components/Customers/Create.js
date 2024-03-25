
//cargarlo
import { 
    Flex,
    FormControl,
    FormLabel,
    IconButton,
    Grid,
    GridItem,
    useColorModeValue,
    Input,
    FormHelperText,
    Select,
    Text,
    HStack,
    Button,
 } from "@chakra-ui/react"

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

// ICONS FI
import { FiArrowLeft,FiPlusSquare, FiDollarSign, FiEdit} from "react-icons/fi";

import {React, useEffect, useState} from "react"

import configAsp from "config/config";

import { Customer } from "models";
  
// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';

import { useUsers } from "contexts/UsersContext";
import { useTable } from "contexts/TableContext";

import { useToast } from "@chakra-ui/react";


function Create(props){
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const borderRoleColor = useColorModeValue("white", "transparent");
    const bgRole = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");

    const {setCreateCustomer} = props
    const toast = useToast()
    const { 
      sellers,
      customerAi,setCustomerAi,
      getAutoIncrementConfiguration,
    } = useUsers()

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

    const departamentosList = Object.keys(configAsp.departamentos)
    const {
      id,
      name,
      address,
      nit,
      phone,
      owner,
      seller,
      transportation_observations,
      observations,
      countryDepartment,
      municipality,
      carrier,
      sector,
    } = props
    
    const [newName,setNewName] = useState(name)
    const [newAddress,setNewAddress] = useState(address)
    const [newNit,setNewNit] = useState(nit)
    const [newPhone,setNewPhone] = useState(phone)
    const [newOwner,setNewOwner] = useState(owner)
    const [newSeller,setNewSeller] = useState(seller)
    const [newTransportation_observations,setNewTransportation_observations] = useState(transportation_observations)
    const [newObservations,setNewObservations] = useState(observations)
    const [newCountryDepartment,setNewCountryDepartment] = useState(countryDepartment)
    const [newMunicipality,setNewMunicipality] = useState(municipality)
    const [newCarrier,setNewCarrier] = useState(carrier)
    const [newSector,setNewSector] = useState(sector)
    const [municipios,setMunicipios] = useState([])


    const inputsClear = () =>{
      return new Promise( (resolve,reject) => {
        setNewName(name)
        setNewAddress(address)
        setNewNit(nit)
        setNewPhone(phone)
        setNewOwner(owner)
        setNewSeller(seller)
        setNewTransportation_observations(transportation_observations)
        setNewObservations(observations)
        setNewCountryDepartment(countryDepartment)
        setNewMunicipality(municipality)
        setNewCarrier(carrier)
        setNewSector(sector)
        setMunicipios([])
        setCreateCustomer(false)
        resolve();
      })
    }
    
    useEffect( () =>{
      const departamento = newCountryDepartment ?? false
      if(departamento){
        const municipios = configAsp.departamentos[departamento] ?? []
        setMunicipios(municipios)
      }
    },[newCountryDepartment])


    
    const handleCreateCustomer = async() => {
      const code = await getAutoIncrementConfiguration('customerAi')
      const newCustomer = await DataStore.save(
        new Customer({
          code: code,
          name: newName,
          address: newAddress,
          nit: newNit,
          phone: newPhone,
          owner: newOwner,
          seller: newSeller,
          transportation_observations: newTransportation_observations,
          observations: newObservations,
          countryDepartment: newCountryDepartment,
          municipality: newMunicipality,
          carrier: newCarrier,
          sector: newSector,
        })
      );

      setTotal( total + 1)

      toast({
        title: 'Create Customer',
        description: "We've Create the Customer for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

      await inputsClear()
    }


    return(
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
                <Flex style={{padding: "0 0 10px 0"}}>
                    <Card p='16px' >
                      <CardBody px='5px'>
                        <FormControl display="flex" alignItems="center">
                          <FormLabel htmlFor="email-alerts" mb="0">
                            Return to list Customer
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
                        Add Customer
                      </Text>
                    </CardHeader>
                    <CardBody px='5px'>
                      <Flex direction='column'>
                        <Text fontSize='sm' color='gray.400' fontWeight='600' mb='20px'>
                          CUSTOMER
                        </Text>
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Nombre</FormLabel>
                            <Input 
                              type="text"
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)} 
                            />
                            <FormHelperText>Ingrese el nombre</FormHelperText>
                          </FormControl>
                        </Flex>
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Direccion</FormLabel>
                            <Input 
                              type="text"
                              value={newAddress}
                              onChange={(e) => setNewAddress(e.target.value)} 
                            />
                            <FormHelperText>Ingrese la direccion</FormHelperText>
                          </FormControl>
                        </Flex>
                      
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Nit</FormLabel>
                            <Input 
                              type="text"
                              value={newNit}
                              onChange={(e) => setNewNit(e.target.value)} 
                            />
                            <FormHelperText>Ingrese el nit</FormHelperText>
                          </FormControl>
                        </Flex>
                        
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Telefono</FormLabel>
                            <Input 
                              type="text"
                              value={newPhone}
                              onChange={(e) => setNewPhone(e.target.value)} 
                            />
                            <FormHelperText>Ingrese el telefono</FormHelperText>
                          </FormControl>
                        </Flex>
                        
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Propietario</FormLabel>
                            <Input 
                              type="text"
                              value={newOwner}
                              onChange={(e) => setNewOwner(e.target.value)} 
                            />
                            <FormHelperText>Ingrese el Propietario</FormHelperText>
                          </FormControl>
                        </Flex>
                        
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Vendedor</FormLabel>
                            <Select placeholder="Select vendedor" 
                                value={newSeller} 
                                onChange={(event) => setNewSeller(event.target.value)}
                            >
                              
                              {sellers?.map( (seller, index, arr) =>{
                                const user_id = seller.Attributes.find(attribute => attribute.Name === 'sub')?.Value;
                                return(
                                  <option value={user_id}>{seller.Username}</option>
                                )
                              })}
                            </Select>
                            <FormHelperText>Ingrese el vendedor</FormHelperText>
                          </FormControl>
                        </Flex>

                        
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Observacion de transporte</FormLabel>
                            <Input 
                              type="text"
                              value={newTransportation_observations}
                              onChange={(e) => setNewTransportation_observations(e.target.value)} 
                            />
                            <FormHelperText>Ingrese la categoria</FormHelperText>
                          </FormControl>
                        </Flex>
                        
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Observaciones</FormLabel>
                            <Input 
                              type="text"
                              value={newObservations}
                              onChange={(e) => setNewObservations(e.target.value)} 
                            />
                            <FormHelperText>Ingrese la categoria</FormHelperText>
                          </FormControl>
                        </Flex>
                        
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Departamento</FormLabel>
                            <Select placeholder="Select Departamentos" 
                                value={newCountryDepartment} 
                                onChange={(event) => setNewCountryDepartment(event.target.value)}
                            >
                              
                              {departamentosList.map( (departamento, index, arr) =>{
                                return(
                                  <option value={departamento}>{departamento}</option>
                                )
                              })}
                            </Select>
                            <FormHelperText>Ingrese el departamento</FormHelperText>
                          </FormControl>
                        </Flex>
                        
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Municipio</FormLabel>
                            <Select placeholder="Select Municipios" 
                                value={newMunicipality} 
                                onChange={(event) => setNewMunicipality(event.target.value)}
                            >
                              
                              {municipios.map( (municipio, index, arr) =>{
                                return(
                                  <option value={municipio}>{municipio}</option>
                                )
                              })}
                            </Select>
                            <FormHelperText>Ingrese el municipio</FormHelperText>
                          </FormControl>
                        </Flex>

                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Transporte</FormLabel>
                            <Select placeholder="Select Transporte" 
                                value={newCarrier} 
                                onChange={(event) => setNewCarrier(event.target.value)}
                            >
                              
                              {configAsp.carriers.map( (carrier, index, arr) =>{
                                return(
                                  <option value={carrier}>{carrier}</option>
                                )
                              })}
                            </Select>
                            <FormHelperText>Ingrese el Transporte</FormHelperText>
                          </FormControl>
                        </Flex>

                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Sector</FormLabel>
                            <Select placeholder="Select Sector" 
                                value={newSector} 
                                onChange={(event) => setNewSector(event.target.value)}
                            >
                              
                              {configAsp.sectors.map( (sector, index, arr) =>{
                                return(
                                  <option value={sector}>{sector}</option>
                                )
                              })}
                            </Select>
                            <FormHelperText>Ingrese el sector</FormHelperText>
                          </FormControl>
                        </Flex>
                       
                       
                        <Flex align='center' mb='20px'>
                          <HStack spacing="24px">
                            <Button colorScheme="blue"
                              onClick={handleCreateCustomer}
                            >Crear</Button>
                          </HStack>
                        </Flex>
                      </Flex>
                    </CardBody>
                  </Card>
                  
                </Grid>
              </Flex>
    )
}

export default Create