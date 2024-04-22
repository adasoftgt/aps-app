// Chakra Imports
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex, Link, Spacer,
  Switch,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { HSeparator } from "components/Separator/Separator";
import React, { useEffect, useState, useRef } from "react";
import GitHubButton from "react-github-btn";
import { FaFacebook, FaTwitter } from "react-icons/fa";

import { useUsers } from "contexts/UsersContext";

import { Customer,Configuration } from "models";
  
// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import CustormersRow from "components/Tables/CustormersRow";


export default function Configurator(props) {
  const {
    sidebarVariant,
    setSidebarVariant,
    secondary,
    isOpen,
    onClose,
    fixed,
    ...rest
  } = props;

  const {
    customerAi,setCustomerAi,
    getValueConfiguration,
  } = useUsers()

  const [switched, setSwitched] = useState(props.isChecked);
  const [changeSubcription,setChangeSubcription] = useState(false)
  const customerAiAplicadoRef = useRef(false)
  

  const { colorMode, toggleColorMode } = useColorMode();

  let bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "white"
  );
  let colorButton = useColorModeValue("white", "gray.700");
  const secondaryButtonBg = useColorModeValue("white", "transparent");
  const secondaryButtonBorder = useColorModeValue("gray.700", "white");
  const secondaryButtonColor = useColorModeValue("gray.700", "white");
  const bgDrawer = useColorModeValue("white", "navy.800");
  const settingsRef = React.useRef();


  /**
   * Cargar datos de configuracion de auto-incrementable de customer
   */
  useEffect( async()=>{
    // try{
    //   const customerAiValue = await getValueConfiguration('customerAi')
    //   setCustomerAi(customerAiValue)
    // }catch(err){
    //   console.log('4cc564c9-4c5e-4ef8-971c-7c7188393c59',err)
    // }
    // return () =>{

    // }
    const subscription = DataStore.observeQuery(
      Configuration, 
      //c => c.id.eq('ff35fde6-7616-45f2-967f-8885280a9a4a')
      c => c.name.eq('customerAi')
    ).subscribe(snapshot => {
      const { items, isSynced } = snapshot;
      console.log('7b0c916c-37a4-4a67-b9ff-a5f9c1ed23ae',items,isSynced,new Date())
      if(items.length != 0){
        if(customerAiAplicadoRef.current == false){
          console.log('102d88b1-b985-4720-8cbc-bfe1fdcdeac1',false,new Date())
          setCustomerAi(items[0].value)
        }
      }
      
    })
    
    

    return () =>{
      console.log('834a44b8-bc54-4088-85e7-7766861b7929')
      subscription.unsubscribe();
    }

  },[changeSubcription])
  

  const handleAutoIncremental = async() =>{
    customerAiAplicadoRef.current = true
    await DataStore.stop();
    await DataStore.start();
    setChangeSubcription(!changeSubcription)
    const customerAiConfiguration = await DataStore.query(Configuration, 
      c => c.and( c => [
        c.name.eq('customerAi')
      ])
    );

    if(customerAiConfiguration.length == 0){
      await DataStore.save(
        new Configuration({
          name: 'customerAi',
          value: customerAi
        })
      );
    }

    console.log('267bab4a-c09b-4c5c-8f80-c83a72885694',customerAiConfiguration,new Date())
  
      
    
      try{
        const customerAiConfigurationAux = customerAiConfiguration[0]
        await DataStore.save(
          Configuration.copyOf(customerAiConfigurationAux, updated => {
              updated.value = customerAi
          })
        );
      }catch(err){
        console.log('b423200e-daac-4f3a-9428-044a3acd6c01',err)
      }
    console.log('regreso a falso',new Date())
    customerAiAplicadoRef.current = false
    //setCustomerAi(value)
  }

  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        onClose={props.onClose}
        placement={document.documentElement.dir === "rtl" ? "left" : "right"}
        finalFocusRef={settingsRef}
        blockScrollOnMount={false}
      >
        <DrawerContent bg={bgDrawer}>
          <DrawerHeader pt="24px" px="24px">
            <DrawerCloseButton />
            <Text fontSize="xl" fontWeight="bold" mt="16px">
              Aps Farma Configurator
            </Text>
            <Text fontSize="md" mb="16px">
              See your dashboard options.
            </Text>
            <HSeparator />
          </DrawerHeader>
          <DrawerBody w="340px" ps="24px" pe="40px">
            <Flex flexDirection="column">
              <Flex justifyContent="space-between " mb="16px">
                <Text fontSize="md" fontWeight="600" mb="4px">
                  Navbar Fixed
                </Text>
                <Switch
                  colorScheme="blue"
                  isChecked={switched}
                  onChange={() => {
                    if (switched === true) {
                      props.onSwitch(false);
                      setSwitched(false);
                    } else {
                      props.onSwitch(true);
                      setSwitched(true);
                    }
                  }}
                />
              </Flex>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                mb="24px"
              >
                <Text fontSize="md" fontWeight="600" mb="4px">
                  Dark/Light
                </Text>
                <Button
                  onClick={toggleColorMode}
                  color={colorMode === "light" ? "Dark" : "Light"}
                >
                  Toggle {colorMode === "light" ? "Dark" : "Light"}
                </Button>
              </Flex>

              <HSeparator />
              {/* <Box mt="24px">
                <Box>
                  <Link
                    href="https://www.creative-tim.com/product/argon-dashboard-chakra?ref=creativetim-pud"
                    w="100%"
                    mb="16px"
                  >
                    <Button
                      w="100%"
                      mb="16px"
                      bg={bgButton}
                      color={colorButton}
                      fontSize="xs"
                      variant="no-effects"
                      px="30px"
                    >
                      Free Download
                    </Button>
                  </Link>
                  <Link
                    href="https://demos.creative-tim.com/docs-argon-dashboard-chakra/?ref=creativetim-pud"
                    w="100%"
                  >
                    <Button
                      w="100%"
                      bg={secondaryButtonBg}
                      border="1px solid"
                      borderColor={secondaryButtonBorder}
                      color={secondaryButtonColor}
                      fontSize="xs"
                      variant="no-effects"
                      px="20px"
                      mb="16px"
                    >
                      <Text textDecorationColor="none">Documentation</Text>
                    </Button>
                  </Link>
                </Box>
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  w="100%"
                  mb="16px"
                >
                  <GitHubButton
                    href="https://github.com/creativetimofficial/argon-dashboard-chakra"
                    data-icon="octicon-star"
                    data-show-count="true"
                    aria-label="Star creativetimofficial/argon-dashboard-chakra on GitHub"
                  >
                    Star
                  </GitHubButton>
                </Flex>
                <Box w="100%">
                  <Text mb="6px" textAlign="center">
                    Thank you for sharing!
                  </Text>
                  <Flex justifyContent="center" alignContent="center">
                    <Link
                      isExternal="true"
                      href="https://twitter.com/intent/tweet?url=https://www.creative-tim.com/product/argon-dashboard-chakra/&text=Check%20Argon%20Dashboard%20Chakra%20made%20by%20@simmmple_web%20and%20@CreativeTim"
                    >
                      <Button
                        colorScheme="twitter"
                        leftIcon={<FaTwitter />}
                        me="10px"
                      >
                        <Text>Tweet</Text>
                      </Button>
                    </Link>
                    <Link
                      isExternal="true"
                      href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/argon-dashboard-chakra/"
                    >
                      <Button colorScheme="facebook" leftIcon={<FaFacebook />}>
                        <Text>Share</Text>
                      </Button>
                    </Link>
                  </Flex>
                </Box>
              </Box> */}
              <br></br>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                mb="24px"
              >
                <SimpleGrid columns={1} >
                  <Box height="auto">
                    <Tooltip label="Customer AutoIncrement">
                      <Text fontSize="md" fontWeight="600" mb="16px">
                        Customer_AI
                      </Text>
                    </Tooltip>
                  </Box>
                  <Box height="auto">
                    <Flex>
                      <Input placeholder="25" value={customerAi} width='50%' onChange={(e) => setCustomerAi(e.target.value)}/>
                      <Spacer />
                      <Button
                        onClick={handleAutoIncremental}
                        color={colorMode === "light" ? "Dark" : "Light"}
                      >
                        Aplicar
                      </Button>
                    </Flex>
                  </Box>
                  
                 
                </SimpleGrid>
                
              </Flex>
              <HSeparator />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
