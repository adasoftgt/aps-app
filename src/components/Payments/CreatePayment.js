



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

import { PaymentMethod } from "models";

import DropDownPaymentMethod from "./DropDownPaymentMethod";

import { Redirect } from "react-router-dom/cjs/react-router-dom";


function CreatePayment(props){
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const borderRoleColor = useColorModeValue("white", "transparent");
    const bgRole = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");

    const {setCreateCustomer} = props
    const toast = useToast()
    const { 
        sellers,
        invoiceModel,setInvoiceModel,
        verifyContext,
        applyChanges,setApplyChanges,
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



    const [amount,setAmount] = useState(0)
    const [paymentMethod,setPaymentMethod] = useState(PaymentMethod.CASH)
    const [referencia,setReferencia] = useState('')

    const [redirect,setRedirect] = useState(false)


    const handlePaymentMethod = () =>{
        
    }



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
    


    useEffect( async()=>{
        if(Object.keys(invoiceModel).length == 0){
            const data = await verifyContext()
            if(Object.keys(data.invoiceModel).length == 0){
                setRedirect(true)
            }
        }
        
        
        
        return () =>{

        }
    },[invoiceModel])


    return(
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
                {redirect &&(
                    <Redirect 
                        to={{
                            pathname: '/admin/noinvoice',
                        }} 
                    />
                )}
                <Flex style={{padding: "0 0 10px 0"}}>
                    <Card p='16px' >
                      <CardBody px='5px'>
                        
                      </CardBody>
                    </Card>
                  </Flex>
                <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap='22px' style={{padding: "10px 0 0 0"}}>
                  <Card p='16px'>
                    <CardHeader p='12px 5px' mb='12px'>
                      <Text fontSize='lg' color={textColor} fontWeight='bold'>
                        Add Payment
                      </Text>
                    </CardHeader>
                    <CardBody px='5px'>
                      <Flex direction='column'>
                      <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Metodo de pago</FormLabel>
                                <DropDownPaymentMethod paymentMethod={paymentMethod} onPaymentMethod={handlePaymentMethod}/>
                            <FormHelperText>Ingrese la direccion</FormHelperText>
                          </FormControl>
                        </Flex>
                        
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Amount</FormLabel>
                            <Input 
                              type="text"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)} 
                            />
                            <FormHelperText>Ingrese el monto</FormHelperText>
                          </FormControl>
                        </Flex>
                        
                      
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Refencia</FormLabel>
                            <Input 
                              type="text"
                              value={referencia}
                              onChange={(e) => setReferencia(e.target.value)} 
                            />
                            <FormHelperText>Ingrese la referencia del documento que le estan entregando (confirmar en banca linea)</FormHelperText>
                          </FormControl>
                        </Flex>
                        
                       
                        <Flex align='center' mb='20px'>
                          <HStack spacing="24px">
                            <Button colorScheme="blue"
                              //onClick={handleCreateCustomer}
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

export default CreatePayment