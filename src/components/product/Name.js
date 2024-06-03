import { Text } from "@chakra-ui/react"
import {React, useEffect, useState} from "react"

import { Product } from "models";

import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';


function Name(props){
    

    const {productId,key} = props
    const [name,setName] = useState('')

    const getName = async() =>{
        const product = await DataStore.query(Product, productId);
        if(product){
            setName(product.name)
        }
    }

    useEffect( async() => {
        
        getName()
        

        return () =>{

        }
    },[productId])
    


    return (
        <>
             {name}
        </>
           
    )
}

export default Name