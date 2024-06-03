import { Text } from "@chakra-ui/react"
import {React, useEffect, useState} from "react"

import { Product } from "models";

import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';


function Description(props){
    

    const {productId,key} = props

    console.log('descrip productId', productId,key)
    const [description,setDescription] = useState('')

    const getDescription = async() =>{
        const product = await DataStore.query(Product, productId);
        if(product){
            console.log('llegue aqui descripcion ')
            setDescription(product.description)
        }
    }

    useEffect( async() => {
        
        getDescription()
        

        return () =>{

        }
    },[productId])
    


    return (
        <>
            {description}
        </>
    )
}

export default Description