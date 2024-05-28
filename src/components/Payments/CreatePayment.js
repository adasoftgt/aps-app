



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

 import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
  } from "@chakra-ui/react"

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

// ICONS FI
import { FiArrowLeft,FiPlusSquare, FiDollarSign, FiEdit} from "react-icons/fi";

import {React, useEffect, useState, useRef} from "react"

import configAsp from "config/config";

import { Customer, Payment, PaymentMethod } from "models";
  
// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';

import { useUsers } from "contexts/UsersContext";
import { useAuth } from "contexts/AuthContext";
import { useTable } from "contexts/TableContext";

import { useToast } from "@chakra-ui/react";

import DropDownPaymentMethod from "./DropDownPaymentMethod";

import { Redirect } from "react-router-dom/cjs/react-router-dom";

import Moneda from "components/Monedas/Moneda";

import InfoCustomer from "components/Customers/Info2";


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
        customerModel,setCustomerModel,
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


    const {userId} = useAuth()

    const [amount,setAmount] = useState(0)
    const [paymentMethod,setPaymentMethod] = useState(PaymentMethod.CASH)
    const [referencia,setReferencia] = useState('')

    const [amountPaid,setAmountPaid] = useState(0)
    const [remainingBalance,setRemainingBalance] = useState(0)

    const [redirect,setRedirect] = useState(false)


    const handlePaymentMethod = () =>{
       
    }

    const handleCreatePayment = async() =>{
        const newPayment = await DataStore.save(
            new Payment({
                amount: parseFloat(amount.replace(/[^\d.]/g, '')),
                method: paymentMethod,
                reference: referencia,
                userId: userId,
                clientId: userId,
                invoice: invoiceModel
            })
        );
        toast({
            title: 'Created Payment',
            description: "We've created the payment for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
        await inputsClear()
        
    }



    const inputsClear = () =>{
      return new Promise( (resolve,reject) => {
        setAmount(0)
        setPaymentMethod(PaymentMethod.CASH)
        setReferencia('')

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

    const handleChange = (value) =>{
        setAmount(value)
    }

    const handleAmount = (value) =>{
        const formatCurrency = (value) => {
            // Eliminar cualquier carácter que no sea un número o un punto decimal
            const formattedValue = value.replace(/[^\d.]/g, '');
        
            // Dividir el valor en partes antes y después del punto decimal
            const parts = formattedValue.split('.');
        
            // Formatear la parte entera con separadores de miles
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
            // Unir las partes nuevamente
            return parts.join('.');
            };
        setAmount(formatCurrency(value))
    }

    useEffect( async() =>{
        const items = await DataStore.query(Payment, 
            i => i.invoicePaymentId.eq(invoiceModel.id),
        );

        var amount = 0

        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            amount = amount + element.amount 
        }

        setAmountPaid(amount)

        return () =>{

        }
        
        
    },[invoiceModel])


    useEffect( () =>{
        setRemainingBalance(invoiceModel.total - amountPaid ?? 0)
    },[invoiceModel,amountPaid])
    


    return(
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
                {redirect &&(
                    <Redirect 
                        to={{
                            pathname: '/admin/noinvoice',
                        }} 
                    />
                )}
                <InfoCustomer id={invoiceModel.clientId}/>
                <Flex style={{padding: "0 0 10px 0"}}>
                    <Card p='16px' >
                      <CardBody px='5px'>
                        <Table variant="striped" colorScheme="teal">
                            <TableCaption>Saldos de factura</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Descripción</Th>
                                    <Th>Monto</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>Monto total</Td>
                                    <Td><Moneda amount={invoiceModel.total ?? '0.00'} /></Td>
                                </Tr>
                                <Tr>
                                    <Td>Monto pagado</Td>
                                    <Td><Moneda amount={amountPaid ?? '0.00'} /></Td>
                                </Tr>
                                <Tr>
                                    <Td>Saldo</Td>
                                    <Td><Moneda amount={remainingBalance ?? '0.00'} /></Td>
                                </Tr>
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>Descripción</Th>
                                    <Th>Monto</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
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
                              onChange={(e) => handleAmount(e.target.value)} 
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
                              onClick={handleCreatePayment}
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


const CurrencyInput = ({ value, onChange }) => {
    return (
      <InputMask
        mask="999,999,999.99"
        maskChar="_"
        value={value}
        onChange={onChange}
      >
        {() => <input placeholder="Enter amount" />}
      </InputMask>
    );
  };



  

export default CreatePayment