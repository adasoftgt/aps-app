
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


import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, TypeDocument, InvoiceStatus, InvoiceItemStatus, UserConfiguration,BatchChunk,Batch} from "models";

function DropDownTypeDocument(props){

    const {typeDocument,onTypeDocument} = props
    
    return (
        <FormControl id="country">
            <Select placeholder="Select document" value={typeDocument} onChange={(event) => onTypeDocument(event.target.value) }>
                <option value={TypeDocument.INVOICE} >Factura</option>
                <option value={TypeDocument.SHIPPING}>Envio</option>
                <option value={TypeDocument.NOTE}>Nota</option>
            </Select>
        </FormControl>
    )
}

export default DropDownTypeDocument