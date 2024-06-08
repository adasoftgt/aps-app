
import React,{useEffect, useState, useRef } from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  VStack,
  HStack,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from '@chakra-ui/react';

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import apsFarma from './new_logo_aps.png'
import apsFel from './FEL.png'

import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, TypeDocument, InvoiceStatus,Customer,BatchChunk,Batch,BatchChunkStatus,Payment,PaymentMethod } from "models";
// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';


import Name from 'components/product/Name';
import DisplaySkuProduct from 'components/product/DisplaySkuProduct';
import Description from 'components/product/Description';

import Moneda from 'components/Monedas/Moneda';
import TotalLetras from 'components/Monedas/Letras';

import {DisplayQuantity,checkQuantityChunksExtenal} from 'components/product/DisplayQuantity';

import InfoCustomer from 'components/Customers/Info2';
import InfoCustomerSinCard from 'components/Customers/InfoSinCard';


import { useReactToPrint } from 'react-to-print';

import { FaPrint } from "react-icons/fa";

import WhatDocument from "components/invoices/WhatDocument";

import { Global } from "@emotion/react";
import { useFilters } from 'react-table';

const InvoicePrint = (props) => {

    const {invoiceId} = props
    const [invoice,setInvoice] = useState([])
    const [total,setTotal] = useState(0)
    const [customerId,setCustomerId] = useState(0)


    useEffect( async() =>{
        const invoice = await DataStore.query(Invoice,invoiceId);
        
        const {clientId} = invoice

        setCustomerId(clientId)
        setInvoice(invoice)
        
        
        
        
        /*const invoiceItems = await DataStore.query(InvoiceItem, 
            c => c.productItemsId.eq(productId)
          );*/

        return () =>{

        }
    },[])


    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
  

    



    return (
    <>
        <Global
            styles={`
                @media print {
                    @page {
                        margin: 2cm 0; /* Ajusta los márgenes de la página para impresión */
                    }

                    @page :first {
                        margin-top: -0.2cm;
                      }
                    
                    @page :last {
                        //margin-bottom: -0.2cm;
                    }

                    body {
                        font-size: 10pt;
                        color: black;
                    }

                    table {
                        width: 100%;
                        border-collapse: collapse;
                        page-break-inside: auto;
                    }

                    thead {
                        margin-top: 300px
                    }

                    th, td {
                        border: 1px solid black;
                        padding: 8px;
                        text-align: left;
                    }

                    th {
                        background-color: rgb(56 171 49);
                        color: black !important;
                    }

                    .no-print {
                        display: none;
                    }

                    .print-header, .print-footer {
                        position: absolute;
                        width: 85%;
                        text-align: center;
                        background-color: white;
                        padding: 10px 0;
                        z-index: 1000;
                    }

                    .print-header {
                        position: absolute !important;
                        top: 25px;
                        border-bottom: 1px solid black;
                        
                    }

                    .print-footer {
                        bottom: 0.2cm;
                        border-top: 1px solid black;
                      }


                    .print-table {
                        margin-top: 80px; /* Adjust according to header height */
                        margin-bottom: 50px; /* Adjust according to footer height */
                    }

                    .nameSpacing{
                        color: white !important;
                    }
                    
                    
                }

                

                
               

                th {
                    background-color: rgb(15 62 140);
                    color: white !important;
                }
                
            `}
        />
        <IconButton aria-label='Search database' onClick={handlePrint} icon={<FaPrint />} />
        <Box width="9.5in" height="auto" padding="1in" border="1px solid #e2e8f0"  margin="auto" ref={componentRef}>
            <Flex align="center" className='print-header'>
                <Image src={apsFarma} alt="Logo" boxSize="100px" />
            
                <VStack align="center" spacing={0}>
                    <Text className="nameSpacing" fontSize="2xl" letterSpacing="20px" whiteSpace="nowrap" bg="rgb(15 62 140)" borderRadius="md" p="0 0 0 10px" border="2px solid rgb(15 62 140)" fontWeight="bold">APS</Text>
                    <Text fontSize='xs'>CORPORACION APS FARMA, SOCIEDAD ANONIMA</Text>
                    <Text>Sector 3 colonia planes de Barcenas Lote 7 sector Encinos S-4 zona 3 Villa Nueva Guatemala</Text>
                    <HStack>
                        <Text className="nameSpacing" bg="rgb(15 62 140)" borderRadius="md" >Nit:</Text>
                        <Text>112869645</Text>
                    </HStack>
                    
                </VStack>
            </Flex>
            
            <VStack spacing={4} align="stretch" className='apsmain'  p="50px 0 0 0">
                

                {/* <Flex align="center" p="50px 0 0 62%">
                    
                </Flex> */}

                {/* <Divider /> */}

                {/* <Flex justify="space-between" align="flex-start">
                <VStack align="flex-start">
                    <Text fontWeight="bold">Facturar a:</Text>
                    <Text>Nombre del Cliente</Text>
                    <Text>Dirección del Cliente</Text>
                    <Text>Ciudad, Estado, Código Postal</Text>
                </VStack>
                <VStack align="flex-end">
                    <Text fontWeight="bold">Enviado por:</Text>
                    <Text>Nombre de la Empresa</Text>
                    <Text>Dirección de la Empresa</Text>
                    <Text>Ciudad, Estado, Código Postal</Text>
                </VStack>
                </Flex> */}
                <HStack spacing='24px'>
                    <InfoCustomerSinCard id={customerId}/>

                    <VStack align="left" spacing={0} border="2px solid rgb(15 62 140)" borderRadius="md" >
                        <Text align="center" fontSize="2xl" fontWeight="bold"><WhatDocument typeDocument={invoice.typeDocument} /></Text>
                        <Text className="nameSpacing" bg="rgb(15 62 140)" borderRadius="md" w="25%" p="0 0 0 10px">Serie: </Text>
                        <Text>---</Text>
                        <Text className="nameSpacing" bg="rgb(15 62 140)" borderRadius="md" w="20%" p="0 0 0 10px">No:</Text>
                        <Text>{invoiceId}</Text>
                        <Text className="nameSpacing" bg="rgb(15 62 140)" borderRadius="md" w="50%" p="0 0 0 10px">Autorizacion: </Text>
                        <Text>---</Text>
                        <HStack>
                            <Text className="nameSpacing" bg="rgb(15 62 140)" borderRadius="md" w="25%" >Fecha:</Text>
                            <Text>{invoice.fecha}</Text>
                        </HStack>
                        
                    </VStack>
                </HStack>

                {/* <Divider /> */}
                
                <Table variant="simple" fontSize="10px" className="print-table">
                    <Thead color="black">
                        <Tr bg="rgb(15 62 140)">
                            <Th>CODIGO</Th>
                            <Th isNumeric>CANTIDAD</Th>
                            <Th>DESCRIPCIÓN</Th>
                            <Th isNumeric>P. UNITARIO</Th>
                            <Th isNumeric>TOTAL</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <InvoiceTableItems invoiceId={invoiceId} onTotal={setTotal}/>
                        <Tr>
                            <Td colSpan={5} border="1px solid black" whiteSpace="nowrap" py={1}>TOTAL EN LETRAS</Td>
                        </Tr>
                        <Tr>
                            <Td colSpan={3} border="1px solid black" whiteSpace="nowrap" py={1}><TotalLetras amount={total}/></Td>
                            <Td colSpan={1} border="1px solid black" whiteSpace="nowrap" py={1}  bg="rgb(15 62 140)" className="nameSpacing" align="right">TOTAL</Td>
                            <Td colSpan={1} border="1px solid black" whiteSpace="nowrap" py={1}><Moneda amount={total}/></Td>
                        </Tr>
                        {/* Añadir más filas según sea necesario */}
                    </Tbody>
                </Table>
                    
               

                {/* <Divider /> */}

                
                <Flex justify="flex-end">
                    
                    {/* <HStack>
                            <Text fontWeight="bold">Total en letras</Text>
                            <Text><TotalLetras amount={total}/></Text>
                    </HStack> */}
                    {/* <VStack align="flex-end" spacing={2}>
                            <HStack>
                                <Text fontWeight="bold">Subtotal:</Text>
                                <Text whiteSpace="nowrap"><Moneda amount={total}/></Text>
                            </HStack>
                            <HStack>
                                <Text fontWeight="bold">Impuestos:</Text>
                                <Text whiteSpace="nowrap"><Moneda amount={0}/></Text>
                            </HStack>
                            <HStack>
                                <Text fontWeight="bold">Total:</Text>
                                <Text whiteSpace="nowrap"><Moneda amount={total}/></Text>
                        </HStack>
                    </VStack> */}
                     
                   
                </Flex>
                
            </VStack>
            <Flex  className="print-footer">
                <HStack spacing='150%'>
                    <Box w='auto' h='30px' >
                        <Text whiteSpace="nowrap" bg="transparent" borderRadius="md" p={1} border="2px solid blue">
                            CHEQUES A NOMBRE DE: A P S, S.A
                        </Text>
                    </Box>
                    
                    <Image src={apsFel} alt="fel" boxSize="60px" />
                    
                </HStack>
            </Flex>
        </Box>

    
    </>
    
       
  );
};


