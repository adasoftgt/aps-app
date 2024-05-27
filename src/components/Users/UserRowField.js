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

//Iconos
import { FiEdit, FiDelete, FiSettings, FiSave, FiArrowLeft,FiFile } from "react-icons/fi";
import { IoMdOpen } from "react-icons/io";


import ListRoles from "components/dropdowns/ListRoles";


import { useUsers } from "contexts/UsersContext";




/**
 * Componente que se encarga de mostrar el nombre un una fila de una tabla que contiene los datos de los usuarios
 * @param {Object} props PersonCard propities
 * @param {String} props.id identificador de model DataStore
 * @param {Boolean} props.editGlobalEnabled se activa la edicion global para que miren lo botones de edicion
 * @param {String} props.dataValue hace referencia a data que se cuentra en Base de datos o data recuperada

 * @returns {React.Element}
 */
export const UserNameField = ({id,editGlobalEnabled,dataValue}) =>{
    
    const [edit,setEdit] = useState(false)
    const [isChange,setIsChange] = useState(false)
    const [inputValue,setInputValue] = useState(null)

    const textColor = useColorModeValue("gray.500", "white");
    const titleColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "navy.900");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    
    /**
     * Actualizar una Property de model datastore 
     * @param {*} id 
     * @param {*} key 
     * @param {*} newValue 
     */
    async function updateProperty(id, key, newValue) {
        try{
    
          const original = await DataStore.query(Payment, id);
        
          if (original) {
            const updatedPost = await DataStore.save(
              Payment.copyOf(original, updated => {
                updated[key] = newValue
              })
            );
          }

            toast({
                title: 'Update Payment Proprety',
                description: "We've update Payment for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
    
        }catch(err){
          console.log(err)
        }
    }


    return(
        <Grid
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(2, 1fr)"
            //gap={3}
        >
            <GridItem rowSpan={1} colSpan={1} bg="transparent" >
            {edit ? (
                <Input 
                    type="text"
                    placeholder="Display Name" 
                    value={inputValue || dataValue}
                    onChange={(e) => setInputValue(e.target.value)}  
                />
            ) : (
                <Text
                    fontSize="md"
                    color={titleColor}
                    fontWeight="bold"
                    minWidth="100%"
                >
                    {inputValue || dataValue}
                </Text>
            )}
            </GridItem>
            <Stack direction={["column", "row","left"]} spacing="24px">
            <Box w="40px" h="40px" bg="transparent">
                {editGlobalEnabled &&(
                <>
                    {edit ? (
                    <>
                        <HStack spacing="10px">
                        <Box w="40px" h="40px" bg="transparent">
                            <IconButton 
                            aria-label="Save" 
                            icon={<FiSave />} 
                            onClick={() => updateProperty(id,'displayname')}
                            />
                        </Box>
                        <Box w="40px" h="40px" bg="transparent">
                            <IconButton 
                            aria-label="Edit" 
                            icon={<FiArrowLeft />} 
                            onClick={() => setEdit(!edit)} 
                            />
                        </Box>
                        </HStack>

                    </>
                    ):(
                    <IconButton
                        isLoading={isChange}
                        aria-label="Edit" 
                        icon={<FiEdit />} 
                        onClick={() => setEdit(!edit)} 
                    />
                    )}
                </>
                )}
            </Box>
            </Stack>

        </Grid>
    )
}


/**
 * Componente que se encarga de mostrar el dropdown en una fila de una tabla que contiene los datos de los usuarios
 * @param {Object} props PersonCard propities
 * @param {String} props.id identificador de model DataStore
 * @param {Boolean} props.editGlobalEnabled se activa la edicion global para que miren lo botones de edicion
 * @param {String} props.dataValue hace referencia a data que se cuentra en Base de datos o data recuperada
 * @returns {React.Element}
 */
export const UserRolfield = ({id,editGlobalEnabled,dataValue,user_operation}) =>{
    const { updateAttrUser,addGroupUser, removeGroupUser,getGroup } = useUsers()

    const [edit,setEdit] = useState(false)
    const [isChange,setIsChange] = useState(false)
    const [inputValue,setInputValue] = useState(null)
    const rolSelectRef = useRef(null)

    const textColor = useColorModeValue("gray.500", "white");
    const titleColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "navy.900");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    
    /**
     * Actualizar una Property de model datastore 
     * @param {*} id 
     * @param {*} key nombre del tributo a modificar
     * @param {import("structures").UserOperation} user_operation estructura modificada en componente ListRoles
     */
    async function updateProperty(key,user_operation) {
        
        if(rolSelectRef.current == 'seller'){
            // agregar al grupo al usuario al grupo segun el rol que se selecciono
            addGroupUser(user_operation,'Sellers')
        }
        if(dataValue == 'seller'){
            // remover del grupo al usuario con el  rol previemente configurado
            removeGroupUser(user_operation,'Sellers')
        }
        updateAttrUser(user_operation)
        console.log('be0f81d4-9a78-4ef1-9651-91e8005e8b9c',user_operation)
        setInputValue(rolSelectRef.current)
        setEdit(!edit)
    }


    return(
        <Grid
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(2, 1fr)"
                //gap={3}
              >
                <GridItem rowSpan={1} colSpan={1} bg="transparent" >
                {edit ? (
                  <ListRoles rolCurrent={inputValue || dataValue} user_operation={user_operation} rolSelectRef={rolSelectRef} />
                ):(
                  <Text fontSize="md" color={textColor} fontWeight="bold">
                    {inputValue || dataValue} 
                  </Text>
          )}
                </GridItem>
                <GridItem rowSpan={1} bg="transparent" >
                  {editGlobalEnabled &&(
                    <>  
                      {edit ? (
                        <>
                          <HStack spacing="10px">
                            <Box w="40px" h="40px" bg="transparent">
                              <IconButton 
                                aria-label="Edit" 
                                icon={<FiSave />} 
                                onClick={() => updateProperty('profile',user_operation)} 
                              /> 
                            </Box>
                            <Box w="40px" h="40px" bg="transparent">
                              <IconButton 
                                aria-label="Edit" 
                                icon={<FiArrowLeft />} 
                                onClick={() => setEdit(!edit)} 
                              />
                            </Box>
                          </HStack>
                          
                          
                        </>
                        
                      ):(
                        <IconButton 
                          aria-label="Edit" 
                          icon={<FiEdit />} 
                          onClick={() => setEdit(!edit)} 
                          isLoading={isChange}
                        />
                      )}
                    </>
                  )}
                    
                </GridItem>

              </Grid>
    )
}

