

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

import {React,useEffect,useState,useRef, isValidElement } from "react";

import { useTable } from "contexts/TableContext";

import { FiEdit, FiDelete, FiSettings, FiSave, FiArrowLeft } from "react-icons/fi";

import { v4 as uuidv4 } from 'uuid';
function ApsDropDown(props){
    
  const {
    placeholder,
    elements,
    value,
    keyProperty,
    id,
    CustomText=false,

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

    const [newValue,setNewValue] = useState('')

    const { editGlobalEnabled, actonRow } = useTable()

    const [editStatus,setEditStatus] = useState(false)

    const [valueInput,setValueInput] = useState('')

    const [isChange,setIsChange] = useState(false)

    // useEffect( () =>{
    //     setValueInput(value)
    // },[value])

    const handleChange = (value) =>{
      setNewValue(value)
    }

    const mouseLeaveSlow = () =>{
      if(!isOpen){
        setEditRow(false)
      }
    }

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
                      {!CustomText ? valueInput || value : <CustomText value={valueInput || value}/>}
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
                                      <FormControl id="country" key={uuidv4()}>
                                        <FormLabel>{placeholder}</FormLabel>
                                        <Select key={uuidv4()} placeholder={placeholder} value={newValue || value} onChange={(e) => handleChange(e.target.value)} >
                                          {!isValidElement(elements) 
                                            ?
                                                elements.map( (element,index,arr) => {
                                              
                                                  return (
                                                    <option value={element}>{element}</option>
                                                  )
                                                })
                                            :elements
                                          }
                                          
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
                                              duration: 1000,
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


export default ApsDropDown