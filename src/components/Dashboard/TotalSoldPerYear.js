/**
 * El mejor vendedor que mas a cobrado
 */

import React,{useState,useEffect} from "react"

import { Text,HStack } from "@chakra-ui/react"

import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, TypeDocument, InvoiceStatus,Customer,BatchChunk, BatchChunkStatus ,Batch, Payment } from "models";
  
// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';

import { useUsers } from "contexts/UsersContext";

import Moneda from "components/Monedas/Moneda";

const TotalSoldPerYear = (props) =>{

    
    // SELLERS
    const { sellers } = useUsers() 

    const [totalVentas,setTotalVentas] = useState({})
    

    const getStartOfYear = () => {
        const now = new Date();
        return new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
    };
    
    const getEndOfYear = () => {
        const now = new Date();
        return new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
    };

    useEffect( async() =>{
    
        

        
            const startDateFix = getStartOfYear(); // June 1st, 2024 (month starts at 0)
            const endDateFix = getEndOfYear(); // June 7th, 2024
            


            const invoices = await DataStore.query(Invoice,
                c => c.and( c => [
                    c.fecha.ge(startDateFix.toISOString()),
                    c.fecha.le(endDateFix.toISOString()),
                    c.status.eq(InvoiceStatus.SENT)
                    
                ]),
            );
            
            const saldoUnformat = invoices.reduce((saldoSum, invoice) => saldoSum + invoice.total, 0)
            setTotalVentas(saldoUnformat)
          
        

        return () =>{

        }
    },[])

    


    return(
        
        <HStack spacing="24px">
            <Text>
                <Moneda amount={totalVentas}/>
            </Text>
        </HStack>
        
    )
}


export default TotalSoldPerYear