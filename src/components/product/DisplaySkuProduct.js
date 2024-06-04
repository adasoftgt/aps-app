import { Text } from "@chakra-ui/react"
import {React, useEffect, useState} from "react"

import { Product } from "models";

import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';


function DisplaySkuProduct(props){
    

    const {productId,key} = props
    const [sku,setSku] = useState('')

    const getSku = async() =>{
        const product = await DataStore.query(Product, productId);
        if(product){
            setSku(product.sku)
        }
    }

    useEffect( async() => {
        
        getSku()
        

        return () =>{

        }
    },[productId])
    


    return (
        <>
             {sku}
        </>
           
    )
}

export default DisplaySkuProduct