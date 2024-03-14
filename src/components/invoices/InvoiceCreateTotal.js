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

  import DropdownPrice from "components/product/DropdownPrice";
  
  import { v4 as uuidv4 } from 'uuid';
import { FaGalacticSenate } from "react-icons/fa6";


import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, InvoiceStatus, InvoiceItemStatus, UserConfiguration} from "models";
  
// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';

import Moneda from "components/Monedas/Moneda";

  function InvoiceCreateTotal(props) {
    const textColor = useColorModeValue("gray.500", "white");
    const titleColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "navy.900");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    

    const {invoiceDraft} = useUsers()
    const isLast = false
  //   const {
  //     quantity,
  //     bonus,
  //     price,
  //     total,
  //     status,
  // } = props

  const { itemId,total} = props
    
  
    return (
      <>
        <Tr key={`tr_${props.key}`}>
          <Td
            minWidth={{ sm: "250px" }}
            pl="0px"
            borderColor={borderColor}
            borderBottom={isLast ? "none" : null}
          >
           ----
          </Td>
          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
           ----
          </Td>
          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            ----
          </Td>
          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            ----
          </Td>
          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            ----
          </Td>
          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
           ----
          </Td>

          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
           ----
          </Td>

          <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
            <Moneda amount={parseFloat(total).toFixed(2)}/>
          </Td>
          
        </Tr>
      </>
    );
  }
  
  export default InvoiceCreateTotal;
  