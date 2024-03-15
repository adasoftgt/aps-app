import {
    Avatar,
    Badge,
    Button,
    Flex,
    Td,
    Text,
    Tr,
    useColorModeValue,
    Input,
    Grid,
    GridItem,
    IconButton,
    Switch,
    FormControl,
    FormLabel,
    FormHelperText,
    Center,
    Stack,
    Box,
    HStack,
    Tooltip,
    Select,
  } from "@chakra-ui/react";
  import {React,useEffect,useState,useRef} from "react";

  
  import {Capability} from "models"
  import { FaLessThanEqual } from "react-icons/fa";
  
  import { FiEdit, FiDelete, FiSettings, FiSave, FiArrowLeft,FiFile } from "react-icons/fi";
  import { position } from "stylis";
  
  import { useUsers } from "contexts/UsersContext"; 
  
  
  import { Redirect } from 'react-router-dom';

  import DropdownProducts from "components/product/DropdownProducts";
  import Description from "components/product/Description";
  import Name from "components/product/Name";
  import SaleQuantity from "components/product/SaleQuantity";
  import BonusQuantity from "components/product/BonusQuantity";

  import DropdownPrice from "components/product/DropdownPrice";
  
  import { v4 as uuidv4 } from 'uuid';
import { FaGalacticSenate } from "react-icons/fa6";


import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, InvoiceStatus, InvoiceItemStatus, UserConfiguration,BatchChunkStatus} from "models";
  
// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { useTable } from "contexts/TableContext";
import Moneda from "components/Monedas/Moneda";

  function InvoiceCreateRow(props) {
    /*------------------------------ PROPS --------------------- */
    const { key,itemId,index,price,total,bonus,quantity,productItemsId,handleDelete,handleTotal,onUpdateItem} = props 
    
    
    const textColor = useColorModeValue("gray.500", "white");
    const titleColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "navy.900");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    

    const {invoiceDraft} = useUsers()
    const {updateTotal,setUpdateTotal} = useTable()
    const isLast = false
  //   const {
  //     quantity,
  //     bonus,
  //     price,
  //     total,
  //     status,
  // } = props
 

  const [productId,setProductId] = useState('')
  
  const [typePriceVariable,setTypePriceVariable] = useState(false)

  //const [saleQuantity,setSaleQuantity] = useState(0)
  const [enteredSaleQuantity,setEnteredSaleQuantity] = useState(null)
  const [enteredBonusQuantity,setEnteredBonusQuantity] = useState(null)
  //quantity
  const [enteredPrice,setEnteredPrice] = useState(null)
  //price
  const [enteredTotal,setEnteredTotal] = useState(null)
  //total
  const [enteredProductItemsId,setEnteredProductItemsId] = useState(null)
  //productItemsId

  //const [total,setTotal] = useState()
  //const totalRef = useRef(total)
  //const saleQuantityRef = useRef(0)

  //console.log('2f9782f2-396b-45a2-a00f-2978fae58f07',itemId,quantity,price,total,productItemsId, new Date())

  /**
   * Capturar el cambio de precio del componente del desplegable
   * @param {*} event 
   */
  const handlePrice = (event) =>{
    if(event.target.value != ''){
      if(event.target.value == '0'){
        setTypePriceVariable(true)
      }else{
        setEnteredPrice(event.target.value);

        setTypePriceVariable(false)
      }
      
    }else{
      setEnteredPrice(0)
      setTypePriceVariable(false)
    }
  }

  const handleQuantity = (_quantity) =>{
    setEnteredSaleQuantity(_quantity)
  }

  const handleBonusQuantity = (_quantity) =>{
    setEnteredBonusQuantity(_quantity)
  }

  

  /**
   * Caputar la cantidad generada por el componente saleQuantity
   * @deprecated
   */
  const handleCatchSaleQuantity = (quantity) =>{
    console.log('cantidad cantidad',quantity)
    setEnteredSaleQuantity(quantity)
  }


  
  useEffect( async() => {
      
      if(enteredSaleQuantity !== null || enteredPrice !== null){
        console.log('c8510d4c-24e1-4c2d-bd5c-234fab1a9860',enteredSaleQuantity ?? quantity,enteredPrice ?? price)
        const total = parseFloat(parseInt(enteredSaleQuantity ?? quantity) * parseFloat(enteredPrice ?? price))
        
        setEnteredTotal(total)
      
      
        onUpdateItem(index,false,'total',total) 
      }
  },[enteredSaleQuantity,enteredPrice])
  


    const handleSetPrice = async(e) =>{
      onUpdateItem(index,false,'price',e.target.value)
    }

    const handleSetProduct = async(e) =>{
      const productId = e.target.value
      setEnteredProductItemsId(productId)
      const product = await DataStore.query(Product, productId)
      /*const invoiceItem = await DataStore.query(InvoiceItem, itemId)
      const newProduct = InvoiceItem.copyOf(invoiceItem, updated => {
        updated['product'] = product
      })*/
      onUpdateItem(index,false,'product',product)
      
    }     
  
    return (
      <>
        
        <Controls 
          key={key}
          onDelete={handleDelete}
          itemId={itemId}
          enteredSaleQuantity={enteredSaleQuantity}
          enteredBonusQuantity={enteredBonusQuantity}
        />

        <Tr key={key} >
          <Td 
            
            minWidth={{ sm: "250px" }}
            pl="0px"
            borderColor={borderColor}
            borderBottom={isLast ? "none" : null}
          >
            <DropdownProducts 
              invoiceItemId={props.itemId}
              onSetProduct={handleSetProduct}
              productItemsId={enteredProductItemsId ?? productItemsId}
            />
          </Td>
          <Td  borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Flex direction="column">
               <Name productId={enteredProductItemsId ?? productItemsId} />
            </Flex>
          </Td>
          <Td   borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Flex direction="column">
               <Description productId={enteredProductItemsId ?? productItemsId} />
            </Flex>
          </Td>
          <Td   borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            
            <SaleQuantity 
              invoiceItemId={itemId}
              productId={enteredProductItemsId ?? productItemsId}
              onUpdateItem={onUpdateItem}
              onQuantity={handleQuantity}
              typeQuantity={BatchChunkStatus.SALES_QUANTITY}
              index={index}
              
            />
            
          </Td>
          <Td   borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            
            {/* <Input 
              type="text"
              placeholder="quantity" 
              value={bonus}
              onChange={(e) => setBonus(e.target.value)}  
            /> */}
            
            <SaleQuantity 
              invoiceItemId={itemId}
              productId={enteredProductItemsId ?? productItemsId}
              onUpdateItem={onUpdateItem}
              onQuantity={handleBonusQuantity}
              typeQuantity={BatchChunkStatus.BONUS_QUANTITY}
              index={index}
              
            />
            
          </Td>
          <Td   borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            {typePriceVariable ? (
              <HStack spacing="5px">
                  <Box w="150px" h="40px">
                    <Input type="text" value={enteredPrice ?? price} onChange={handleSetPrice}/>
                  </Box>
              </HStack>
            ):(
              <HStack spacing="5px">
                <Box w="150px" h="40px">
                  <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                    <Moneda amount={parseFloat(enteredPrice ?? price).toFixed(2)} />
                  </Text>
                </Box>
              </HStack>
              
            )}
            
          </Td>

          <Td   borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
              <DropdownPrice 
                
                itemId={itemId} 
                index={index} 
                productId={enteredProductItemsId ?? productItemsId} 
                onUpdateItem={onUpdateItem}
                onPrice={handlePrice}
                price={enteredPrice ?? price}
              />
            </Text>
          </Td>

          <Td   borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
              <Moneda amount={parseFloat(enteredTotal ?? total).toFixed(2)}/>
            </Text>
          </Td>
          
        </Tr>
      </>
    );
  }

  function Controls(props){
    const {key,onDelete,itemId,enteredSaleQuantity,enteredBonusQuantity} = props

    const {invoiceDraft} = useUsers()
    
    const textColor = useColorModeValue("gray.500", "white");
    
    switch(invoiceDraft.status ?? ''){
        case InvoiceStatus.DRAFT:
            return(
              <Stack  direction={["column", "row","left"]} spacing="24px" key={`stack_${key}`}>
                <Box w="40px" h="40px" bg="transparent">
                  <Tooltip label="Delete item">
                    <IconButton  aria-label="Delete" icon={<FiDelete />} onClick={() => onDelete(itemId,(enteredSaleQuantity + enteredBonusQuantity))} />
                  </Tooltip>
                </Box> 
            </Stack>    
            )
        case InvoiceStatus.SENT:
        case InvoiceStatus.PAID:
        case InvoiceStatus.OVERDUE:
        case InvoiceStatus.CANCELLED:
            return null
        default:
            return null
    }
}
  
  export default InvoiceCreateRow;
  