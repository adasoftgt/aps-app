import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Text,
} from "@chakra-ui/react"

import { Stack, HStack, VStack, Box } from "@chakra-ui/react"

import { MdFilterAltOff } from "react-icons/md";

import { useUsers } from "contexts/UsersContext";

import { Tooltip } from "@chakra-ui/react";


import React,{ useEffect, useState } from "react";

import Cita from "components/Users/Cita";
import ContextView from "components/Customers/ContextView";

//import { useDisclosure } from "@chakra-ui/react

function DrawerContext({ isOpen, onOpen, onClose }) {
    //const { isOpen, onOpen, onClose } = useDisclosure()
    
    const {
      customerModel,setCustomerModel,
      openContext,closeContext,isOpenContext,getValueOpenContext,CTX
    } = useUsers()

    const [placement, setPlacement] = React.useState("top")
    const [userId,setUserId] = useState(0)
    const [isUser,setIsUser] = useState();

    const [isCustomer,setIsCustomer] = useState(false)
    const [customerId,setCustomerId] = useState('')
    
    
    useEffect( async() =>{
      setIsUser(await isOpenContext(CTX.USER_ID))
      setUserId(await getValueOpenContext(CTX.USER_ID))

      const isOpenContext_aux = await isOpenContext(CTX.CUSTOMER_ID)
      setIsCustomer(isOpenContext_aux)
      const getValueOpenContext_aux = await getValueOpenContext(CTX.CUSTOMER_ID)
      setCustomerId(getValueOpenContext_aux)

      return () => {
        // Código de limpieza
      };

    },[isOpen])

    const closeContextUser = async() =>{
      setIsUser(false)
      await closeContext(CTX.USER_ID)
      
    }

    const closeContextCustomer = async() =>{
      setIsCustomer(false)
      await closeContext(CTX.CUSTOMER_ID)
      setCustomerModel({})
      
    }

    return (
      <>
        <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Viewer Context</DrawerHeader>
            <DrawerBody>
              <h2>Contexts</h2>
              {isUser &&  (
                <HStack spacing="24px">
                  <Box w="40px" h="40px" >
                    <Tooltip label="Close Context">
                      <IconButton icon={<MdFilterAltOff />} onClick={closeContextUser} />
                    </Tooltip>
                  </Box>
                  <Box w="150px" h="40px" >
                    <Text fontSize="xl">User</Text>
                  </Box>
                  <Cita userId={userId}/>
                </HStack>
              )}

              <ContextView id={customerId} isActiveContext={isCustomer} onCloseContext={closeContextCustomer} onClose={onClose}/>
              
              <p>Some contents...</p>
              <p>Some contents...</p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
}

export default DrawerContext