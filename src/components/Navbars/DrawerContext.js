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
import {ContextView} from "components/Customers/ContextView";

import { Invoice,Customer } from "models";

import { DataStore } from "@aws-amplify/datastore";

import { useApsUserContext } from "contexts/ApsUserContext";

//import { useDisclosure } from "@chakra-ui/react

function DrawerContext({ isOpen, onOpen, onClose }) {
    //const { isOpen, onOpen, onClose } = useDisclosure()
    
    const {
      customerModel,setCustomerModel,
      invoiceModel,setInvoiceModel,
      verifyContext,
      applyChanges,setApplyChanges,
      openContext,closeContext,isOpenContext,getValueOpenContext,CTX
    } = useUsers()

    /**
     * Contexto de usuario cargando el contexto operativo
     * @type {import("structures").UserOperation}
     */
    const { userOperation, apsUserCtxUtils } = useApsUserContext()

  
    const [placement, setPlacement] = React.useState("top")
    const [userId,setUserId] = useState(0)
    const [isUser,setIsUser] = useState();

    const [isCustomer,setIsCustomer] = useState(false)
    const [customerId,setCustomerId] = useState('')
    
       
    
    useEffect( async()=>{
      await verifyContext()
      setApplyChanges(!applyChanges)
      
      return () =>{

      }
    },[customerModel,invoiceModel])
    
    useEffect( async() =>{
      //setIsUser(await isOpenContext(CTX.USER_ID))
      //setUserId(await getValueOpenContext(CTX.USER_ID))
      await verifyContext()
      setApplyChanges(!applyChanges)
      
      return () => {
        // Código de limpieza
      };

    },[isOpen])

    const closeContextUser = async() =>{
      //setIsUser(false)
      //await closeContext(CTX.USER_ID)
      await apsUserCtxUtils.close()
      
    }

    const closeContextCustomer = async() =>{
      await closeContext(CTX.CUSTOMER_ID)
      setCustomerModel({})
    }

    const closeContextInvoice = async() =>{
      await closeContext(CTX.INVOICE_ID)
      setInvoiceModel({})
    }

    


    return (
      <>
        <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Viewer Context</DrawerHeader>
            <DrawerBody>
              <h2>Contexts</h2>
              <ContextView model={customerModel} onCloseContext={closeContextCustomer} onClose={onClose} nameCtx="Customer" dataCtx={customerModel?.name ?? ''} path="/admin/customers"/>
              <ContextView model={invoiceModel} onCloseContext={closeContextInvoice} onClose={onClose} nameCtx="Invoice" dataCtx={invoiceModel.id} path="/admin/invoices"/>
              <ContextView model={userOperation} onCloseContext={closeContextUser} onClose={onClose} nameCtx="User" dataCtx={`${userOperation.username} / ${userOperation.profile}`} path="/admin/users"/>
              
              
              <p></p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
}

export default DrawerContext