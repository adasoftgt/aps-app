
import {React} from "react"

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


import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, TypeDocument, InvoiceStatus, InvoiceItemStatus, UserConfiguration,BatchChunk,Batch,PaymentMethod,} from "models";
/*
enum PaymentMethod {
  CASH
  CREDIT_CARD
  DEBIT_CARD
  BANK_TRANSFER
  OTHER
} */
export default function DropDownPaymentMethod(props){

    const {paymentmethod,onPaymentMethod} = props
    
    return (
        <FormControl id="country">
            <Select placeholder="Select Method" value={paymentmethod} onChange={(event) => onPaymentMethod(event.target.value) }>
                <OptionsPaymentMethod />
            </Select>
        </FormControl>
    )
}

export function OptionsPaymentMethod(){
    return (
        <>
            <option value={PaymentMethod.CASH} >EFECTIVO</option>
            <option value={PaymentMethod.CREDIT_CARD}>TARJETA DE CREDITO</option>
            <option value={PaymentMethod.DEBIT_CARD}>TARJETA DE DEBITO</option>
            <option value={PaymentMethod.BANK_TRANSFER}>TRANSFERENCIA</option>
            <option value={PaymentMethod.OTHER}>OTRO</option>
        </>
    )
    
    
}

