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
} from "@chakra-ui/react"


import {React,useEffect,useState,useRef} from "react";

import {Capability} from "models"
import { FaLessThanEqual } from "react-icons/fa";

import { FiEdit, FiDelete, FiSettings, FiSave, FiArrowLeft, FiDollarSign, FiCheckCircle, FiBox} from "react-icons/fi";
import { position } from "stylis";
import ListRoles from "components/dropdowns/ListRoles";

import { useUsers } from "contexts/UsersContext";
import { useTable } from "contexts/TableContext"; 

import ApsInput from "./Propertys/ApsInput";

import {ProductPrice} from "models";


// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';

function ProductsBatchRow(props) {
  /**
   * @property {String} displayname nombre a mostrar en el app
   * @property {String} name Nombre del rol
   * @property {Funcion} handleCapabilities manejador para activar capabilities es handle esta el componente /roles
   */
  const {
    isLast,logo,
    id,index,
    name,sku,dateDue,quantity,status,description,
    
    //functions
    fillInputsEdit,
    deleteRowFunc,
    setListBatchStatus,
    updateBatchStatus,
    setUpdateBatchStatus,
    
  } = props;

  const [price, setPrice] = useState([])

  useEffect( async() =>{
    const prices = await DataStore.query(ProductPrice, 
      c => c.productPriceProductId.eq(id),
      { sort: (s) => s.dateCreated(SortDirection.DESCENDING),limit: 1 }
    );
    const price = prices[0]
    setPrice(price)
    return () => {

    }
  },[])

  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");


  const { 
    editGlobalEnabled,
    settingStatus,setSettingStatus,
    idCurrentRow,
  } = useTable()

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

  return (
    <>
      <Stack direction={["column", "row","left"]} spacing="24px">
        <Box w="40px" h="40px" bg="transparent">
          <IconButton  aria-label="Delete" icon={<FiDelete />} onClick={() => deleteRowFunc(id)} />
        </Box>
        <Box w="40px" h="40px" bg="transparent">
          <IconButton aria-label="Settings" icon={<FiEdit />} onClick={() => handleSettings(id)} />
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
            placeholder="Ingrese el dateDue"
            value= {dateDue}
            keyProperty="dateDue"
          />
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Text
            fontSize="md"
            color={titleColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {quantity}
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

export default ProductsBatchRow;
