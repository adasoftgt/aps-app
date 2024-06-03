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
import React,{useState,useEffect,useRef} from "react";
import { tablesProjectData, tablesTableData } from "variables/general";
import Pagination from "components/Pagination/Paginacion.js"
import Capabilities from "components/Capabilities/Capabilities.js"

import { Product, ProductStatus, ProductPrice, Category, Rol } from "models";

import {USER_OPERATION} from "structures"


// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';




import { useToast } from '@chakra-ui/react'

// ICONS FI
import { FiArrowLeft,FiPlusSquare, FiDollarSign, FiEdit} from "react-icons/fi";

import { useTable } from "contexts/TableContext";
import { useAuth } from "contexts/AuthContext";
import { useUsers } from "contexts/UsersContext";
import { jsx } from "@emotion/react";

import ListBatch from "components/product/ListBatch";



// Alertas
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"

import InvoicePrint from "components/Prints/Invoice";
import InvoicePdf from "components/Prints/InvoicePDF";

import { useParams } from 'react-router-dom';




function Document() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const borderRoleColor = useColorModeValue("white", "transparent");
  const bgRole = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");

  const {id,type} = useParams()

  //alert
  const [alertShow,setAlertShow] = useState(false)
  const [alertText,setAlertText] = useState('')
  const [alertType,setAlertType] = useState('success')

  

  
  const isManageOptions = true//capabilities.some(capacity => caps.includes(capacity));


    
  return (
    
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card p='16px' alignItems="center" >
        {type == 'print' ? (
           <InvoicePrint invoiceId={id} />
        ):(
          <InvoicePdf invoiceId={id} />
        )}
       
      </Card>
    </Flex>

    
  );
}


export default Document;
