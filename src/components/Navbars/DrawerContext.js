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

import { Invoice,Customer } from "models";

import { DataStore } from "@aws-amplify/datastore";

//import { useDisclosure } from "@chakra-ui/react

function DrawerContext({ isOpen, onOpen, onClose }) {
    //const { isOpen, onOpen, onClose } = useDisclosure()
    
    const {
      customerModel,setCustomerModel,
      invoiceModel,setInvoiceModel,
      openContext,closeContext,isOpenContext,getValueOpenContext,CTX
    } = useUsers()

    const [placement, setPlacement] = React.useState("top")
    const [userId,setUserId] = useState(0)
    const [isUser,setIsUser] = useState();

    const [isCustomer,setIsCustomer] = useState(false)
    const [customerId,setCustomerId] = useState('')
    
    const verifyContext = async() =>{
      /**
       * Ver si existe contexto de customer
       */
      if(Object.keys(customerModel).length == 0){
        const isOpen = await isOpenContext(CTX.CUSTOMER_ID)
        //setIsCustomer(isOpenContext_aux)
        if(isOpen){
          const id = await getValueOpenContext(CTX.CUSTOMER_ID)
          const model = await DataStore.query(Customer, id);
          setCustomerModel(model)
        }
      }

      /**
       * Ver si existe contexto de invoice seleccioanda
       */
      if(Object.keys(invoiceModel).length == 0){
        const isOpen = await isOpenContext(CTX.INVOICE_ID)
        //setIsCustomer(isOpenContext_aux)
        if(isOpen){
          const id = await getValueOpenContext(CTX.INVOICE_ID)
          const model = await DataStore.query(Invoice, id);
          setInvoiceModel(model)
        }
      }
    }
    
    
    useEffect( ()=>{
      verifyContext()
      
      return () =>{

      }
    },[customerModel,invoiceModel])
    
    useEffect( async() =>{
      //setIsUser(await isOpenContext(CTX.USER_ID))
      //setUserId(await getValueOpenContext(CTX.USER_ID))
      verifyContext()
      
      return () => {
        // Código de limpieza
      };

    },[isOpen])

    const closeContextUser = async() =>{
      setIsUser(false)
      await closeContext(CTX.USER_ID)
      
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
              <ContextView model={customerModel} onCloseContext={closeContextCustomer} onClose={onClose} nameCtx="Customer" dataCtx={customerModel.name ?? ''} path="/admin/customers"/>
              <ContextView model={invoiceModel} onCloseContext={closeContextInvoice} onClose={onClose} nameCtx="Invoice" dataCtx={invoiceModel.id} path="/admin/invoices"/>
              
              
              <p></p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
}

export default DrawerContext