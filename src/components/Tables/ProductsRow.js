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
} from "@chakra-ui/react";

import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Tooltip,
} from "@chakra-ui/react"


import {React,useEffect,useState,useRef, useMemo} from "react";

import {Capability} from "models"
import { FaLessThanEqual } from "react-icons/fa";
import { IoMdOpen } from "react-icons/io";

import { FiEdit, FiDelete, FiSettings, FiSave, FiArrowLeft, FiDollarSign, FiCheckCircle, FiBox, FiLayers, FiEye} from "react-icons/fi";
import { position } from "stylis";
import ListRoles from "components/dropdowns/ListRoles";

import { useUsers } from "contexts/UsersContext";
import { useTable } from "contexts/TableContext"; 

import ApsInput from "./Propertys/ApsInput";

import {ProductPrice,Batch,BatchStatus} from "models";


// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';

import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import { useApsProductContext } from "contexts/ApsProductContext";

import { useToast } from "@chakra-ui/react";

function ProductsRow(props) {
  /**
   * @property {String} displayname nombre a mostrar en el app
   * @property {String} name Nombre del rol
   * @property {Funcion} handleCapabilities manejador para activar capabilities es handle esta el componente /roles
   */
  const {
    isLast,logo,
    id,index,
    name,sku,description,category,status,batches,
    
    //functions
    fillInputsEdit,
    deleteRowFunc,
    setListBatchStatus
    
  } = props;

  //cargar toast
  const toast = useToast()

  // Cargar contexto de producto
  const {apsProductCtxUtils} = useApsProductContext()

  /**
   * Cargando contexto de usuarios
   */
  const {
    apsSearch,setApsSearch,
  } = useUsers()

  /**
   * Cargando contexto de tabla
   */
  const { 
    editGlobalEnabled,
    settingStatus,setSettingStatus,
    idCurrentRow,
  } = useTable()

  const [price, setPrice] = useState([])
  const [productBatches,setProductBatches] = useState([])
  const [productQuantity,setProductQuantity] = useState(0)
  
  
  {
    /**
     * Memoriazacion de la cantidad de productos por batches
     * 
     */
    /*const productQuantityMemo = useMemo( () =>{
      let contador = 0
      productBatches.map( (batch) => {
        contador = contador + batch.quantity 
      })

      return contador
        
    },[productBatches])

  
    useEffect( async() =>{
      
      setProductQuantity(productQuantityMemo)
      // FINALIZAR EFECTO
      return () => {}
    },[productQuantityMemo])*/
  }
  

  //  EFECTO INICIAL
  useEffect( async() =>{
    // PRECIOS
    // Cuando hay mas un objeto relacionado al producto siempre se va elegir el de la fecha mas reciente
    const prices = await DataStore.query(ProductPrice, 
      c => c.productPriceProductId.eq(id),
      { sort: (s) => s.dateCreated(SortDirection.DESCENDING),limit: 1 }
    );
    const price = prices[0]
    /**
     * @property {object} price contiene todos los precios configurados al producto
     */
    setPrice(price)

    // CANTIDAD DE PRODUCTO
    // Obtener la lista de batches con estatus AVAILABLE
    const batches = await DataStore.query(Batch, 
      c => c.and( c => [
        c.productBatchesId.eq(id),
        c.status.eq(BatchStatus.AVAILABLE)
      ]),
      { sort: (s) => s.expiration_date(SortDirection.ASCENDING) }
    );
    
    //console.log('3cd7bc6d-9674-43dc-b59a-b8953d855846',batches)
    
    let contador = 0
    batches.map( (batch) => {
      contador = contador + batch.quantity 
    })

    setProductQuantity(contador)
    //console.log('e9f686b2-87be-4753-8905-d03be09e7e4e',sku,name,contador)
    

    //setProductBatches(batches)

    //setProductQuantity(contador)
    
    // FINALIZAR EFECTO
    return () => {}
  },[id])

  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  
  

  const [editNameStatus,setEditNameStatus] = useState(false)
  
  const handleSettings = async(id) =>{
    idCurrentRow.current = id
    await fillInputsEdit()
  }

  const handleBatch = (id) => {
    console.log('llegue aqui handleBatch')
    idCurrentRow.current = id
    setListBatchStatus(true)
  }

  const handleOpenContext = async(id) =>{
    const resOpen = await apsProductCtxUtils.open(id)
    if(resOpen){
      toast({
        title: 'Open Context Operative Product',
        description: "We've open the operational context Product for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }else{
      toast({
        title: 'Upp.....',
        description: "Not open the operational context Product for you.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Stack direction={["column", "row","left"]} spacing="24px">
        <Box w="40px" h="40px" bg="transparent">
          <IconButton  aria-label="Delete" icon={<FiDelete />} onClick={() => deleteRowFunc(id)} />
        </Box>
        <Box w="40px" h="40px" bg="transparent">
          <IconButton aria-label="Settings" icon={<FiEdit />} onClick={() => handleSettings(id)} />
        </Box>
        <Box w="40px" h="40px" bg="transparent">
          <Tooltip label='List Batch'>
            <IconButton aria-label="Settings" icon={<FiLayers />} onClick={() => handleBatch(id)} />
          </Tooltip>
        </Box>
        <Box w="40px" h="40px" bg="transparent">
          <NavLink to={`product/${id}`}>
            <Tooltip label='Ver Producto'>
              <IconButton aria-label="Settings" icon={<FiEye />} />
            </Tooltip>
          </NavLink>
        </Box>
        <Box w="40px" h="40px" bg="transparent">
          <Tooltip label='Open Context'>
            <IconButton aria-label="Capabilities" icon={<IoMdOpen />} onClick={() => handleOpenContext(id)} />
          </Tooltip>
        </Box>
      </Stack>    
      <Tr>
        <Td
          minWidth={{ sm: "250px" }}
          pl="0px"
          borderColor={borderColor}
          borderBottom={isLast ? "none" : null}
        >
          <Text
            fontSize="md"
            color={titleColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {sku}
          </Text>
        </Td>

        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <ApsInput 
            type="text"
            placeholder="Ingrese el nombre"
            value= {name}
            keyProperty="name"
          />
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <ApsInput 
              type="text"
              placeholder="Ingrese la discripcion"
              value= {description}
              keyProperty="description"
          />
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Text
            fontSize="md"
            color={titleColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {productQuantity}
          </Text>
          
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Text
            fontSize="md"
            color={titleColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {productQuantity}
          </Text>
          
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Text
            fontSize="md"
            color={titleColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {status}
          </Text>
          
        </Td>
        
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        {price &&(
          <List spacing={3}>
            <ListItem>
              <ListIcon as={FiCheckCircle} color="green.500" />
              Unit: {price.unit}
            </ListItem>
            <ListItem>
              <ListIcon as={FiCheckCircle} color="green.500" />
              Offer: {price.offer}
            </ListItem>
            <ListItem>
              <ListIcon as={FiCheckCircle} color="green.500" />
              Et: {price.et}
            </ListItem>
            {/* You can also use custom icons from react-icons */}
            <ListItem>
              <ListIcon as={FiCheckCircle} color="green.500" />
              Pharmacy: {price.pharmacy}
            </ListItem>
          </List>
        )}
          
        </Td>
        
      </Tr>
    </>
  );
}

export default ProductsRow;
