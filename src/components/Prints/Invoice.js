
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

import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, TypeDocument, InvoiceStatus,Customer,BatchChunk,Batch,BatchChunkStatus,Payment,PaymentMethod } from "models";
// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';


import Name from 'components/product/Name';
import Description from 'components/product/Description';

import Moneda from 'components/Monedas/Moneda';

import DisplayQuantity from 'components/product/DisplayQuantity';

import InfoCustomer from 'components/Customers/Info2';

import { useReactToPrint } from 'react-to-print';

import { FaPrint } from "react-icons/fa";

import WhatDocument from "components/invoices/WhatDocument";

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
        <IconButton aria-label='Search database' onClick={handlePrint} icon={<FaPrint />} />
        <Box width="9.5in" height="auto" padding="1in" border="1px solid #e2e8f0" boxShadow="lg" margin="auto" ref={componentRef}>
            <VStack spacing={4} align="stretch">
                <Flex justify="space-between" align="center">
                <Image src={apsFarma} alt="Logo" boxSize="100px" />
                <Divider />
                <Card >
                    <CardBody >
                        <VStack align="flex-end" spacing={0}>
                            <Text fontSize="2xl" fontWeight="bold"><WhatDocument typeDocument={invoice.typeDocument} /></Text>
                            <Text>No: {invoiceId}</Text>
                            <Text>Fecha: {invoice.fecha}</Text>
                        </VStack>
                    </CardBody>
                </Card>
                
                </Flex>

                <Divider />

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
                <InfoCustomer id={customerId}/>

                <Divider />
                <Card >
                    <CardBody >
                        <Table variant="simple">
                            <Thead>
                                <Tr>
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
                    </CardBody>
                </Card>
               

                <Divider />

                
                <Flex justify="flex-end">
                    <Card >
                        <CardBody >
                            <VStack align="flex-end" spacing={2}>
                                <HStack>
                                <Text fontWeight="bold">Subtotal:</Text>
                                <Text><Moneda amount={total}/></Text>
                                </HStack>
                                <HStack>
                                <Text fontWeight="bold">Impuestos:</Text>
                                <Text><Moneda amount={0}/></Text>
                                </HStack>
                                <HStack>
                                <Text fontWeight="bold">Total:</Text>
                                <Text><Moneda amount={total}/></Text>
                            </HStack>
                    </VStack>
                        </CardBody>
                    </Card>
                   
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
                    <Tr>
                        <td>22</td>
                        <Td><Description productId={productItemsId}/></Td>
                        <Td><DisplayQuantity invoiceItemId={id} BatchChunkStatus={BatchChunkStatus.SALES_QUANTITY}/></Td>
                        <Td isNumeric><DisplayQuantity invoiceItemId={id} BatchChunkStatus={BatchChunkStatus.BONUS_QUANTITY}/></Td>
                        <Td isNumeric><Moneda amount={price}/></Td>
                        <Td isNumeric><Moneda amount={total}/></Td>
                    </Tr>
                )
          })}
        </>
        
       
    )
}


export default InvoicePrint;




