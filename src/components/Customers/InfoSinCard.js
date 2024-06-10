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

/**
 * Mostrar card de informacion del customer en documento
 * @property {String} id identificador de custormer
 * @property {String} fecha fecha del documento
 */
function InfoCustomerSinCard({id,fecha,onSellerUserName}){

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
          onSellerUserName(seller.Username.toUpperCase())
          //setSellerUserName(seller.Username)
          break;
        }
        
      }

      return () =>{

      }
    },[sellers,customer])

    
    return (
      <>
       
        <Flex style={{padding: "0 0 0 0"}}>
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
                w="auto"
                templateRows="repeat(3, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={0}
              >
                {/* TRANSPORTE */}
                <GridItem colSpan={5} >
                    <HStack
                      align='stretch'
                      spacing="50px"
                    >
                       <Box h='auto'>
                        <HStack spacing='10px'>
                          <Box w='auto' h='30px'>
                            <Text className="nameSpacing" bg="rgb(15 62 140)" borderRadius="md" p={1}>
                              FECHA:
                            </Text>
                          </Box>
                          <Box w='auto' h='30px' >
                            <Text p={1} w="auto">
                              {fecha}
                            </Text>
                          </Box>
                        </HStack>
                      </Box>
                      <Box h='auto'>
                        <HStack spacing='10px'>
                          <Box w='auto' h='30px' >
                            <Text className="nameSpacing" bg="rgb(15 62 140)" borderRadius="md" p={1}>
                              TRANSPORTE:
                            </Text> 
                          </Box>
                          <Box w='auto' h='30px' >
                            <Text p={1}>
                              {customer.carrier?.toUpperCase()}
                            </Text>
                          </Box>
                        </HStack>
                      </Box>
                      <Box h='30px'>
                        <HStack spacing='10px'>
                          <Box w='auto' h='30px' >
                            <Text className="nameSpacing" bg="rgb(15 62 140)" borderRadius="md" p={1}>
                              SECTOR:
                            </Text> 
                          </Box>
                          <Box w='auto' h='30px' >
                            <Text p={1}>
                              {customer.sector}
                            </Text>
                          </Box>
                        </HStack>
                      </Box>
                      {/* <Box h='30px'>
                        <HStack spacing='10px'>
                          <Box w='auto' h='30px' >
                            <Text className="nameSpacing" bg="rgb(15 62 140)" borderRadius="md" p={1}>
                              R:
                            </Text> 
                          </Box>
                          <Box w='auto' h='30px' >
                            <Text p={1}>
                              {sellerUserName?.toUpperCase()}
                            </Text>
                          </Box>
                        </HStack>
                      </Box> */}
                     
                    </HStack>
                </GridItem>
                {/* CODIGO  */}
                <GridItem colSpan={5} >
                  <HStack
                    align='stretch'
                  >
                    <Box h='auto'>
                      <HStack spacing='5px'>
                        <Box w='auto' h='5px'>
                          <Text className="nameSpacing" bg="rgb(15 62 140)" borderRadius="md" p={1}>
                            CÓDIGO:
                          </Text>
                        </Box>
                        <Box w='auto' h='5px' >
                          <Text p={1}>
                            {customer.code}
                          </Text>
                        </Box>
                        <Box w='auto' h='5px' >
                          <Text p={1}>
                            {customer.sector}
                          </Text>
                        </Box>
                      </HStack>
                    </Box>
                  </HStack>
                </GridItem>
                {/* CLIENTE */}
                <GridItem p="0px 0 0 0" colSpan={5}  >
                  <HStack spacing='5px'>
                    <Box w='auto' h='30px' >
                      <Text className="nameSpacing" bg="rgb(15 62 140)" borderRadius="md" p={1}>
                        CLIENTE:
                      </Text>
                      
                    </Box>
                    <Box w='auto' h='30px' >
                      <Text p={1}>
                        {customer.name}
                      </Text>
                    </Box>
                  </HStack>
                </GridItem>
                {/* DIRECCION */}
                <GridItem colSpan={5}  >
                  <HStack spacing='5px'>
                    <Box w='auto' h='30px' >
                      <Text className="nameSpacing" bg="rgb(15 62 140)" borderRadius="md" p={1}>
                        DIRECCIÓN:
                      </Text>
                      
                    </Box>
                    <Box w='auto' h='30px' >
                      <Text p={1}>
                        {customer.address}
                      </Text>
                    </Box>
                  </HStack>
                </GridItem>
                {/* NIT Y TELEFONO */}
                <GridItem p="10px 0 0 0" colSpan={3}  >
                  
                  <HStack spacing='5px'>
                    <Box w='auto' h='30px' >
                      <Text className="nameSpacing" bg="rgb(15 62 140)" borderRadius="md" p={1}>
                        NIT:
                      </Text>
                      
                    </Box>
                    <Box w='auto' h='30px' >
                      <Text p={1}>
                        {customer.nit}
                      </Text>
                    </Box>
                    <Box w='auto' h='30px' >
                      <Text className="nameSpacing" bg="rgb(15 62 140)" borderRadius="md" p={1}>
                        TELEFONO:
                      </Text>
                      
                    </Box>
                    <Box w='auto' h='30px' >
                      <Text whiteSpace="nowrap" p={1}>
                        {customer.phone}
                      </Text>
                    </Box>
                  </HStack>
                </GridItem>
                
              </Grid>
        </Flex>
       
      </>
    )
}

export default InfoCustomerSinCard



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