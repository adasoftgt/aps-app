import React, { useEffect, useState } from "react";


import { Text,useColorModeValue } from "@chakra-ui/react";

import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, TypeDocument, InvoiceStatus,Customer,BatchChunk,Batch,BatchChunkStatus,Payment,PaymentMethod } from "models";
// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';


const DisplayQuantity = (props) =>{

    const {invoiceItemId,BatchChunkStatus} = props

    const textColor = useColorModeValue("gray.500", "white");

    const [quantity,setQuantity] = useState(0)

    const checkQuantityChunks = async() =>{
        
        const chunks  = await DataStore.query(BatchChunk, 
            c => c.and( c => [
                c.invoiceItemChunksId.eq(invoiceItemId),
                c.status.eq(BatchChunkStatus) //BONUS_QUANTITY
            ]),
            { sort: (s) => s.dateCreated(SortDirection.ASCENDING) }
        );
        
        const disponible = chunks.reduce( (chunkSum,chunk) => chunkSum + chunk.quantity, 0)
        

        setQuantity(disponible)
        
    }

    useEffect( async() =>{
        checkQuantityChunks()
        return () =>{

        }
    },[])

    return(
        <>
            {quantity}
        </>
    )
}


export default DisplayQuantity