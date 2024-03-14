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
  import InvoicesRow from "components/Tables/InvoicesRow";
  import React,{useState,useEffect,useRef} from "react";
  import { tablesProjectData, tablesTableData } from "variables/general";
  import Pagination from "components/Pagination/Paginacion.js"
  
  import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, InvoiceStatus, InvoiceItemStatus, UserConfiguration} from "models";
  



  
  
  // Amplify datastore
  import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
  
  
  
  
  import { useToast } from '@chakra-ui/react'
  
  // ICONS FI
  import { FiArrowLeft,FiPlusSquare, FiDollarSign, FiEdit} from "react-icons/fi";
  
  import { useTable } from "contexts/TableContext";
  import { useAuth } from "contexts/AuthContext";
  import { useUsers } from "contexts/UsersContext";
  import { jsx } from "@emotion/react";

  import { Redirect } from 'react-router-dom';
  

// Importa el SDK de AWS
import AWS from 'aws-sdk';

// Configura las credenciales y la región
/*
 
 */
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

// cognito
import { CognitoIdentityServiceProvider } from 'aws-sdk';
  

  function Info(props){

    const cognito = new CognitoIdentityServiceProvider()

    const {userId} = props

    console.log('userId',userId)

    const [user,setUser] = useState({});


    useEffect( async() =>{
      
      const params = {
        UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
        Filter: `sub = "${userId}"`,
      };
      
      const list = await cognito.listUsers(params).promise();

      const usuario = list.Users[0]
    
      console.log('usuario',usuario)

      setUser(usuario)
         
      
      return () =>{

      }
    },[userId])
    
    return (
      <>
        {Object.entries(user).length !== 0 && (
          <Flex style={{padding: "0 0 10px 0"}}>
            <Card p='16px' >
                <CardBody px='5px'>
                <Stack direction={["column", "row"]} spacing="5px">
                    <Box w="50px" h="40px">
                        <Text fontSize="lg">User:</Text>
                    </Box>
                    <Box w="150px" h="40px">
                        <Text fontSize="lg"> {user.Username}</Text>
                    </Box>
                </Stack>
                    <Flex>
                        
                        
                    </Flex>
                </CardBody>  
            </Card>
          </Flex>
        )}
      </>
      

    )
  }


  export default Info


