/**
 * Esto se va mostrar en drawer de contextos
 */



import {React, useState,useRef,useEffect} from "react"

import { Box, HStack, VStack, Tooltip, Text, IconButton, Flex, Stack, Grid, GridItem } from "@chakra-ui/react";

import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import { format } from 'date-fns';

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import { MdFilterAltOff } from "react-icons/md";
import { CgInternal } from "react-icons/cg";

import { Customer } from "models";

import { useUsers } from "contexts/UsersContext";
  
// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';

function InfoCustomer(props){
    const {id} = props

    const [customer,setCustomer] = useState([])
    const [sellerUserName,setSellerUserName] = useState('')

    const {sellers,invoiceDraft} = useUsers()
    

    useEffect( async() =>{
        
        if(id != ''){
          const customer = await DataStore.query(Customer, id);
          setCustomer(customer ?? [])
        }

        return () =>{

        }
    },[id])

    useEffect( () =>{
      
      for (let index = 0; index < sellers.length; index++) {
        const seller = sellers[index];
        const user_id = seller.Attributes.find(attribute => attribute.Name === 'sub')?.Value;
        if(customer.seller == user_id){
          setSellerUserName(seller.Username)
          break;
        }
        
      }

      return () =>{

      }
    },[sellers,customer])

    
    return (
      <>
       
        <Flex style={{padding: "0 0 0 0"}}>
          <Card p='16px' >
              <CardBody px='5px'>
              {/* <Stack direction={["column", "row"]} spacing="5px">
                  <Box w="auto" h="40px">
                      <Text fontSize="lg">Customer:</Text>
                  </Box>
                  <Box w="auto" h="40px">
                      <Text fontSize="lg"> {customer.name ?? ''}</Text>
                  </Box>
              </Stack> */}
              <Grid
                h="200px"
                templateRows="repeat(3, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={0}
              >
                <GridItem rowSpan={1} colSpan={1} >
                  <VStack
                    align='stretch'
                  >
                    <Box h='auto'>
                      <HStack spacing='24px'>
                        <Box w='auto' h='40px' >
                          Fecha: 
                        </Box>
                        <Box w='auto' h='40px' >
                          {invoiceDraft.fecha}
                        </Box>
                      </HStack>
                    </Box>
                    <Box h='40px'>
                      <HStack spacing='24px'>
                        <Box w='auto' h='40px' >
                          Sector: 
                        </Box>
                        <Box w='auto' h='40px' >
                          {customer.sector}
                        </Box>
                      </HStack>
                    </Box>
                  </VStack>
                 
                </GridItem>
                <GridItem colSpan={2} >
                    <VStack
                      align='stretch'
                    >
                      <Box h='auto'>
                        <HStack spacing='24px'>
                          <Box w='auto' h='40px' >
                            Transporte: 
                          </Box>
                          <Box w='auto' h='40px' >
                            {customer.carrier}
                          </Box>
                        </HStack>
                      </Box>
                      <Box h='40px'>
                        <HStack spacing='24px'>
                          <Box w='auto' h='40px' >
                            Vendedor: 
                          </Box>
                          <Box w='auto' h='40px' >
                            {sellerUserName}
                          </Box>
                        </HStack>
                      </Box>
                     
                    </VStack>
                </GridItem>
                <GridItem colSpan={2} >
                    <VStack
                      align='stretch'
                    >
                      <Box h='auto'>
                        <HStack spacing='24px'>
                          <Box w='auto' h='40px' >
                            Departamento: 
                          </Box>
                          <Box w='auto' h='40px' >
                            {customer.countryDepartment}
                          </Box>
                        </HStack>
                      </Box>
                      <Box h='40px'>
                        <HStack spacing='24px'>
                          <Box w='auto' h='40px' >
                            Municipio: 
                          </Box>
                          <Box w='auto' h='40px' >
                            {customer.municipality}
                          </Box>
                        </HStack>
                      </Box>
                    
                    </VStack>
                </GridItem>
                <GridItem colSpan={3}  >
                  Cliente: {customer.name}
                </GridItem>
                <GridItem colSpan={1}  >
                  Nit: {customer.nit}
                </GridItem>
                <GridItem colSpan={1}  >
                  Telefono: {customer.phone}
                </GridItem>
                <GridItem colSpan={5}  >
                  Direccion: {customer.address}
                </GridItem>
              </Grid>
              </CardBody>  
          </Card>
        </Flex>
       
      </>
    )
}

export default InfoCustomer



// EJEMPLOS DE OBJECTOS


/**
 * {
    "name": "Carolina Herrador",
    "address": "San Mateo 5",
    "nit": "352865655",
    "phone": "31669110",
    "owner": "Carolina Herrador",
    "seller": "e1bf0ec7-c169-4e35-9bbd-661c97101403",
    "transportation_observations": "todo es cabron",
    "observations": "todo es todo",
    "countryDepartment": "Guatemala",
    "municipality": "Villa Nueva",
    "carrier": "GUATEX",
    "sector": "Z M",
    "id": "b0c9ac30-f50b-41fd-b331-e1ea29047669",
    "createdAt": null,
    "updatedAt": null
}
 */