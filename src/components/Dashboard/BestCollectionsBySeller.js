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

const BestCollectionsBySeller = (props) =>{

    
    // SELLERS
    const { sellers } = useUsers() 

    const [maxSeller,setMaxSeller] = useState({})
    

    const getStartOfMonth = () => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
      };
      
    const getEndOfMonth = () => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    };

    useEffect( async() =>{
    
        const maxSellerReduce = await sellers.reduce (async(sellerMax,seller) => {
            /**
             * @type {String} indentificador unico de usuario cognito
             */
            const seller_sub = seller.Attributes.find(attr => attr.Name === 'sub').Value;

            const startDateFix = getStartOfMonth(); // June 1st, 2024 (month starts at 0
            const endDateFix = getEndOfMonth(); // June 7th, 2024
            


            const payments = await DataStore.query(Payment,
                c => c.and( c => [
                    c.userId.eq(seller_sub),
                    c.fecha.ge(startDateFix.toISOString()),
                    c.fecha.le(endDateFix.toISOString()),
                ]),
            );
            
            
    
            
            const saldoUnformat = payments.reduce((saldoSum, payment) => saldoSum + payment.amount, 0)
            const saldo = <Moneda amount={saldoUnformat}/>
            
            const currentSeller = {
                sellerUserName: seller.Username,
                saldo: saldo,
                saldoUnFormat:saldoUnformat
            }

            const sellerMaxObj = await sellerMax

            return currentSeller.saldoUnFormat > sellerMaxObj.saldoUnFormat ? currentSeller : sellerMaxObj
        
        },Promise.resolve({"saldoUnFormat":0}))

        setMaxSeller(maxSellerReduce)

        return () =>{

        }
    },[sellers])

    


    return(
        
        <HStack spacing="24px">
            <Text>
                {maxSeller.sellerUserName}
            </Text>
            <Text>
                {maxSeller.saldo}
            </Text>
        </HStack>
        
    )
}


export default BestCollectionsBySeller