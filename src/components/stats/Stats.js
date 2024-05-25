
import React,{useState,useEffect,useRef} from "react";
import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, TypeDocument, InvoiceStatus,Customer,BatchChunk,Batch,Payment,PaymentMethod } from "models";
// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { BatchChunkStatus } from "models";

import Moneda from "components/Monedas/Moneda";

/**
 * Cuantos lostes tiene un producto
 * @param {String} productId Identificador de producto
 * @returns {JSX.Element} Renders the total batch quantity.
 */
export const ProductBatchQuantity = ({productId}) =>{
    const [quantityBatch,setQuantityBatch] = useState()
  
    /**
    * LLamada a dataStore Batch, para obenter la lista de batches(lotes)
    */
    useEffect( async() => {
        const batches = await DataStore.query(Batch, 
        c => c.productBatchesId.eq(productId)
        );
        const quantity = batches.reduce((batchSum, batch) => batchSum + 1, 0)
        setQuantityBatch(quantity)
        return () =>{

        }
    },[])

    return(
        <>{quantityBatch}</>
    );
}

/**
 * La venta total de un producto
 * @param {Array} items lista de invoiceItems(items de una factura)
 * @returns {JSX.Element} Renders the total Sale
 */
export const ProductTotalSale = ({items}) =>{
    const [totalSale,setTotalSale] = useState()
    useEffect( async() => {
        const ingresos = items.reduce((ingresoSum, item) => ingresoSum + item.total, 0)
        setTotalSale(ingresos)
        
        return () =>{
    
        }
      },[items])
    return(
        <Moneda amount={totalSale}/>
    );
}

/**
 * La cantidad de producto ya se vendido o dado como bono extra en la facturacion
 * @param {Array} items lista de invoiceItems(items de una factura)
 * @param {BatchChunkStatus} batchChunkStatus Estado del trozo de lote ej. SALES_QUANTITY | BONUS_QUANTITY
 * @returns {JSX.Element} Renders the sale quantity
 */
export const ProductQuantity = ({items,batchChunkStatus}) =>{
    const [saleQuantity,setSaleQuantity] = useState()
    const invoiceItemSaleQuantity = useRef(0)
    useEffect( async() => {

        invoiceItemSaleQuantity.current = 0
          await Promise.all(items.map( async(invoiceItem) => {
            const chunks  = await DataStore.query(BatchChunk, 
              c => c.and( c => [
                  c.invoiceItemChunksId.eq(invoiceItem.id),
                  c.status.eq(batchChunkStatus)
              ])
            );
            invoiceItemSaleQuantity.current += chunks.reduce((chunkSum, chunk) => chunkSum + chunk.quantity, 0)
    
          }))
          
          const quantity = invoiceItemSaleQuantity.current
          setSaleQuantity(quantity)
        
    
        return ()=>{
    
        }
      },[items])
    return(
        <>{saleQuantity}</>
    );
}