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
} from "@chakra-ui/react";
import {React,useEffect,useState,useRef} from "react";

import {Capability,UserConfiguration} from "models"
import { FaLessThanEqual } from "react-icons/fa";

import { FiEdit, FiDelete, FiSettings, FiSave, FiArrowLeft,FiFile } from "react-icons/fi";
import { IoMdOpen } from "react-icons/io";

import { position } from "stylis";
import ListRoles from "components/dropdowns/ListRoles";

import { useUsers } from "contexts/UsersContext"; 

import { Redirect } from 'react-router-dom';

import { useToast } from "@chakra-ui/react";

import { UserNameField, UserRolfield  } from "components/Users/UserRowField";

function UsersRow(props) {
  /**
   * @property {String} displayname nombre a mostrar en el app
   * @property {String} name Nombre del rol
   * @property {Funcion} handleCapabilities manejador para activar capabilities es handle esta el componente /roles
   */
  const { logo, displayname, email, subdomain, name, profile, status, date, isLast, deleteRowFunc, 
    id, index, edit, editRow, setTableRolDisplayName, setTableRolName, editGlobalEnabled,handleCapabilities,
    user_operation,user_confirmed
  } = props;
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const toast = useToast()

  // new valores
  const [newName,setNewName] =  useState('')
  const [newDisplayName,setNewDisplayName] =  useState('')

   // loading
   const [isChangeName,setIsChangeName] = useState(false)
   const [isChangeDisplayName,setIsChangeDisplayName] = useState(false)


  const [editDisplayname,setEditDisplayname] = useState(false)
  const [editName,setEditName] = useState(false)

  const [createInvoiceStatus,setCreateInvoiceStatus] = useState(false)
  
  /**
   * @property {Function} confirmUser confirmar usuario de cognito sin codigo de confirmacion
   * @property {Function} disableUser inhabilitar usuario de cognito sin codigo de confirmacion
   */
  const { confirmUser,disableUser, enableUser, userOperationSelected,setUserOperationSelected, invoiceDraft, openContext,CTX} = useUsers()


  
  /**
   * Bloque de configuracion para confirmacion de usuario
   * @property {useState} isConfirmed Estado para switch de confirmacion
   * @property {Funcion} handleConfirmUser Manejador del evento del switch para confirmar usuario
   */
  const [isConfirmed,setIsConfirmed] = useState(false)
  
  const previousUser_confirmed = useRef(false);

  const handleConfirmUser = async(_user_operation,switch_checked) => {
    setIsConfirmed(switch_checked);
    confirmUser(_user_operation);
  }
  
  useEffect(() => {
    if (previousUser_confirmed.current !== user_confirmed) {
      setIsConfirmed(user_confirmed);
      previousUser_confirmed.current = user_confirmed;
    }
  }, [user_operation]);

  /**
   * Bloque de configuracion para enbled o disabled user 
   */

  const [isStatus,setIsStatus] = useState(false)
  
  const previousUser_status = useRef(false);

  const handleStatusUser = async(_user_operation,switch_checked) => {
    setIsStatus(switch_checked);
    if(switch_checked){
      enableUser(_user_operation)
    }else{
      disableUser(_user_operation)
    }
  }
  
  useEffect(() => {
    if (previousUser_status.current !== user_operation.Enabled) {
      setIsStatus(user_operation.Enabled);
      previousUser_status.current = user_operation.Enabled;
    }
  }, [user_operation]);

  const handleOpenContextCustomer = (user_operation) =>{
    //setCreateInvoiceStatus(true)
    //setUserOperationSelected(user_operation.userId)
    openContext(CTX.USER_ID,user_operation.userId)
    toast({
      title: 'Open context Customer',
      description: "We've open the Context customer Draft for you.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  } 

  const handleCreateInvoice = (user_operation) =>{
    setCreateInvoiceStatus(true)
    setUserOperationSelected(user_operation.userId)
  }
  

  return (
    <>
      {createInvoiceStatus &&(
        <Redirect to={{
            pathname: '/admin/invoice_create',
        }} /> 
      )}
      
      <Stack direction={["column", "row","left"]} spacing="24px">
        <Box w="40px" h="40px" bg="transparent">
          <IconButton  aria-label="Delete" icon={<FiDelete />} onClick={() => deleteRowFunc(id)} />
        </Box>
        <Box w="40px" h="40px" bg="transparent">
          <IconButton aria-label="Capabilities" icon={<FiSettings />} onClick={() => handleCapabilities(id,displayname)} />
        </Box>
        
        <Box w="40px" h="40px" bg="transparent">
          <Tooltip label='Open Customer Context'>
            <IconButton aria-label="Capabilities" icon={<IoMdOpen />} onClick={() => handleOpenContextCustomer(user_operation)} />
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
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Avatar src={logo} w="50px" borderRadius="12px" me="18px" />
            <Flex direction="column">
              <UserNameField id={id} editGlobalEnabled={editGlobalEnabled} dataValue={displayname}  />
              
              
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {email}
              </Text>
            </Flex>
          </Flex>
        </Td>

        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Flex direction="column">
            <UserRolfield id={id} editGlobalEnabled={editGlobalEnabled} dataValue={name} user_operation={user_operation}  />
          
          
            
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {subdomain}
            </Text>
          </Flex>
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          
          <FormControl display="flex" alignItems="center">
            <Switch
              id="dark-mode-switch"
              isChecked={isConfirmed}
              onChange={(event) => {
                //setIsConfirmed(event.target.checked);
                handleConfirmUser(user_operation,event.target.checked);
              }}
            />
          </FormControl> 
          
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          
          <FormControl display="flex" alignItems="center">
            <Switch
              id="dark-mode-switch"
              isChecked={isStatus}
              onChange={(event) => {
                //setIsConfirmed(event.target.checked);
                handleStatusUser (user_operation,event.target.checked);
              }}
            />
          </FormControl> 
          
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {date}
          </Text>
        </Td>
        
      </Tr>
    </>
  );
}

export default UsersRow;
