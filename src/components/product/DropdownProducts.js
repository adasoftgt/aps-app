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
  
  import { Product, ProductStatus, ProductPrice, Category, Rol, InvoiceItem,InvoiceStatus} from "models";
  
  import {USER_OPERATION} from "structures"
  
  
  // Amplify datastore
  import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
  
  
  
  
  import { useToast } from '@chakra-ui/react'
  
  // ICONS FI
  import { FiArrowLeft,FiPlusSquare, FiDollarSign, FiEdit} from "react-icons/fi";
  
  import { useTable } from "contexts/TableContext";
  import { useUsers } from "contexts/UsersContext";
  import { useAuth } from "contexts/AuthContext";
  import { jsx } from "@emotion/react";

  import { v4 as uuidv4 } from 'uuid';






function DropdownProducts(props){
    
    /**------------------------------------- PROPS ----------------------- */
    const {invoiceItemId,productItemsId,onSetProduct} = props
    
    const {invoiceDraft} = useUsers()
    
    //const productIdRef = useRef(productId)
    const [products,setProducts] = useState([])
    const [product,setProduct] = useState({})

    const getProducts = async() => {
        try{  
          
            const products = await DataStore.query(Product)
            setProducts(products)
          
        }catch(err){
          console.log('Error: recolectar productos',err)
        }
    }

    useEffect( () =>{
        if(invoiceItemId !== null){
            getProducts()  
        }
    },[invoiceItemId])


    useEffect( ()=>{
        if(Object.keys(products).length != 0){
            const product = products.find(product => product.id == productItemsId);
            setProduct(product)
        }
    },[products,productItemsId])

    // useEffect( async() =>{
    //     //getProducts()
        
        
    //     const invoiceItem = await DataStore.query(InvoiceItem, invoiceItemId);
    //     if(invoiceItem){
    //         const product = await DataStore.query(Product, invoiceItem.productItemsId);
            
    //         if(product){
    //             setProductId(product.id)
    //         }
    //     }
        
        
        
        
    //     return () =>{

    //     }
    // },[invoiceItemId])

    // useEffect( async() =>{
        
    //     getProducts()
    //     return () =>{

    //     }
    // },[productId])

    // const handleProduct = async(event) =>{
    //     if(event.target.value != productIdRef.current){
    //         const product = await DataStore.query(Product, event.target.value);
    //         const invoiceItem = await DataStore.query(InvoiceItem, invoiceItemId);
            
    //         console.log('product invoiceItem',product,invoiceItem,invoiceItemId)
    //         if (product && invoiceItem) {
                
    //             const updatedInvoiceItem = DataStore.save(
    //                 InvoiceItem.copyOf(invoiceItem, updated => {
    //                     updated['product'] = product
    //                 })
    //             );
    //             productIdRef.current = event.target.value
    //             setProductId(event.target.value)
    //         }

    //     }else{
    //         console.log('no llego')
    //     }
            
            
    // }

    const productsMap = useMemo( () =>
        products.map( (product,index,arr) =>{
            return(
                <option value={product.id} key={uuidv4()}>{product.sku}</option>
            )     
    }),[products])

    const memoizedOptions = useMemo(() => {
        // Function to generate options from data
        return (
            <Select placeholder="Select product" value={productItemsId} onChange={onSetProduct}>
                {products.map( (product,index,arr) =>{
                    return(
                        <option value={product.id} key={uuidv4()}>{product.sku}</option>
                    )     
                })}
            </Select>
        )
      }, [products,productItemsId]); // Re-generate options only when data changes

    
    const selectProduct = useMemo( () =>{
        return(
            <Select placeholder="Select product" value={productItemsId} onChange={onSetProduct}>
                {productsMap}
            </Select>
        )
    },[productItemsId])
    
    return (
        <Controls 
            status={invoiceDraft.status} 
            memoizedOptions={memoizedOptions} 
            product={product} />
    )   
}

function Controls(props){
    const {status,memoizedOptions,product} = props
    
    const textColor = useColorModeValue("gray.500", "white");
    
    switch(status){
        case InvoiceStatus.DRAFT:
            return(
                <FormControl display="flex" alignItems="center">
                    {memoizedOptions}
                </FormControl>
            )
        case InvoiceStatus.SENT:
        case InvoiceStatus.PAID:
        case InvoiceStatus.OVERDUE:
        case InvoiceStatus.CANCELLED:
            return (
                <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                    {product.sku ?? ''}
                </Text>
            )
        default:
            return null
    }
}

export default DropdownProducts