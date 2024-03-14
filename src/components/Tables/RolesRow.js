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
  FormControl,
  FormLabel,
  FormHelperText,
  Center,
  Stack,
  Box,
  HStack,
} from "@chakra-ui/react";
import {React,useState} from "react";

import {Capability} from "models"
import { FaLessThanEqual } from "react-icons/fa";

import { FiEdit, FiDelete, FiSettings, FiSave, FiArrowLeft } from "react-icons/fi";
import { position } from "stylis";

function RolesRow(props) {
  /**
   * @property {String} displayname nombre a mostrar en el app
   * @property {String} name Nombre del rol
   * @property {Funcion} handleCapabilities manejador para activar capabilities es handle esta el componente /roles
   */
  const { logo, displayname, email, subdomain, name, status, date, isLast, deleteRowFunc, 
    id, index, edit, editRow, setTableRolDisplayName, setTableRolName, editGlobalEnabled,handleCapabilities
  } = props;
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");


  // new valores
  const [newName,setNewName] =  useState('')
  const [newDisplayName,setNewDisplayName] =  useState('')

   // loading
   const [isChangeName,setIsChangeName] = useState(false)
   const [isChangeDisplayName,setIsChangeDisplayName] = useState(false)


   const [editDisplayname,setEditDisplayname] = useState(false)
   const [editName,setEditName] = useState(false)

  /*if(typeof edit !== "undefined"){
    
    switch(edit.key){
      case "displayname":
        editDisplayname = edit.status
        break;
      case "name":
        editName = edit.status
        break;
    }
  }*/

  return (
    <>
      <Stack direction={["column", "row","left"]} spacing="24px">
        <Box w="40px" h="40px" bg="transparent">
          <IconButton  aria-label="Delete" icon={<FiDelete />} onClick={() => deleteRowFunc(id)} />
        </Box>
        <Box w="40px" h="40px" bg="transparent">
          <IconButton aria-label="Capabilities" icon={<FiSettings />} onClick={() => handleCapabilities(id,displayname)} />
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
            <Grid
              templateRows="repeat(1, 1fr)"
              templateColumns="repeat(2, 1fr)"
              //gap={3}
            >
              <GridItem rowSpan={1} colSpan={1} bg="transparent" >
                {editDisplayname ? (
                  <Input 
                    type="text"
                    placeholder="Display Name" 
                    value={newDisplayName || displayname}
                    onChange={(e) => setNewDisplayName(e.target.value)}  
                  />
                ) : (
                  <Text
                    fontSize="md"
                    color={titleColor}
                    fontWeight="bold"
                    minWidth="100%"
                  >
                    {newDisplayName || displayname}
                  </Text>
                )}
              </GridItem>
              <Stack direction={["column", "row","left"]} spacing="24px">
                <Box w="40px" h="40px" bg="transparent">
                  {editGlobalEnabled &&(
                    <>
                      {editDisplayname ? (
                        <>
                          <HStack spacing="10px">
                            <Box w="40px" h="40px" bg="transparent">
                              <IconButton 
                                aria-label="Save" 
                                icon={<FiSave />} 
                                onClick={() => editRow(index,{
                                  key:"displayname",
                                  typeButton:"Save",
                                  id: id, 
                                  newValue: newDisplayName,
                                  setIsChange: setIsChangeDisplayName,
                                  setEdit: setEditDisplayname
                                })}
                              />
                            </Box>
                            <Box w="40px" h="40px" bg="transparent">
                              <IconButton 
                                aria-label="Edit" 
                                icon={<FiArrowLeft />} 
                                onClick={() => editRow(index,{
                                  key:"name", 
                                  typeButton:"Return",
                                  setEdit: setEditDisplayname
                                })} 
                              />
                            </Box>
                          </HStack>

                        </>
                      ):(
                        <IconButton
                          isLoading={isChangeDisplayName}
                          aria-label="Edit" 
                          icon={<FiEdit />} 
                          onClick={() => editRow(index,{
                            key:"displayname",
                            typeButton:"Edit",
                            setEdit: setEditDisplayname
                          })} 
                        />
                      )}
                    </>
                  )}
                </Box>
              </Stack>

            </Grid>
              
              
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {email}
              </Text>
            </Flex>
          </Flex>
        </Td>

        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Flex direction="column">
            <Grid
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(2, 1fr)"
                //gap={3}
              >
                <GridItem rowSpan={1} colSpan={1} bg="transparent" >
                {editName ? (
                  <Input 
                    type="text"
                    placeholder="Name" 
                    value={newName || name} 
                    onChange={(e) => setNewName(e.target.value)} 
                  />
                ):(
                  <Text fontSize="md" color={textColor} fontWeight="bold">
                    {newName || name} 
                  </Text>
          )}
                </GridItem>
                <GridItem rowSpan={1} bg="transparent" >
                  {editGlobalEnabled &&(
                    <>  
                      {editName ? (
                        <>
                          <HStack spacing="10px">
                            <Box w="40px" h="40px" bg="transparent">
                              <IconButton 
                                aria-label="Edit" 
                                icon={<FiSave />} 
                                onClick={() => editRow(index,{
                                  key:"name", 
                                  typeButton:"Save",
                                  id: id, 
                                  newValue: newName,
                                  setIsChange: setIsChangeName,
                                  setEdit: setEditName
                                })} 
                              /> 
                            </Box>
                            <Box w="40px" h="40px" bg="transparent">
                              <IconButton 
                                aria-label="Edit" 
                                icon={<FiArrowLeft />} 
                                onClick={() => editRow(index,{
                                  key:"name", 
                                  typeButton:"Return",
                                  setEdit: setEditName
                                })} 
                              />
                            </Box>
                          </HStack>
                          
                          
                        </>
                        
                      ):(
                        <IconButton 
                          aria-label="Edit" 
                          icon={<FiEdit />} 
                          onClick={() => editRow(index,{
                            key:"name",
                            typeButton:"Edit",
                            setEdit: setEditName
                          })} 
                          isLoading={isChangeName}
                        />
                      )}
                    </>
                  )}
                    
                </GridItem>

              </Grid>
          
          
          
            
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {subdomain}
            </Text>
          </Flex>
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          
          <Badge
            bg={status === "Online" ? "green.400" : bgStatus}
            color={status === "Online" ? "white" : "white"}
            fontSize="16px"
            p="3px 10px"
            borderRadius="8px"
          >
            {status}
          </Badge>
          
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

export default RolesRow;
