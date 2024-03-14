


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
    useColorMode,
    useColorModeValue,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Box,
    IconButton,
    Badge,
} from "@chakra-ui/react";

import { Tooltip } from '@chakra-ui/react'
import { useDisclosure } from "@chakra-ui/react";

// Custom Icons
import { ArgonLogoDark, ArgonLogoLight, ChakraLogoDark, ChakraLogoLight, ProfileIcon, SettingsIcon } from "components/Icons/Icons";

// Custom Components
import { ItemContent } from "components/Menu/ItemContent";

// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";

// acciones
import HeaderLinksSignOut from './AdminNavbarLinksSignOut'

import { NavLink } from "react-router-dom";

import React,{ useState } from "react";

import { useUsers } from "contexts/UsersContext";

import { FiArrowLeft,FiPlusSquare, FiDollarSign, FiEdit, FiTrash2, FiFileText} from "react-icons/fi";

import { FaUsersViewfinder } from "react-icons/fa6";

import DrawerContext from "./DrawerContext";


export default function HeaderLinksUser(props) {
    
    const {
        fixed,
        scrolled,
        secondary,
      } = props;

    const { colorMode } = useColorMode();

    const itemColor = useColorModeValue("gray.700", "white");
    const itemIconColor = useColorModeValue("gray.700", "white");

    const [profile,setProfile] = useState(props.userData.attributes.profile)
    const [username,setUsername] = useState(props.userData.username)

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const {
      invoiceDraft
   } = useUsers()

    // Chakra Color Mode
    let navbarIcon =
    fixed && scrolled
        ? useColorModeValue("gray.700", "gray.200")
        : useColorModeValue("white", "gray.200");
    let menuBg = useColorModeValue("white", "navy.800");
    if (secondary) {
        navbarIcon = "white";
    }
    //
    return(
        <>
          <Tooltip label='View Contexts'>
            <IconButton icon={<FaUsersViewfinder />} onClick={onOpen} />
          </Tooltip>
          {invoiceDraft &&
            <NavLink to='/admin/invoice_create'>
              <Tooltip label='Invoice Draft'>
                <Box position="relative" display="inline-block">
                    <IconButton icon={<FiFileText />} />
                    {1 > 0 && (
                        <Badge
                        position="absolute"
                        bottom="-3"
                        right="-3"
                        colorScheme="yellow"
                        borderRadius="full"
                        px="2"
                        fontSize="xs"
                        >
                        {1}
                        </Badge>
                    )}
                </Box>
              </Tooltip>
            </NavLink>
          }
          <Menu>
            <MenuButton>
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
                    <ProfileIcon color={navbarIcon} w='22px' h='22px' me='0px' />
                  )
                }
                leftIcon={
                  document.documentElement.dir ? (
                    <ProfileIcon color={navbarIcon} w='22px' h='22px' me='0px' />
                  ) : (
                    ""
                  )
                }>
              </Button>
            </MenuButton>
            <MenuList p='16px 8px' bg={menuBg}>
              <Flex flexDirection='column'>
                <NavLink to='/admin/profile'>
                  <MenuItem borderRadius='8px' mb='10px'>
                    <ItemContent
                      time=''
                      info={profile}
                      boldInfo={username}
                      aName={username}
                      aSrc=''
                    />
                  </MenuItem>
                </NavLink>
                <MenuItem borderRadius='8px' mb='10px'>
                  <HeaderLinksSignOut />
                </MenuItem>
              </Flex>
            </MenuList>
          </Menu>
          <DrawerContext isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </>
          
    )
}