const InvoiceTableItems = (props) =>{
    
    const {invoiceId,onTotal} = props
    

    const [productId,setProductId] = useState(0)
    const [invoiceItems,setInvoiceItems] = useState([])

    useEffect( async() =>{
        const invoiceItems = await DataStore.query(InvoiceItem, 
            c => c.invoiceItemsId.eq(invoiceId)
        );


        setInvoiceItems(invoiceItems)
        const total = invoiceItems.reduce( (itemSum,item) => itemSum + item.total,0)
        onTotal(total)
        
 
    },[])

    return(
        <>
            {invoiceItems?.map( (invoiceItem, index, arr) =>{
                
                const {productItemsId,total,price,id} = invoiceItem
                return(
                    <>
                        <Tr border="1px solid black">
                            <Td border="1px solid black" whiteSpace="nowrap" py={1}><DisplaySkuProduct productId={productItemsId}/></Td>
                            <Td border="1px solid black" whiteSpace="nowrap" py={1}><DisplayQuantity invoiceItemId={id} BatchChunkStatus={BatchChunkStatus.SALES_QUANTITY}/></Td>
                            <Td border="1px solid black" whiteSpace="nowrap" py={1}><Name productId={productItemsId}/></Td>
                            
                            {/* <Td border="1px solid black" whiteSpace="nowrap" py={1} isNumeric><DisplayQuantity invoiceItemId={id} BatchChunkStatus={BatchChunkStatus.BONUS_QUANTITY}/></Td> */}
                            <Td border="1px solid black" whiteSpace="nowrap" py={1} isNumeric><Moneda amount={price}/></Td>
                            <Td border="1px solid black" whiteSpace="nowrap" py={1} isNumeric><Moneda amount={total}/></Td>
                        </Tr>
                        <BonusTr invoiceItem={invoiceItem}  />
                    </>
                )
          })}
        </>
        
       
    )
}

