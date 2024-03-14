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
    Stack, HStack, VStack,
  
    Box,
  } from "@chakra-ui/react";
  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
  import TablesProjectRow from "components/Tables/TablesProjectRow";
  // table row
  import ProductsRow from "components/Tables/ProductsRow";
  import React,{useState,useEffect,useRef,useMemo} from "react";
  import { tablesProjectData, tablesTableData } from "variables/general";
  import Pagination from "components/Pagination/Paginacion.js"
  import Capabilities from "components/Capabilities/Capabilities.js"
  
  import { Product, ProductStatus, ProductPrice, Category, Rol, InvoiceItem} from "models";
  
  import {USER_OPERATION} from "structures"
  
  
  // Amplify datastore
  import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
  
  
  
  
  import { useToast } from '@chakra-ui/react'
  
  // ICONS FI
  import { FiArrowLeft,FiPlusSquare, FiDollarSign, FiEdit} from "react-icons/fi";
  
  import { useTable } from "contexts/TableContext";
  import { useAuth } from "contexts/AuthContext";
  import { jsx } from "@emotion/react";

  import { v4 as uuidv4 } from 'uuid';

  import configAsp from "config/config";




function DropdownDepartamento(props){
    

    const {invoiceItemId,productId,setProductId} = props
    const productIdRef = useRef(productId)
    const [departamentos,setDepartamentos] = useState([])

    const getDepartamentos = async() => {
        try{  
          
            const departamentos = Object.keys(configAsp.departamentos)
            
            setDepartamentos(products)
          
        }catch(err){
          console.log('Error: recolectar productos',err)
        }
    }

    useEffect( async() =>{
        getDepartamentos()
        return () =>{

        }
    },[invoiceItemId])

    // useEffect( async() =>{
        
    //     getProducts()
    //     return () =>{

    //     }
    // },[productId])

    const handleDepartamento = async(event) =>{
        if(event.target.value != productIdRef.current){
            const product = await DataStore.query(Product, event.target.value);
            const invoiceItem = await DataStore.query(InvoiceItem, invoiceItemId);
            
            console.log('product invoiceItem',product,invoiceItem,invoiceItemId)
            if (product && invoiceItem) {
                
                const updatedInvoiceItem = DataStore.save(
                    InvoiceItem.copyOf(invoiceItem, updated => {
                        updated['product'] = product
                    })
                );
                productIdRef.current = event.target.value
                setProductId(event.target.value)
            }

        }else{
            console.log('no llego')
        }
            
            
    }
    
    return (
        <FormControl display="flex" alignItems="center">
            <Select placeholder="Select Departamento" value={productId} onChange={handleDepartamento}>
                {departamentos.map( (departamento,index,arr) =>{
                    
                   
                        return(
                            <option value={departamento.id} key={uuidv4()}>{departamento.sku}</option>
                        )
                    
                })}
            </Select>
        </FormControl>
    )   
}

export default DropdownDepartamento