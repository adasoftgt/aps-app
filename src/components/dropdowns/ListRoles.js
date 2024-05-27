import React,{useState,useEffect,useRef,useMemo} from "react";

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Select
} from "@chakra-ui/react"

// modelos
import { Rol } from "models";

// Amplify datastore
import { DataStore, Predicates } from '@aws-amplify/datastore';

import { useAuth } from "contexts/AuthContext";
import { useUsers } from "contexts/UsersContext";

import { USER_ATTRIBUTES } from "structures";

import { v4 as uuidv4 } from 'uuid';


/**
 * Crear una dropDown de roles
 * @param {Object} props
 * @param {String} props.rolCurrent Cadena que contiene el nombre rol que se tiene actualmete
 * @param  {import("structures").UserOperation} props.user_operation estructura de datos de usuario cognito
 * @param {String} rolSelectRef rerencia del rol seleccionado
 * @returns {React.ReactElement}
 */
const ListRoles = ({rolCurrent,user_operation,rolSelectRef}) => {

    const [rolSelect,setRolSelect] = useState(null)

    /**
     * @type {Array} rolesOptions lista de los nombre de la opciones de roles
     */
    const { rolesOptions } = useAuth()
    
    useEffect(() => {
        // Guardar referencia de rol seleccionado
        rolSelectRef.current = rolSelect
        
        // Modificar user_operation de cognito
        user_operation.attributes.map((attribute, index, arr) => {
            switch(attribute.Name){
                case "profile":
                    user_operation.attributes[index].Value = rolSelect
                    break;
                
            }
        })

        
        
    }, [rolSelect])
    


    return(
        <>
            <FormControl id="country">
                <Select 
                    placeholder="Select Rol"
                    value={rolSelect || rolCurrent}
                    onChange={(e) => setRolSelect(e.target.value) }
                    key={uuidv4()}
                >
                    {rolesOptions.map( (option) => {

                        return(
                            <option>{option}</option>
                        )
                    })}
                    
                </Select>
            </FormControl>
        </>
    )
}

export default ListRoles