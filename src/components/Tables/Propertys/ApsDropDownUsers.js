

import {
    Text,
    Input,
    Grid,
    GridItem,
    IconButton,
    Stack,
    Box,
    HStack,
    Flex,
    useColorModeValue,
    useDisclosure,
    FormControl,
    FormLabel,
    Select
  } from "@chakra-ui/react";


  import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
  } from '@chakra-ui/react'

  import  FocusLock from "react-focus-lock"

  import { useToast } from "@chakra-ui/react";

import {React,useEffect,useState,useRef} from "react";

import { useTable } from "contexts/TableContext";

import { FiEdit, FiDelete, FiSettings, FiSave, FiArrowLeft } from "react-icons/fi";

function ApsDropDownUsers(props){
    
  const {
    placeholder,
    elements,
    value,
    keyProperty,
    id,

    //FUNCTIONS
    updateProperty
  } = props

  const toast = useToast()
  
  const { onOpen, onClose, isOpen } = useDisclosure()
    const initialFocusRef = useRef()
    // colors
    const textColor = useColorModeValue("gray.500", "white");
    const titleColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "navy.900");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    const [editRow,setEditRow] = useState(false)
    const [editPopper,setEditPopper] = useState(false)
    const [userName,setUserName] = useState('')

    const [newValue,setNewValue] = useState(value)

    const { editGlobalEnabled, actonRow } = useTable()

    const [editStatus,setEditStatus] = useState(false)

    const [valueInput,setValueInput] = useState('')

    const [isChange,setIsChange] = useState(false)

    useEffect( () =>{
        setValueInput(value)
    },[value])


    const mouseLeaveSlow = () =>{
      if(!isOpen){
        setEditRow(false)
      }
    }

    useEffect( () => {
      for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        const user_id = element.Attributes.find(attribute => attribute.Name === 'sub')?.Value;
        if(valueInput == user_id){
          setUserName(element.Username)
          break;
        }
        
      }
    },[valueInput])


    return (
        <>
            <Flex direction="column"
              onMouseEnter={() => setEditRow(true)}
              onMouseLeave={mouseLeaveSlow}
            >
              <Grid
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(2, 1fr)"
                //gap={3}
              >
                <GridItem rowSpan={1} colSpan={1} bg="transparent" >
                  <Text
                    fontSize="md"
                    color={titleColor}
                    fontWeight="bold"
                    minWidth="100%"
                  >
                      {userName}
                  </Text>
                </GridItem>
                <Stack direction={["column", "row","left"]} spacing="24px">
                  <Box w="40px" h="40px" bg="transparent">
                    {editRow &&(
                      <>
                         <>
                            <Popover
                                isOpen={isOpen}
                                initialFocusRef={initialFocusRef}
                                onOpen={onOpen}
                                onClose={onClose}
                                placement='right'
                                closeOnBlur={false}
                              >
                                <PopoverTrigger>
                                  <IconButton
                                    isLoading={isChange}
                                    aria-label="Edit" 
                                    icon={<FiEdit />} 
                                  />
                                </PopoverTrigger>
                                <PopoverContent p={5}>
                                  <FocusLock returnFocus persistentFocus={false}>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <Flex direction="column" pt={{ base: "120px", md: "15px" }}>
                                      <FormControl id="country">
                                        <FormLabel>Country</FormLabel>
                                        <Select placeholder={placeholder} value={valueInput} onChange={(e) => setNewValue(e.target.value)} >
                                          
                                          {elements.map( (element,index,arr) => {
                                            const user_id = element.Attributes.find(attribute => attribute.Name === 'sub')?.Value;
                                            return (
                                              <option value={user_id}>{element.Username}</option>
                                            )
                                          })}
                                        </Select>
                                      </FormControl>
                                    
                                      <IconButton 
                                        aria-label="Save" 
                                        icon={<FiSave />} 
                                        
                                        onClick={() => {
                                            updateProperty(id,keyProperty,newValue)
                                            setValueInput(newValue)
                                            toast({
                                              title: 'Update Customer Proprety',
                                              description: "We've update Customer for you.",
                                              status: 'success',
                                              duration: 9000,
                                              isClosable: true,
                                            })

                                        }}
                                      />
                                    </Flex>
                                  </FocusLock>
                                </PopoverContent>
                              </Popover>
                          </>
                      </>
                    )}
                  </Box>
                </Stack>

              </Grid>
            </Flex>
        </>
    )
}


export default ApsDropDownUsers