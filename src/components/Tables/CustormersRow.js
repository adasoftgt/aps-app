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
  useDisclosure,
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

import { FiEdit, FiDelete, FiSettings, FiSave, FiArrowLeft, FiDollarSign, FiCheckCircle, FiBox, FiLayers,FiExternalLink } from "react-icons/fi";
import { position } from "stylis";
import ListRoles from "components/dropdowns/ListRoles";

import { useUsers } from "contexts/UsersContext";
import { useTable } from "contexts/TableContext"; 

import ApsInput from "./Propertys/ApsInput";
import ApsDropDown from "./Propertys/ApsDropDown";
import ApsDropDownUsers from "./Propertys/ApsDropDownUsers";

import {ProductPrice,Batch,BatchStatus} from "models";

import configAsp from "config/config";

import { useToast } from "@chakra-ui/react";

import ModalDelete from "./Modals/ModalDelete";



// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { Customer } from "models";

function CustormersRow(props) {
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  /**
   * @property {String} displayname nombre a mostrar en el app
   * @property {String} name Nombre del rol
   * @property {Funcion} handleCapabilities manejador para activar capabilities es handle esta el componente /roles
   */
  const {
    isLast,logo,
    id,index,
    name,address,nit,phone,owner,seller,// model
    transportation_observations,observations,countryDepartment,municipality,carrier,sector,
    
    
    //FUNCTIONS
    fillInputsEdit,
    deleteRow,
    setListBatchStatus,
    updateProperty
    
  } = props;

  const toast = useToast()

  const [price, setPrice] = useState([])
  const [productBatches,setProductBatches] = useState([])
  //const [productQuantity,setProductQuantity] = useState(0)
  
  const { 
    editGlobalEnabled,
    settingStatus,setSettingStatus,
    idCurrentRow,
  } = useTable()

  const {
    sellers,

    //CONTEXTOS
    customerModel,setCustomerModel,
    applyChanges,setApplyChanges,
    openContext,CTX
  } = useUsers()

  console.log('sellers',sellers)

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
    await openContext(CTX.CUSTOMER_ID,id)
    const customer = await DataStore.query(Customer,id)
    setCustomerModel(customer)
  }

  return (
    <>
      
      <Stack direction={["column", "row","left"]} spacing="24px">
        <Box w="40px" h="40px" bg="transparent">
          <ModalDelete userName={name} deleteRow={deleteRow} id={id} nameModulo="Customer" />
        </Box>
        <Box w="40px" h="40px" bg="transparent">
          <Tooltip label='Agregar como Contexto'>
            <IconButton aria-label="Settings" icon={<FiExternalLink  />} onClick={() =>{
              handleOpenContext(id)
              toast({
                title: 'Open Context customer ',
                description: "We've Open Context for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            } }/>
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
            {name}
          </Text>
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <ApsInput
              updateProperty={updateProperty}
              id={id} 
              type="text"
              placeholder="Ingrese la direccion"
              value= {address}
              keyProperty="address"
          />
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <ApsInput
              updateProperty={updateProperty}
              id={id} 
              type="text"
              placeholder="Ingrese la nit"
              value= {nit}
              keyProperty="nit"
          />
          
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <ApsInput
              updateProperty={updateProperty}
              id={id} 
              type="text"
              placeholder="Ingrese la phone"
              value= {phone}
              keyProperty="phone"
          />
          
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <ApsInput
              updateProperty={updateProperty}
              id={id} 
              type="text"
              placeholder="Ingrese la owner"
              value= {owner}
              keyProperty="owner"
          />
          
        </Td>
        
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <ApsDropDownUsers
              updateProperty={updateProperty}
              id={id} 
              elements={sellers}
              placeholder="Ingrese la seller"
              value= {seller}
              keyProperty="seller"
          />
          
        </Td>
      
        
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <ApsInput
              updateProperty={updateProperty}
              id={id} 
              type="text"
              placeholder="Ingrese la observacion del transporte"
              value= {transportation_observations}
              keyProperty="transportation_observations"
          />
          
        </Td>
        
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <ApsInput
              updateProperty={updateProperty}
              id={id} 
              type="text"
              placeholder="Ingrese la observaciones"
              value= {observations}
              keyProperty="observations"
          />
          
        </Td>

        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <ApsDropDown
              updateProperty={updateProperty}
              id={id} 
              elements={Object.keys(configAsp.departamentos)}
              placeholder="Seleccione el departamento"
              value= {countryDepartment}
              keyProperty="countryDepartment"
          />
          
        </Td>
        
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <ApsDropDown
              updateProperty={updateProperty}
              id={id} 
              elements={configAsp.departamentos[countryDepartment]}
              placeholder="Ingrese el municipio"
              value= {municipality}
              keyProperty="municipality"
          />
        </Td>

        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <ApsDropDown
              updateProperty={updateProperty}
              id={id} 
              elements={configAsp.carriers}
              placeholder="Ingrese el transporte"
              value= {carrier}
              keyProperty="carrier"
          />
        </Td>

        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <ApsDropDown
              updateProperty={updateProperty}
              id={id} 
              elements={configAsp.sectors}
              placeholder="Ingrese el sector"
              value= {sector}
              keyProperty="sector"
          />
        </Td>

        
        
      </Tr>
    </>
  );
}

export default CustormersRow;