const BonusTr = (props) =>{
    const {invoiceItem} = props
    
    const {productItemsId,total,price,id} = invoiceItem

    const [isBonus,setIsBonus] = useState(false)

    useEffect( async() =>{
        const bonusQuantity = await checkQuantityChunksExtenal(id,BatchChunkStatus.BONUS_QUANTITY)
        console.log('92e74eab-4710-4497-b4e4-a2502a1fdd6c',bonusQuantity)
        if(bonusQuantity > 0){
            setIsBonus(true)
        }else{
            setIsBonus(false)
        }
        return () =>{
            
        }
    },[invoiceItem])


    return(
        <>
            {isBonus && (
                <Tr border="1px solid black">
                    <Td border="1px solid black" whiteSpace="nowrap" py={1}><DisplaySkuProduct productId={productItemsId}/></Td>
                    <Td border="1px solid black" whiteSpace="nowrap" py={1} isNumeric><DisplayQuantity invoiceItemId={id} BatchChunkStatus={BatchChunkStatus.BONUS_QUANTITY}/></Td>
                    <Td border="1px solid black" whiteSpace="nowrap" py={1}><Name productId={productItemsId}/></Td>
                    <Td border="1px solid black" whiteSpace="nowrap" py={1} isNumeric><Moneda amount={0}/></Td>
                    <Td border="1px solid black" whiteSpace="nowrap" py={1} isNumeric><Moneda amount={0}/></Td>
                </Tr>
            )}
        </>
    )
    
}


export default InvoicePrint;




