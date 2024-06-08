import React,{useState,useEffect} from "react"

import { Text,HStack } from "@chakra-ui/react"

import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, TypeDocument, InvoiceStatus,Customer,BatchChunk, BatchChunkStatus ,Batch, Payment } from "models";
  
// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';

import { useApsProductContext } from "contexts/ApsProductContext";

const BestSellingProduct = (props) =>{

    // MODELS PRODUCTS
    const { apsProductModels } = useApsProductContext()

    const [maxProduct,setMaxProduct] = useState({})

    const getStartOfMonth = () => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
      };
      
    const getEndOfMonth = () => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    };

    useEffect( async() =>{
    
        if(Object.keys(apsProductModels).length != 0){
            const maxProductReduce = await apsProductModels.reduce( async(maxProduct,apsProductModel) =>{
                const productId = apsProductModel.id
                
                const startDateFix = getStartOfMonth()
                const endDateFix = getEndOfMonth()

                const invoices = await DataStore.query(Invoice,
                    c => c.and( c => [
                        c.fecha.ge(startDateFix.toISOString()),
                        c.fecha.le(endDateFix.toISOString()),
                        c.status.eq(InvoiceStatus.SENT)
                    ]),
                );
                const quantityProduct = await invoices.reduce(
                    async(invoiceSum, invoice) =>{
                        const invoiceId = invoice.id
                        const invoiceItems = await DataStore.query(InvoiceItem,
                            c => c.and( c => [
                                c.invoiceItemsId.eq(invoiceId),
                                c.productItemsId.eq(productId)
                            ]),
                        );
                        
                        //if(invoiceItems.length != 0){
                        const invoiceSumNumber = await invoiceSum
                            //}
                        
                        return invoiceSumNumber + await invoiceItems.reduce( async(itemSum, invoiceItem) => {
                            const invoiceItemId = invoiceItem.id
                            const chunks  = await DataStore.query(BatchChunk, 
                                c => c.and( c => [
                                    c.invoiceItemChunksId.eq(invoiceItemId),
                                    c.or(c => [
                                        c.status.eq(BatchChunkStatus.SALES_QUANTITY),
                                        c.status.eq(BatchChunkStatus.BONUS_QUANTITY)
                                    ])
                                ]),
                                { sort: (s) => s.dateCreated(SortDirection.ASCENDING) }
                            );
                            const itemSumNumber = await itemSum

                            return itemSumNumber + chunks.reduce( (chunkSum,chunk) => chunkSum + chunk.quantity, 0)

                        },Promise.resolve(0))
                    },Promise.resolve(0)
                )
                //current product
                const product = {
                    "sku": apsProductModel.sku,
                    "name": apsProductModel.name,
                    "model": apsProductModel,
                    "quantity": quantityProduct,
                    "quantityUnFormat":quantityProduct
                }
                
                
                const maxProductObj = await maxProduct

                return product.quantity > maxProductObj.quantity ? product : maxProductObj

            },Promise.resolve({"quantity": 0}))

            setMaxProduct(maxProductReduce)
        
        }


        return () =>{

        }
    },[apsProductModels])

    


    return(
        
        <HStack spacing="24px">
            <Text>
                {maxProduct.sku}
            </Text>
            <Text>
                {maxProduct.name}
            </Text>
        </HStack>
        
    )
}


export default BestSellingProduct