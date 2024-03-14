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



function Users() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const borderRoleColor = useColorModeValue("white", "transparent");
  const bgRole = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");

  //Formulario de creacion de rol
  const [rolName,setRolName] = useState('')
  const [rolDisplayName,setRolDisplayName] = useState('')
  
 
  const [rolId,SetRolId] = useState('') // si rolID esta activo significa que se que tiene que mostrar la lista de capacidades
  const [rolCaps,setRolCaps] = useState([]) // lista de capacidades del rol
  

  
  

  // comprobrar si se esta utilizando:: const [tableUpdate,setTableUpdate] = useState({})

  //alert
  const [alertShow,setAlertShow] = useState(false)
  const [alertText,setAlertText] = useState('')
  const [alertType,setAlertType] = useState('success')

  const [users, setUsers] = useState([]);

  const cognito = new CognitoIdentityServiceProvider()

  // 
  const roles = useRef([])

  const { 
    editRow,
    edit,setEdit,
    index,setIndex, 
    total, setTotal,
    currentPage, setCurrentPage, 
    pageSize, setPageSize,
    paginationTokenArray,setPaginationTokenArray,
    editGlobalEnabled,setEditGlobalEnabled,
    tableRolName,setTableRolName,
    tableRolDisplayName,setTableRolDisplayName,
  } = useTable()

  const {
    capabilities
  } = useAuth()

  
  /**
   * Obtener la lista de usuarios de cognito
   * @param {int} limit limite de paginacion
   * @param {*} paginationToken token obtenido por cognito cuando hay mas datos por paginar
   * @returns 
   */
  const getCognitoUsers = async (limit = 50, paginationToken = null) => {
    const params = {
      UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
      Limit: limit,
      PaginationToken: paginationToken,
    };
  
    try {
      const data = await cognito.listUsers(params).promise();
      const currentPage = data.Users;
  
      // Devuelve la página actual junto con el token de paginación
      return {
        page: currentPage,
        paginationToken: data.PaginationToken,
      };
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
      throw error;
    }
  };

  /**
   * Obtener la lista completa de tokens de paginacion
   * @param {int} limit limite de paginacion
   */
  const getAllPaginationTokens = async (limit = 50) => {
    let allPaginationTokens = [null];
    let paginationToken = null;
  
    do {
      const { paginationToken: nextPageToken } = await getCognitoUsers(limit, paginationToken);
      if (nextPageToken) {
        allPaginationTokens.push(nextPageToken);
      }
      paginationToken = nextPageToken;
    } while (paginationToken);
    
    setPaginationTokenArray(allPaginationTokens)
    return allPaginationTokens;
  };


  useEffect(() => {
    getAllPaginationTokens(pageSize)
  }, []);

  

  /**
   * Obtener la lista de usuarios cuando cambie el useState currentPage
   */
  useEffect( async() => {
    const {page: Users} = await getCognitoUsers(pageSize,paginationTokenArray[currentPage - 1])
    setUsers(Users)
  },[currentPage])

  /**
   * Obtener la lista de usuarios cuando cambie el useState total
   * @property {int} total es el total de elemetos que se van a paginar
   */
  useEffect( async() => {
    const {page: Users} = await getCognitoUsers(pageSize,paginationTokenArray[currentPage - 1])
    setUsers(Users)
  },[total])

  /**
   * Cambiar el useState total, cuando el useState paginationTokenArray cambie se podra saber la cantidad de paginas que tiene la informacion que se
   * intenta recolectar esto mulitplicando por pageSize que es la cantidad de pagina deseadas
   * @var {int} size Cantidad de tokens que tiene la data recolectada por cognito
   */  
  useEffect( async() => {
    const size = paginationTokenArray.length
    setTotal(size * pageSize)
  },[paginationTokenArray])


  

  /**
   * Eliminar una object de DataStore de amplify
   * @param {String} id Identificador de registro de DataStore aws amplify
   */
  const deleteRow = async(id) => {
    const toDelete = await DataStore.query(Rol, id);
    
    if (toDelete) {
      DataStore.delete(toDelete);
      // Se va cambiar total para renderizar de nuevo y cargar objetos restantes
      setTotal(total - 1)
    }
  }

  
  const isManageOptions = true//capabilities.some(capacity => caps.includes(capacity));

  return (
    
    <>
      {isManageOptions ? (
         <>
         {!rolId ? (
          <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
            <Flex style={{padding: "0 0 10px 0"}}>
              <Card p='16px' >
                <CardBody px='5px'>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="email-alerts" mb="0">
                      Necesitas editar
                    </FormLabel>
                    <Switch 
                      id="email-alerts" 
                      isChecked={editGlobalEnabled} // Vincula el estado al Switch
                      onChange={() => setEditGlobalEnabled(!editGlobalEnabled)} // Actualiza el estado al cambiar
                    />
                  </FormControl> 
                </CardBody>
              </Card>
            </Flex>
            <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
              <CardHeader p="6px 0px 22px 0px">
                <Text fontSize="xl" color={textColor} fontWeight="bold">
                  Roles table
                </Text>
              </CardHeader>
              <CardBody>
                <Table variant="simple" color={textColor}>
                  <Thead>
                    <Tr my=".8rem" pl="0px" color="gray.400" >
                      <Th pl="0px" borderColor={borderColor} color="gray.400" >
                        User Name
                      </Th>
                      <Th borderColor={borderColor} color="gray.400" >Rol</Th>
                      <Th borderColor={borderColor} color="gray.400" >Confirmation status</Th>
                      <Th borderColor={borderColor} color="gray.400" >Status</Th>
                      <Th borderColor={borderColor} color="gray.400" >Creado</Th>
                      <Th borderColor={borderColor}></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    
                    {users.map((user, index, arr) => {
                      let profile = 'collaborator'
                      let userId = ''
                      user.Attributes.map((attribute, index, arr) => {
                        switch(attribute.Name){
                          case "profile":
                              profile = attribute.Value
                            break;
                          case "sub":
                            userId = attribute.Value
                            break;
                        }
                      })
  
                      const user_operation = { ...USER_OPERATION };
  
                      user_operation.attributes = user.Attributes
                      user_operation.username = user.Username
                      user_operation.UserStatus = user.UserStatus
                      user_operation.Enabled = user.Enabled
                      user_operation.userId = userId
                      /*const user_operation = {
                        // atributos del usuario
                        attributes:user.Attributes,
                        
                        // functions
                        updateRolUser:updateRolUser,
                      }*/
                      return (
                        <UsersRow
                          displayname={user.Username}
                          logo={''}
                          email={''}
                          subdomain={''}
                          name={profile}
                          profile={profile}
                          status={user.type}
                          date={user.UserCreateDate.toString()}
                          isLast={false}
                          key={index}
                          index={index}
                          id={user.id}
                          deleteRowFunc={deleteRow}
                          setTableRolDisplayName={setTableRolDisplayName}
                          setTableRolName = {setTableRolName}
                          //edit = {typeof edit[index] !== "undefined" ? edit[index] == true ? true : false : false}
                          edit = {edit[index]}
                          editRow={editRow}
                          editGlobalEnabled={editGlobalEnabled}
                          roles={roles}
                          user_operation={user_operation}
                          user_confirmed={(user.UserStatus.trim() == "CONFIRMED") ? true : false}
                        />
                      );
                    })}
                  </Tbody>
                </Table>
                <Pagination
                  total={total}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  onPageChange={setCurrentPage}
                />
              </CardBody>
            </Card>
            
          </Flex>
          ) : (
          <>
            <Flex  pt={{ base: "120px", md: "75px" }}>
              <IconButton
                colorScheme="teal"
                aria-label="Call Fred"
                size="lg"
                icon={<FiArrowLeft />}
                onClick={() => SetRolId('')}
              />
            </Flex>
            <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
              <Capabilities 
                rolId={rolId} 
                rolCaps={rolCaps} 
                createOrUpdateCap={createOrUpdateCap}
                rolDisplayName={rolDisplayName}
              />
            </Flex>
          </>
          )}
        </>
      ) : (
        <>
          <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
            No tiene acceso
          </Flex>
        </>
      )}
     
      
      
    </>


    
  );
}

/*const Users = () => {
  return (
    <TableProvider>
      <UsersComponent />
    </TableProvider>
  );
};*/


export default Users;
