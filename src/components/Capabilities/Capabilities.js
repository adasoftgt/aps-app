import React, { useState } from "react";
import { 
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Flex,
    Grid,
    Icon,
    Link,
    Switch,
    Text,
    useColorModeValue,
 } from "@chakra-ui/react";

// Assets
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar5 from "assets/img/avatars/avatar5.png";
import avatar6 from "assets/img/avatars/avatar6.png";
import ImageArchitect1 from "assets/img/ImageArchitect1.png";
import ImageArchitect2 from "assets/img/ImageArchitect2.png";
import ImageArchitect3 from "assets/img/ImageArchitect3.png";


// custom import
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import {
    FaCube,
    FaFacebook,
    FaInstagram,
    FaPenFancy,
    FaPlus,
    FaTwitter,
  } from "react-icons/fa";

import Switchcap from "./Switchcap"

/**
 * 
 * @property {String} rolId identificador de del de datastore amplify 
 * @property {Function} createOrUpdateCap Funcion para crear o actualizar capacidad del rol
 * @property {Array} rolCaps Array de capacidades del rol
 * @returns 
 */
const Capabilities = ({rolId,rolCaps,createOrUpdateCap,rolDisplayName}) => {
    const textColor = useColorModeValue("gray.700", "white");
    const iconColor = useColorModeValue("blue.500", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const borderRoleColor = useColorModeValue("white", "transparent");
    const bgRole = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
    const emailColor = useColorModeValue("gray.400", "gray.300");
    const borderProfileColor = useColorModeValue("white", "transparent");
    const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
    return (
        <>
            <Flex
                direction={{ sm: "column", md: "row" }}
                mb='24px'
                maxH='330px'
                justifyContent={{ sm: "center", md: "space-between" }}
                align='center'
                backdropFilter='blur(21px)'
                boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
                border='1.5px solid'
                borderColor={borderProfileColor}
                bg={bgProfile}
                p='24px'
                borderRadius='20px'>
                    <Flex
                        align='center'
                        mb={{ sm: "10px", md: "0px" }}
                        direction={{ sm: "column", md: "row" }}
                        w={{ sm: "100%" }}
                        textAlign={{ sm: "center", md: "start" }}>
                        <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }}>
                            <Text
                            fontSize={{ sm: "lg", lg: "xl" }}
                            color={textColor}
                            fontWeight='bold'
                            ms={{ sm: "8px", md: "0px" }}>
                            {rolDisplayName}
                            </Text>
                            <Text
                            fontSize={{ sm: "sm", md: "md" }}
                            color={emailColor}
                            fontWeight='semibold'>
                            Roles
                            </Text>
                        </Flex>
                    </Flex>
            </Flex>
            <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap='22px'>
                <Card p='16px'>
                <CardHeader p='12px 5px' mb='12px'>
                    <Text fontSize='lg' color={textColor} fontWeight='bold'>
                    Platform Settings
                    </Text>
                </CardHeader>
                <CardBody px='5px'>
                    <Flex direction='column'>
                        <Text fontSize='sm' color='gray.400' fontWeight='600' mb='20px'>
                            DASHBOARD
                        </Text>
                        
                        <Switchcap 
                            capValue={'read'}
                            text="read" 
                            rolId={rolId} 
                            rolCaps={rolCaps} 
                            createOrUpdateCap={createOrUpdateCap} 
                        />
                        <Switchcap 
                            capValue={'edit_dashboard'}
                            text="edit_dashboard" 
                            rolId={rolId} 
                            rolCaps={rolCaps} 
                            createOrUpdateCap={createOrUpdateCap} 
                        />

                        <Text fontSize='sm' color='gray.400' fontWeight='600' mb='20px'>
                            USERS
                        </Text>
                        <Switchcap 
                            capValue={'list_users'}
                            text="list_users" 
                            rolId={rolId} 
                            rolCaps={rolCaps} 
                            createOrUpdateCap={createOrUpdateCap} 
                        />
                        <Switchcap 
                            capValue={'create_users'}
                            text="create_users" 
                            rolId={rolId} 
                            rolCaps={rolCaps} 
                            createOrUpdateCap={createOrUpdateCap} 
                        />
                        <Switchcap 
                            capValue={'edit_users'}
                            text="edit_users" 
                            rolId={rolId} 
                            rolCaps={rolCaps} 
                            createOrUpdateCap={createOrUpdateCap} 
                        />
                        <Switchcap 
                            capValue={'delete_users'}
                            text="delete_users" 
                            rolId={rolId} 
                            rolCaps={rolCaps} 
                            createOrUpdateCap={createOrUpdateCap} 
                        />
                        <Switchcap 
                            capValue={'promote_users'}
                            text="promote_users" 
                            rolId={rolId} 
                            rolCaps={rolCaps} 
                            createOrUpdateCap={createOrUpdateCap} 
                        />
                        <Switchcap 
                            capValue={'remove_users'}
                            text="remove_users" 
                            rolId={rolId} 
                            rolCaps={rolCaps} 
                            createOrUpdateCap={createOrUpdateCap} 
                        />

                        <Text fontSize='sm' color='gray.400' fontWeight='600' mb='20px'>
                            TOOLS
                        </Text>

                        <Switchcap 
                            capValue={'import'}
                            text="import" 
                            rolId={rolId} 
                            rolCaps={rolCaps} 
                            createOrUpdateCap={createOrUpdateCap} 
                        />
                        <Switchcap 
                            capValue={'export'}
                            text="export" 
                            rolId={rolId} 
                            rolCaps={rolCaps} 
                            createOrUpdateCap={createOrUpdateCap} 
                        />

                        <Text fontSize='sm' color='gray.400' fontWeight='600' mb='20px'>
                            ADMIN
                        </Text>

                        <Switchcap 
                            capValue={'manage_options'}
                            text="manage_options" 
                            rolId={rolId} 
                            rolCaps={rolCaps} 
                            createOrUpdateCap={createOrUpdateCap} 
                        />


                        <Text fontSize='sm' color='gray.400' fontWeight='600' mb='20px'>
                            PAYMENTS
                        </Text>

                        <Switchcap 
                            capValue={'payments_options'}
                            text="manage_options" 
                            rolId={rolId} 
                            rolCaps={rolCaps} 
                            createOrUpdateCap={createOrUpdateCap} 
                        />


                        

                    
                    </Flex>
                </CardBody>
                </Card>
                <Card p='16px' my={{ sm: "24px", xl: "0px" }}>
                <CardHeader p='12px 5px' mb='12px'>
                    <Text fontSize='lg' color={textColor} fontWeight='bold'>
                    Profile Information
                    </Text>
                </CardHeader>
                <CardBody px='5px'>
                    <Flex direction='column'>
                    <Text fontSize='md' color='gray.400' fontWeight='400' mb='30px'>
                        Hi, I’m Esthera Jackson, Decisions: If you can’t decide, the
                        answer is no. If two equally difficult paths, choose the one
                        more painful in the short term (pain avoidance is creating an
                        illusion of equality).
                    </Text>
                    <Flex align='center' mb='18px'>
                        <Text
                        fontSize='md'
                        color={textColor}
                        fontWeight='bold'
                        me='10px'>
                        Full Name:{" "}
                        </Text>
                        <Text fontSize='md' color='gray.400' fontWeight='400'>
                        Esthera Jackson
                        </Text>
                    </Flex>
                    <Flex align='center' mb='18px'>
                        <Text
                        fontSize='md'
                        color={textColor}
                        fontWeight='bold'
                        me='10px'>
                        Mobile:{" "}
                        </Text>
                        <Text fontSize='md' color='gray.400' fontWeight='400'>
                        (44) 123 1234 123
                        </Text>
                    </Flex>
                    <Flex align='center' mb='18px'>
                        <Text
                        fontSize='md'
                        color={textColor}
                        fontWeight='bold'
                        me='10px'>
                        Email:{" "}
                        </Text>
                        <Text fontSize='md' color='gray.400' fontWeight='400'>
                        esthera@simmmple.com
                        </Text>
                    </Flex>
                    <Flex align='center' mb='18px'>
                        <Text
                        fontSize='md'
                        color={textColor}
                        fontWeight='bold'
                        me='10px'>
                        Location:{" "}
                        </Text>
                        <Text fontSize='md' color='gray.400' fontWeight='400'>
                        United States
                        </Text>
                    </Flex>
                    <Flex align='center' mb='18px'>
                        <Text
                        fontSize='md'
                        color={textColor}
                        fontWeight='bold'
                        me='10px'>
                        Social Media:{" "}
                        </Text>
                        <Flex>
                        <Link
                            href='#'
                            color={iconColor}
                            fontSize='lg'
                            me='10px'
                            _hover={{ color: "blue.500" }}>
                            <Icon as={FaFacebook} />
                        </Link>
                        <Link
                            href='#'
                            color={iconColor}
                            fontSize='lg'
                            me='10px'
                            _hover={{ color: "blue.500" }}>
                            <Icon as={FaInstagram} />
                        </Link>
                        <Link
                            href='#'
                            color={iconColor}
                            fontSize='lg'
                            me='10px'
                            _hover={{ color: "blue.500" }}>
                            <Icon as={FaTwitter} />
                        </Link>
                        </Flex>
                    </Flex>
                    </Flex>
                </CardBody>
                </Card>
                <Card p='16px'>
                <CardHeader p='12px 5px' mb='12px'>
                    <Text fontSize='lg' color={textColor} fontWeight='bold'>
                    Conversations
                    </Text>
                </CardHeader>
                <CardBody px='5px'>
                    <Flex direction='column' w='100%'>
                    <Flex justifyContent='space-between' mb='21px'>
                        <Flex align='center'>
                        <Avatar
                            src={avatar2}
                            w='50px'
                            h='50px'
                            borderRadius='15px'
                            me='10px'
                        />
                        <Flex direction='column'>
                            <Text fontSize='sm' color={textColor} fontWeight='bold'>
                            Sophie B.{" "}
                            </Text>
                            <Text fontSize='xs' color='gray.400' fontWeight='400'>
                            Hi! I need more information...
                            </Text>
                        </Flex>
                        </Flex>
                        <Button p='0px' bg='transparent' variant='no-effects'>
                        <Text
                            fontSize='10px'
                            fontWeight='700'
                            color={iconColor}
                            alignSelf='center'>
                            REPLY
                        </Text>
                        </Button>
                    </Flex>
                    <Flex justifyContent='space-between' mb='21px'>
                        <Flex align='center'>
                        <Avatar
                            src={avatar3}
                            w='50px'
                            h='50px'
                            borderRadius='15px'
                            me='10px'
                        />
                        <Flex direction='column'>
                            <Text fontSize='sm' color={textColor} fontWeight='bold'>
                            Sophie B.{" "}
                            </Text>
                            <Text fontSize='xs' color='gray.400' fontWeight='400'>
                            Awesome work, can you change...
                            </Text>
                        </Flex>
                        </Flex>
                        <Button p='0px' bg='transparent' variant='no-effects'>
                        <Text
                            fontSize='10px'
                            fontWeight='700'
                            color={iconColor}
                            alignSelf='center'>
                            REPLY
                        </Text>
                        </Button>
                    </Flex>
                    <Flex justifyContent='space-between' mb='21px'>
                        <Flex align='center'>
                        <Avatar
                            src={avatar4}
                            w='50px'
                            h='50px'
                            borderRadius='15px'
                            me='10px'
                        />
                        <Flex direction='column'>
                            <Text fontSize='sm' color={textColor} fontWeight='bold'>
                            Sophie B.{" "}
                            </Text>
                            <Text fontSize='xs' color='gray.400' fontWeight='400'>
                            Have a great afternoon...
                            </Text>
                        </Flex>
                        </Flex>
                        <Button p='0px' bg='transparent' variant='no-effects'>
                        <Text
                            fontSize='10px'
                            fontWeight='700'
                            color={iconColor}
                            alignSelf='center'>
                            REPLY
                        </Text>
                        </Button>
                    </Flex>
                    <Flex justifyContent='space-between' mb='21px'>
                        <Flex align='center'>
                        <Avatar
                            src={avatar5}
                            w='50px'
                            h='50px'
                            borderRadius='15px'
                            me='10px'
                        />
                        <Flex direction='column'>
                            <Text fontSize='sm' color={textColor} fontWeight='bold'>
                            Sophie B.{" "}
                            </Text>
                            <Text fontSize='xs' color='gray.400' fontWeight='400'>
                            About files I can...
                            </Text>
                        </Flex>
                        </Flex>
                        <Button p='0px' bg='transparent' variant='no-effects'>
                        <Text
                            fontSize='10px'
                            fontWeight='700'
                            color={iconColor}
                            alignSelf='center'>
                            REPLY
                        </Text>
                        </Button>
                    </Flex>
                    <Flex justifyContent='space-between' mb='21px'>
                        <Flex align='center'>
                        <Avatar
                            src={avatar6}
                            w='50px'
                            h='50px'
                            borderRadius='15px'
                            me='10px'
                        />
                        <Flex direction='column'>
                            <Text fontSize='sm' color={textColor} fontWeight='bold'>
                            Sophie B.{" "}
                            </Text>
                            <Text fontSize='xs' color='gray.400' fontWeight='400'>
                            About files I can...
                            </Text>
                        </Flex>
                        </Flex>
                        <Button p='0px' bg='transparent' variant='no-effects'>
                        <Text
                            fontSize='10px'
                            fontWeight='700'
                            color={iconColor}
                            alignSelf='center'>
                            REPLY
                        </Text>
                        </Button>
                    </Flex>
                    </Flex>
                </CardBody>
                </Card>
            </Grid>
        </>
        
    );
};

export default Capabilities;