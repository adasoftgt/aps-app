


/*->list profile
    superadmin
    admin
    adminassistant
    manger
    mangerassistant
    medicalvisitor
    collaborator
    client
*/
// Chakra Icons
import { BellIcon } from "@chakra-ui/icons";

// Chakra Imports
import {
   Text,
   Button,
   useColorModeValue,
   useColorMode,
   Heading
} from "@chakra-ui/react";

// Custom Icons
import { ArgonLogoDark, ArgonLogoLight, ChakraLogoDark, ChakraLogoLight, ProfileIcon, SettingsIcon, ChakraSignOutLight,ChakraSignOutDark } from "components/Icons/Icons";

// router dom
import {useHistory} from "react-router-dom";

// CUSTOMS

import React,{ useState } from "react";

//Amplify auth
import {signOut } from 'aws-amplify/auth';


// Amplify datastore
import { DataStore } from '@aws-amplify/datastore';



// Todo shema datastore
import {Todo,Configuration} from "models"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react"

import { useAuth } from "contexts/AuthContext";

export default function HeaderLinksSignOut(props) {
    
    const {
        fixed,
        scrolled,
        secondary,
      } = props;

    
    const {userData,setUserData} = useAuth()
    const { colorMode } = useColorMode();

    const itemColor = useColorModeValue("gray.700", "white");
    const itemIconColor = useColorModeValue("gray.700", "white");
    
    // useDisclosure
    const { isOpen, onOpen, onClose } = useDisclosure()

    // history
    const history = useHistory();


    // Chakra Color Mode
    let navbarIcon =
    fixed && scrolled
        ? useColorModeValue("gray.700", "gray.200")
        : useColorModeValue("white", "gray.200");
    let menuBg = useColorModeValue("white", "navy.800");
    if (secondary) {
        navbarIcon = "white";
    }

    

   
    // FUNCTIONS
    const handleSignOutAsk = async () => {
      
      /*try {
        await DataStore.start()

        const post = await DataStore.save(
          new Todo({
            name: 'My First Post',
          })
        );

        
        console.log('Post saved successfully!', post);
      } catch (error) {
        console.log('Error saving post', error);
      }*/

      try {
        await DataStore.start()

        const post = await DataStore.save(
          new Configuration({
            name: 'hola',
            value: 'hola2',
            createdAt: 'hola3',
            updatedAt: 'hola4',
          })
        );

        
        console.log('Post saved successfully!', post);
      } catch (error) {
        console.log('Error saving post', error);
      }

      
     
  
      try {
        const posts = await DataStore.query(Todo);
        console.log('Posts retrieved successfully!', JSON.stringify(posts, null, 2));
      } catch (error) {
        console.log('Error retrieving posts', error);
      }
      onOpen()
    }
    const handleSignOut = async () => {
      try {
        setUserData(false)
        await signOut();
        setTimeout(() => {
          history.push({
            pathname: "/auth/signin",
          });
        }, 500); // Delay in milliseconds
      } catch (error) {
        console.log('error signing out: ', error);
      }
    }
    
    return(
      <>
        <Button
            ms='0px'
            px='0px'
            me={{ sm: "2px", md: "16px" }}
            color={navbarIcon}
            variant='no-effects'
            rightIcon={
              document.documentElement.dir ? (
                ""
              ) : (
                <>
                {colorMode === "dark" ? (
                  <ChakraSignOutLight color={navbarIcon} w='22px' h='22px' me='0px' />
                ) : (
                  <ChakraSignOutDark color={navbarIcon} w='22px' h='22px' me='0px' />
                )}
                </>
              )
            }
            leftIcon={
              document.documentElement.dir ? (
                <>
                {colorMode === "dark" ? (
                  <ChakraSignOutLight color={navbarIcon} w='22px' h='22px' me='0px' />
                ) : (
                  <ChakraSignOutDark color={navbarIcon} w='22px' h='22px' me='0px' />
                )}
                </>
                
              ) : (
                ""
              )
            }
            onClick={handleSignOutAsk}>
            <Text display={{ sm: "flex", md: "flex" }} color={itemColor}>Sign Out</Text>
        </Button>
      
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>¿Desea cerrar la sesión?</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <Heading as="h4" size="md">
              ¿Cerrar la sesión de su cuenta?
            </Heading>
              Al cerrar la sesión, se eliminarán todos los datos de la sesión, como los datos de inicio de sesión, las preferencias y los datos de navegación.
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleSignOut} colorScheme="blue" mr={3}>
                Si
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </>
    )
}

