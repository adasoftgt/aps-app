
import {React, useRef, useState} from "react"

// Chakra imports
import {
    Flex,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Grid,
    Switch,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button, ButtonGroup,
    IconButton,
  
    Select,
    Stack, HStack, VStack,StackDivider,
  
    Box,
    Badge,
    Icon,
    Tooltip,
  } from "@chakra-ui/react";


import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, TypeDocument, InvoiceStatus, InvoiceItemStatus, UserConfiguration,BatchChunk,Batch} from "models";

function InputPrice(props){

    const {
        index,
        price,
        onSetEnteredPrice,
        onUpdateItem
    } = props

    const [enteredPrice,setEnteredPrice] = useState(null)
    const interval = useRef(null)
    
    const handleSetPrice = async(e) =>{
        
        setEnteredPrice(e.target.value)
        
        onUpdateItem(index,false,'price',e.target.value)
        if(interval.current != null){
           clearInterval(interval.current) 
        } 
        interval.current = setInterval(() => {
            if(Number.isFinite(parseFloat(e.target.value))){
                onSetEnteredPrice(e.target.value)
            }
        }, 800);
        
    }

    return (
        <Input type="text" value={enteredPrice ?? price} onChange={handleSetPrice}/>
    )
}

export default InputPrice