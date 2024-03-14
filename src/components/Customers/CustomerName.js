import {React, useEffect, useState} from "react";

import { Text } from "@chakra-ui/react"

import { DataStore } from "@aws-amplify/datastore";

import { Customer } from "models";




function CustomerName(props){

    const {id} = props

    
    const [customer,setCustomer] = useState([])

    useEffect( async()=>{
        
        const customer = await DataStore.query(Customer, id)
        setCustomer(customer ?? [])
    },[id])


    
    return(
        <Text fontSize="lg">
            {customer.name ?? ''}
        </Text>
    )
}

export default CustomerName