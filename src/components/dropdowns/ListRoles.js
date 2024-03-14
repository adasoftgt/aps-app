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



/**
 * 
 * @prop {useRef} roles variable no afectada por la rederizacion para que no se consulte de mas la base de datos en la nube 
 * @returns 
 */
const ListRoles = ({rol,user_operation}) => {
    
    const [rolSelect,setRolSelect] = useState(rol)

    /**
     * @property {Array} rolesOptions lista de los nombre de la opciones de roles
     */
    const { rolesOptions } = useAuth()

    /**
     * @property {Fuction} updateAttrUser para actualizar los atributos del usuario
     */
    const { updateAttrUser } = useUsers()
    

    /**
     * Manejador para el cambio de rol
     * @param {*} event Evento del deplegable
     * @property {USER_ATTRIBUTES} user_operation.attributes Objeto de atributos del usuario de cognito
     * @property {USER_OPERATION} user_operation
     */
    useEffect(() => {
        user_operation.attributes.map((attribute, index, arr) => {
            switch(attribute.Name){
                case "profile":
                    user_operation.attributes[index].Value = rolSelect
                    break;
                
            }
        })
        
        updateAttrUser(user_operation)
    }, [rolSelect])
    


    return(
        <>
            <FormControl id="country">
                <Select 
                    placeholder="Select Rol"
                    value={rolSelect}
                    onChange={(e) => setRolSelect(e.target.value) }
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