import React, { useState,useEffect,useRef } from "react";
import { 
    Flex,
    Grid,
    Text,
    Card,
    CardHeader,
    CardBody,
    Switch,
} from "@chakra-ui/react";




/**
 * Componente que carga un switch de capcidad
 * @property {Function} createOrUpdateCap funcion origen en el compoente /roles para agregar capacidad al rol
 * @property {String} rolId identificador de rol
 * @property {String} rolId nombre e identificador de la capacidad
 * @property {String} text Nombre descriptivo de capacidad
 * @returns 
 */
const Switchcap = ({text,rolId,rolCaps,createOrUpdateCap,capValue}) => {
    console.log('Switchcap+rolCaps',rolCaps)
    let existCap = false
    if(rolCaps.length > 0){
        existCap = rolCaps.includes(capValue)
    }
    const [capActive,setCapActive] = useState(existCap)

    /*const [count,setCount] = useState(0)
    
    useEffect(() =>{
        if(count < 20 && capActive == false){
            let existCap = 
            console.log('Switchcap+useEffect',existCap)
            if(existCap){
                console.log('existCap',existCap) 
                setCapActive(true)
            }
            setCount( count + 1 )
        }
    },[count])*/

    const handleCapActive = () => {
        //let existCap = rolCaps.includes(capValue) 
        console.log('capActive',capActive,'existCap',existCap,'rolCaps',rolCaps)
        
        
        if(capActive == false && existCap == false){
            // se crea el capacidad en el rol
            setCapActive(true)
            console.log('primero',capActive);
            createOrUpdateCap(rolId,true,capValue)
        }

        if(capActive == true && existCap == true){
            // se crea el capacidad en el rol
            setCapActive(false)
            console.log('segundo',capActive);
            createOrUpdateCap(rolId,false,capValue)
        }
    }
    
    return(
        <Flex align='center' mb='20px'>
            <Switch colorScheme='blue' me='10px' 
                defaultChecked={capActive} // Vincula el estado al Switch
                onChange={() => handleCapActive()} // Actualiza el estado al cambiar
            />
            <Text
                noOfLines={1}
                fontSize='md'
                color='gray.400'
                fontWeight='400'>
                {text}
            </Text>
      </Flex>        

    )
}

export default Switchcap;