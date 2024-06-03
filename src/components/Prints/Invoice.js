
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

import apsFarma from './apsfarma-removebg-preview.png'
import apsFel from './FEL.png'

import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, TypeDocument, InvoiceStatus,Customer,BatchChunk,Batch,BatchChunkStatus,Payment,PaymentMethod } from "models";
// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';


import Name from 'components/product/Name';
import Description from 'components/product/Description';

import Moneda from 'components/Monedas/Moneda';
import TotalLetras from 'components/Monedas/Letras';

import DisplayQuantity from 'components/product/DisplayQuantity';

import InfoCustomer from 'components/Customers/Info2';
import InfoCustomerSinCard from 'components/Customers/InfoSinCard';


import { useReactToPrint } from 'react-to-print';

import { FaPrint } from "react-icons/fa";

import WhatDocument from "components/invoices/WhatDocument";

import { Global } from "@emotion/react";

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
                    body {
                        font-size: 10pt;
                        color: black;
                    }

                    table {
                        width: 100%;
                        border-collapse: collapse;
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
                        position: fixed;
                        width: 85%;
                        text-align: center;
                        background-color: white;
                        padding: 10px 0;
                        z-index: 1000;
                    }

                    .print-header {
                        top: 25px;
                        border-bottom: 1px solid black;
                    }

                    .print-footer {
                        bottom: 35px;
                        border-top: 1px solid black;
                        
                      }

                    @page {
                        margin: 120x 20px 70px 20px; /* Adjust according to header and footer height */
                    }

                    .print-table {
                        margin-top: 80px; /* Adjust according to header height */
                        margin-bottom: 50px; /* Adjust according to footer height */
                    }
                    
                    
                }

                

                
               

                th {
                    background-color: rgb(56 171 49);
                    color: black !important;
                }
                
            `}
        />
        <IconButton aria-label='Search database' onClick={handlePrint} icon={<FaPrint />} />
        <Box width="9.5in" height="auto" padding="1in" border="1px solid #e2e8f0"  margin="auto" ref={componentRef}>
            <VStack spacing={4} align="stretch">
                <Flex justify="space-between" align="center" className='print-header'>
                    <Image src={apsFarma} alt="Logo" boxSize="100px" />
                
                    <VStack align="center" spacing={0}>
                        <Text fontSize="2xl" whiteSpace="nowrap" bg="transparent" borderRadius="md" p={1} border="2px solid rgb(56 171 49)" fontWeight="bold">APS</Text>
                        <Text fontSize='xs'>CORPORACION APS FARMA, SOCIEDAD ANONIMA</Text>
                        <Text>Sector 3 colonia planes de Barcenas Lote 7 sector Encinos S-4 zona 3 Villa Nueva Guatemala</Text>
                    </VStack>
                </Flex>

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
                <HStack spacing='24px' p="40px 0 0 0">
                    <InfoCustomerSinCard id={customerId}/>

                    <VStack align="flex-end" spacing={0} border="2px solid rgb(56 171 49)" borderRadius="md">
                        <Text fontSize="2xl" fontWeight="bold"><WhatDocument typeDocument={invoice.typeDocument} /></Text>
                        <Text>Serie: </Text>
                        <Text>Autorizacion: </Text>
                        <Text >No: {invoiceId}</Text>
                        <Text>Fecha: {invoice.fecha}</Text>
                    </VStack>
                </HStack>

                {/* <Divider /> */}
                
                <Table variant="simple" fontSize="10px" className="print-table">
                    <Thead color="black">
                        <Tr bg="blue.500" >
                            <Th>Codigo</Th>
                            <Th>Descripción</Th>
                            <Th isNumeric>Cantidad</Th>
                            <Th isNumeric>Bonos</Th>
                            <Th isNumeric>Precio Unitario</Th>
                            <Th isNumeric>Total</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <InvoiceTableItems invoiceId={invoiceId} onTotal={setTotal}/>
                        {/* Añadir más filas según sea necesario */}
                    </Tbody>
                </Table>
                    
               

                {/* <Divider /> */}

                
                <Flex justify="flex-end">
                    
                    {/* <HStack>
                            <Text fontWeight="bold">Total en letras</Text>
                            <Text><TotalLetras amount={total}/></Text>
                    </HStack> */}
                    <HStack spacing='24px'>
                        <Box w='auto' h='30px' >
                        <Text whiteSpace="nowrap" bg="blue.500" borderRadius="md" p={1}>
                            Total en letras:
                        </Text>
                        
                        </Box>
                        <Box w='auto' h='30px' >
                        <Text whiteSpace="nowrap" p={1}>
                            <TotalLetras amount={total}/>
                        </Text>
                        </Box>
                    </HStack>
                    <VStack align="flex-end" spacing={2}>
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
                    </VStack>
                     
                   
                </Flex>
                <Flex  className="print-footer">
                    <HStack spacing='24px'>
                        <Box w='auto' h='30px' >
                            <Text whiteSpace="nowrap" bg="transparent" borderRadius="md" p={1} border="2px solid blue">
                                CHEQUES A NOMBRE DE: A P S, S.A
                            </Text>
                        </Box>
                        <Box w='auto' h='30px' >
                            <Image src={apsFel} alt="fel" boxSize="60px" />
                        </Box>
                    </HStack>
                </Flex>
            </VStack>
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
                    <Tr border="1px solid black">
                        <td>22</td>
                        <Td border="1px solid black" whiteSpace="nowrap" py={1}><Description productId={productItemsId}/></Td>
                        <Td border="1px solid black" whiteSpace="nowrap" py={1}><DisplayQuantity invoiceItemId={id} BatchChunkStatus={BatchChunkStatus.SALES_QUANTITY}/></Td>
                        <Td border="1px solid black" whiteSpace="nowrap" py={1} isNumeric><DisplayQuantity invoiceItemId={id} BatchChunkStatus={BatchChunkStatus.BONUS_QUANTITY}/></Td>
                        <Td border="1px solid black" whiteSpace="nowrap" py={1} isNumeric><Moneda amount={price}/></Td>
                        <Td border="1px solid black" whiteSpace="nowrap" py={1} isNumeric><Moneda amount={total}/></Td>
                    </Tr>
                )
          })}
        </>
        
       
    )
}


export default InvoicePrint;




