/**
 * @package 
 * Esto se va mostrar en drawer de contextos
 */



import {React, useState,useRef,useEffect} from "react"

import { Box, HStack, Tooltip, Text, IconButton  } from "@chakra-ui/react";

import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import { MdFilterAltOff } from "react-icons/md";
import { CgInternal } from "react-icons/cg";

import { Customer } from "models";
  
// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';

/**
 * Vissualizar los contexto dento de un Drawer chakra UI
 * 
 * @component
 * @param {*} props
 * @property {Object} props.model conjunto de datos extraido de DataStore sobre lo que se quiera visualizar
 * @ignore  {Boolean} props.isActiveContext Verificar si el contexto esta activo
 * @property {Function} props.onCloseContext cerrar el contexto activo en se momento
 * @ignore {Function} props.onClose cerrar elemento visual Drawer
 * @property {String} props.nameCtx nombre a visualizar dentro del Drawer el contexto
 * @property {String} props.dataCtx datos a mostrar del contexto que se va mostrar el Drawer
 * @property {Sting} props.path ruta donde va dirigir a lista elementos del contexto
 * @returns {JSX.Element}
 */
export function ContextView(props){
    const {model, isActiveContext, onCloseContext, onClose, nameCtx, dataCtx,path} = props

    //const [customer,setCustomer] = useState([])
    

    // useEffect( async() =>{
        
    //     const customer = await DataStore.query(Customer, id);
    //     setCustomer(customer ?? [])
    // },[id])

    
    return (
        <>
            {Object.keys(model ?? {}).length != 0 &&  (
                <HStack spacing="24px">
                    <Box w="40px" h="40px" >
                        <Tooltip label="Close Context">
                            <IconButton icon={<MdFilterAltOff />} onClick={onCloseContext} />
                        </Tooltip>
                    </Box>
                    <Box w="150px" h="40px" >
                        <Text fontSize="xl">{nameCtx}</Text>
                    </Box>
                    <Box w="400px" h="40px" >
                        <Text fontSize="xl">{dataCtx}</Text>
                    </Box>
                    <Box w="40px" h="40px" >
                        <Tooltip label="Cambiar de contexto">
                            <NavLink to={path}>
                                <IconButton icon={<CgInternal />} />
                            </NavLink>
                        </Tooltip>
                    </Box>
                </HStack>
            )}
        </>
    )
}




// EJEMPLOS DE OBJECTOS


/**
 * {
    "name": "Carolina Herrador",
    "address": "San Mateo 5",
    "nit": "352865655",
    "phone": "31669110",
    "owner": "Carolina Herrador",
    "seller": "e1bf0ec7-c169-4e35-9bbd-661c97101403",
    "transportation_observations": "todo es cabron",
    "observations": "todo es todo",
    "countryDepartment": "Guatemala",
    "municipality": "Villa Nueva",
    "carrier": "GUATEX",
    "sector": "Z M",
    "id": "b0c9ac30-f50b-41fd-b331-e1ea29047669",
    "createdAt": null,
    "updatedAt": null
}
 */