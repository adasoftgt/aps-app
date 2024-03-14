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
  
    Stack, HStack, VStack
  } from "@chakra-ui/react";
  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
  import TablesProjectRow from "components/Tables/TablesProjectRow";
  import UsersRow from "components/Tables/UsersRow";
  import React,{useState,useEffect,useRef} from "react";
  import { tablesProjectData, tablesTableData } from "variables/general";
  import Pagination from "components/Pagination/Paginacion.js"
  import Capabilities from "components/Capabilities/Capabilities.js"
  
  import { Rol } from "models";
  
  import {USER_OPERATION} from "structures"
  // Amplify auth
  import {getCurrentUser } from 'aws-amplify/auth';
  
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
  
  
  
  // Amplify datastore
  import { DataStore, Predicates } from '@aws-amplify/datastore';
  
  
  import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from "@chakra-ui/react"
  
  import { FiArrowLeft } from "react-icons/fi";
  
  import { useTable } from "contexts/TableContext";
  import { useAuth } from "contexts/AuthContext";
  
  
  
  function Forbidden() {
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const borderRoleColor = useColorModeValue("white", "transparent");
    const bgRole = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
  
    
    return (
      
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
            <div style={{padding: "0 0 10px 0"}}>
                <Card p='16px' >
                    <CardBody px='5px'>
                        <Text fontSize="50px" color="tomato">
                            Forbidden
                        </Text>
                    </CardBody>
                </Card>
            </div>
        </Flex>

      
    );
  }
  
  
  export default Forbidden;
  