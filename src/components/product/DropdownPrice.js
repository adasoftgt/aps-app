

/**
 *  const prices = await DataStore.query(ProductPrice, 
            c => c.productPriceProductId.eq(product.id),
            { sort: (s) => s.dateCreated(SortDirection.DESCENDING),limit: 1 }
          );
 */
import { FormControl,FormLabel, Select, useColorModeValue, Text  } from "@chakra-ui/react";

import { Stack, HStack, VStack, Box } from "@chakra-ui/react"


import React, { useEffect, useMemo, useState } from "react";

import { v4 as uuidv4 } from 'uuid';

import { Product, ProductStatus, ProductPrice,ProductPriceStatus, Category, Rol, InvoiceItem, InvoiceStatus} from "models";
// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';

import { useUsers } from "contexts/UsersContext";

import Moneda from "components/Monedas/Moneda";

function DropdownPrice(props){
    
    /** --------------------------------PROPS ---------------------- */
    const { itemId, index, productId, price, onUpdateItem,onPrice} = props
    const [prices,setPrices] = useState([])

    useEffect( async() =>{
        const prices = await DataStore.query(ProductPrice, 
            c => c.productPriceProductId.eq(productId),
            { sort: (s) => s.dateCreated(SortDirection.DESCENDING),limit: 1 }
        );
        setPrices(prices)
        
    },[productId])

    const handlePriceInterno = async(value) =>{
        //setPrice(event.target.value)     
        onPrice(value)
        // actualizar los modelos
        
    }

    const priceMap = useMemo( () => 
        prices.map( (price) => {
            return(
                <>
                    <option  key={uuidv4()}  value={ProductPriceStatus.CUSTOM}>Price Variable</option>
                    {price.unit != 0 && <option  key={uuidv4()}  value={price.unit}>Price Unit</option>}
                    {price.offer != 0 && <option  key={uuidv4()}  value={price.offer}>Price offer</option>}
                    {price.et != 0 && <option  key={uuidv4()}  value={price.et}>Price ET</option>}
                    {price.pharmacy != 0 && <option  key={uuidv4()}  value={price.pharmacy}>Price pharmacy</option>}
                    
                    
                    
                    
                </>
            )   
        } ) 
    ,[prices])

    return(
        
        <Controls 
            index={index}
            priceMap={priceMap}
            price={price}
            onPriceInterno={handlePriceInterno}
            onUpdateItem={onUpdateItem}
        />
        
    )
}

function Controls(props){
    const {index,onUpdateItem,priceMap,price,onPriceInterno} = props

    const {invoiceDraft} = useUsers()

    const [selectDropDown,setSelectDropDown] = useState(null)
    
    useEffect( async() => {
        switch(selectDropDown){
            case ProductPriceStatus.CUSTOM:
                onUpdateItem(index,false,'productPriceStatus',ProductPriceStatus.CUSTOM)
                break;
            default:
                onUpdateItem(index,false,'productPriceStatus',ProductPriceStatus.PRESET)
                break;
        }
        
        onPriceInterno(selectDropDown)
        return () =>{

        }
    },[selectDropDown])

    const textColor = useColorModeValue("gray.500", "white");
    
    switch(invoiceDraft.status ?? ''){
        case InvoiceStatus.DRAFT:
            return(
                <HStack key={uuidv4()} spacing="24px">
            <Box w="150px" h="40px">
                <Select placeholder="Select Price" value={selectDropDown ?? price} onChange={(e) => setSelectDropDown(e.target.value)} >
                    {
                        priceMap
                    }
                    
                </Select>
            </Box>
        </HStack>
            )
        case InvoiceStatus.SENT:
        case InvoiceStatus.PAID:
        case InvoiceStatus.OVERDUE:
        case InvoiceStatus.CANCELLED:
            return (
                <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                    <Moneda amount={parseFloat(price).toFixed(2)} />
                </Text>
            )
        default:
            return null
    }
}


export default DropdownPrice