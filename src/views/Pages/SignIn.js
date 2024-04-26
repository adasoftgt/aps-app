import React,{useState} from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Icon,
  Link,
  Switch,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"

// Assets
import signInImage from "assets/img/signInImage.png";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

// Amplify auth
import { signIn,getCurrentUser } from 'aws-amplify/auth';

// Amplify datastore
import { DataStore } from '@aws-amplify/datastore';

// router dom
import { useHistory,useLocation } from "react-router-dom";

// CryptoJS
import CryptoJS from "crypto-js";

import {Todo} from "models/index"

import { useAuth,AuthProvider } from "contexts/AuthContext";

function SignInComponent() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "blue.500");
  const colorIcons = useColorModeValue("gray.700", "white");
  const bgIcons = useColorModeValue("trasnparent", "navy.700");
  const bgIconsHover = useColorModeValue("gray.50", "whiteAlpha.100");

  const {recargar,setRecargar} = useAuth()

  // history
  const history = useHistory();

  // drawer
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = React.useState("top")

  //alert
  const [alertShow,setAlertShow] = useState(false)
  const [alertText,setAlertText] = useState('')
  const [alertType,setAlertType] = useState('success')
  
  // useState user
  const [usernameState, setUsernameState] = useState('');
  const [password, setPassword] = useState('');

  // init
  const [init, setInit] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  var jsonData = ''
  const base64Data = queryParams.get("token")
  try{
  
    
    
    const encryptedData = atob(base64Data)

    const secretKey = "SmtxT847kk2wH9";

    const decryptedData = CryptoJS.AES.decrypt(
      encryptedData,
      secretKey,
      {
        mode: CryptoJS.mode.ECB,
      }
    );
    
    const utf8Data = decryptedData.toString(CryptoJS.enc.Utf8)
    jsonData = JSON.parse(utf8Data)
  }catch(err){
  }

  const username = jsonData.username || usernameState;

  const currentAuthenticatedUser = async () => {
    setInit(true)
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      history.push({
        pathname: "/admin/dashboard",
      });
      
    } catch (err) {
      console.log(err);
    }
  }
  if(!init){
    currentAuthenticatedUser()
  }
  
  // FUNCTIONS

  const handleSignIn = async () => {
    
    setAlertShow(false)
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      if(isSignedIn){
        setAlertShow(true)
        setAlertText('Login exitoso, redirigiendo')
        setTimeout(() => {
          setAlertShow(false)
          history.push({
            pathname: "/admin/dashboard",
          });
        }, 800); // Delay in milliseconds
      }
      
    } catch (error) {
      setAlertShow(true)
      setAlertType('error')
      setAlertText(error.toString())
      console.log('error signing in', error);
    }
    setTimeout(() => {
      setAlertShow(false)
    }, 5000); // Delay in milliseconds
  }

  const onKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleSignIn()
    }
  };

  

  return (
    <Flex position='relative' mb='40px'>
      <Flex
        minH={{ md: "1000px" }}
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        justifyContent='space-between'
        mb='30px'
        pt={{ md: "0px" }}>
        <Flex
          w='100%'
          h='100%'
          alignItems='center'
          justifyContent='center'
          mb='60px'
          mt={{ base: "50px", md: "20px" }}>
          <Flex
            zIndex='2'
            direction='column'
            w='445px'
            background='transparent'
            borderRadius='15px'
            p='40px'
            mx={{ base: "100px" }}
            m={{ base: "20px", md: "auto" }}
            bg={bgForm}
            boxShadow={useColorModeValue(
              "0px 5px 14px rgba(0, 0, 0, 0.05)",
              "unset"
            )}>
            <Text
              fontSize='xl'
              color={textColor}
              fontWeight='bold'
              textAlign='center'
              mb='22px'>
              Signin With
            </Text>
            <HStack spacing='15px' justify='center' mb='22px'>
              <Flex
                justify='center'
                align='center'
                w='75px'
                h='75px'
                borderRadius='8px'
                border={useColorModeValue("1px solid", "0px")}
                borderColor='gray.200'
                cursor='pointer'
                transition='all .25s ease'
                bg={bgIcons}
                _hover={{ bg: bgIconsHover }}>
                <Link href='#'>
                  <Icon as={FaFacebook} color={colorIcons} w='30px' h='30px' />
                </Link>
              </Flex>
              <Flex
                justify='center'
                align='center'
                w='75px'
                h='75px'
                borderRadius='8px'
                border={useColorModeValue("1px solid", "0px")}
                borderColor='gray.200'
                cursor='pointer'
                transition='all .25s ease'
                bg={bgIcons}
                _hover={{ bg: bgIconsHover }}>
                <Link href='#'>
                  <Icon
                    as={FaApple}
                    color={colorIcons}
                    w='30px'
                    h='30px'
                    _hover={{ filter: "brightness(120%)" }}
                  />
                </Link>
              </Flex>
              <Flex
                justify='center'
                align='center'
                w='75px'
                h='75px'
                borderRadius='8px'
                border={useColorModeValue("1px solid", "0px")}
                borderColor='gray.200'
                cursor='pointer'
                transition='all .25s ease'
                bg={bgIcons}
                _hover={{ bg: bgIconsHover }}>
                <Link href='#'>
                  <Icon
                    as={FaGoogle}
                    color={colorIcons}
                    w='30px'
                    h='30px'
                    _hover={{ filter: "brightness(120%)" }}
                  />
                </Link>
              </Flex>
            </HStack>
            <Text
              fontSize='lg'
              color='gray.400'
              fontWeight='bold'
              textAlign='center'
              mb='22px'>
              or
            </Text>
            {alertShow && (
              <Alert
                type={alertType}
                variant="solid"
                style={{
                  borderRadius: "15px"
                }}
              >
                {alertText}
              </Alert>
            )}
            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                UserName
              </FormLabel>
              <Input
                variant='auth'
                fontSize='sm'
                ms='4px'
                type='text'
                placeholder='Your full name'
                mb='24px'
                size='lg'
                value={username}
                onChange={(e) => setUsernameState(e.target.value)}
              />
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Password
              </FormLabel>
              <Input
                variant='auth'
                fontSize='sm'
                ms='4px'
                type='password'
                placeholder='Your password'
                mb='24px'
                size='lg'
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={onKeyUp}
              />
              <FormControl display='flex' alignItems='center' mb='24px'>
                <Switch id='remember-login' colorScheme='blue' me='10px' />
                <FormLabel htmlFor='remember-login' mb='0' fontWeight='normal'>
                  Remember me
                </FormLabel>
              </FormControl>
              <Button
                fontSize='10px'
                variant='dark'
                fontWeight='bold'
                w='100%'
                h='45'
                mb='24px'
                onClick={handleSignIn}>
                SIGN IN
              </Button>
            </FormControl>
          </Flex>
        </Flex>
        <Box
          overflowX='hidden'
          h='100%'
          w='100%'
          left='0px'
          position='absolute'
          bgImage={signInImage}>
          <Box
            w='100%'
            h='100%'
            bgSize='cover'
            bg='blue.500'
            opacity='0.8'></Box>
        </Box>
      </Flex>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
    
  );
}


const SignIn = () => {
  return (
    <AuthProvider>
      <SignInComponent />
    </AuthProvider>
  );
};


export default SignIn;
