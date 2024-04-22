

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

import Moneda from "components/Monedas/Moneda";

function ApsInput(props){
    
  const {
    placeholder,
    type,
    value,
    keyProperty,
    id,
    isCurrency = false,

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
                      {isCurrency ?(
                        <Moneda amount={valueInput}/>
                      ):(
                        <>{valueInput}</>
                      )}
                      
                  </Text>
                  {/* {editStatus ? (
                    <Input 
                      type={type}
                      placeholder={placeholder} 
                      value={valueInput}
                      onChange={(e) => setValueInput(e.target.value)}  
                    />
                  ) : (
                    <Text
                      fontSize="md"
                      color={titleColor}
                      fontWeight="bold"
                      minWidth="100%"
                    >
                      {valueInput}
                    </Text>
                  )} */}
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
                                      <Input 
                                        type={type}
                                        placeholder={placeholder} 
                                        value={newValue}
                                        onChange={(e) => setNewValue(e.target.value)}  
                                      />
                                    
                                      <IconButton 
                                        aria-label="Save" 
                                        icon={<FiSave />} 
                                        
                                        onClick={() => {
                                            if(isCurrency){
                                              updateProperty(id,keyProperty,parseFloat(newValue))
                                            }else{
                                              updateProperty(id,keyProperty,newValue)
                                            }
                                            
                                            setValueInput(newValue)
                                            

                                        }}
                                      />
                                    </Flex>
                                  </FocusLock>
                                </PopoverContent>
                              </Popover>
                          </>
                        {/* {editStatus ? (
                          <>
                            <HStack spacing="10px">
                              <Box w="40px" h="40px" bg="transparent">
                                <IconButton 
                                  aria-label="Save" 
                                  icon={<FiSave />} 
                                  onClick={() => actonRow({
                                    key:"displayname",
                                    typeButton:"Save",
                                    id: id, 
                                    newValue: valueInput,
                                    setIsChange: setIsChange,
                                    setEdit: setEditStatus
                                  })}
                                />
                              </Box>
                              <Box w="40px" h="40px" bg="transparent">
                                <IconButton 
                                  aria-label="Edit" 
                                  icon={<FiArrowLeft />} 
                                  onClick={() => actonRow({
                                    keyProperty: keyProperty, 
                                    typeButton:"Return",
                                    setEdit: setEditStatus
                                  })} 
                                />
                              </Box>
                            </HStack>

                          </>
                        ):(
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
                                    onClick={() => actonRow({
                                      key:"displayname",
                                      typeButton:"Edit",
                                      setEdit: setEditStatus
                                    })} 
                                  />
                                </PopoverTrigger>
                                <PopoverContent p={5}>
                                  <FocusLock returnFocus persistentFocus={false}>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    
                                  </FocusLock>
                                </PopoverContent>
                              </Popover>
                          </>


                          
                        )} */}
                      </>
                    )}
                  </Box>
                </Stack>

              </Grid>
            </Flex>
        </>
    )
}


export default ApsInput