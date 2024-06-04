// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  LightMode,
  useDisclosure,
  FormHelperText,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"

import React,{useState} from "react";

// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { ChakraWarning } from "components/Icons/Icons";


// Amplify auth
import { signUp } from '@aws-amplify/auth'

// router dom
import { useHistory } from "react-router-dom";





import CryptoJS from "crypto-js";

function SignUp() {
  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "blue.500");
  const textColor = useColorModeValue("gray.700", "white");
  const colorIcons = useColorModeValue("gray.700", "white");
  const bgIcons = useColorModeValue("trasnparent", "navy.700");
  const bgIconsHover = useColorModeValue("gray.50", "whiteAlpha.100");
  
  // history
  const history = useHistory();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  // username error 
  const [showErrorUsername, setShowErrorUsername] = useState(false);
  const [usernameTextError,setUsernameTextError] = useState('')

  // email error 
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  const [emailTextError,setEmailTextError] = useState('')

   // email error 
   const [showErrorPass, setShowErrorPass] = useState(false);
   const [passTextError,setPassTextError] = useState('')


  const [ModalState, setModalState] = useState({title:'Error',text:''});

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = React.useState("md")

  const handleRegister = async () => {
    setShowErrorUsername(false)
    setShowErrorEmail(false)
    setShowErrorPass(false)

    try {
      if(email == ''){
        throw new Error("Plese type email");
      }
      const userData = {
        username,
        email,
      };
      const secretKey = "SmtxT847kk2wH9";

      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(userData),
        secretKey,
        {
          mode: CryptoJS.mode.ECB,
        }
      );
      
      // all profiles ingress with collaborator
      const profile = 'seller'
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            profile
          },
          // optional
          //autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        }
      });
      //onOpen()
      history.push({
        pathname: "/auth/confirmsignup",
        search: "?token=" + btoa(encryptedData),
      });
      //console.log('Registro exitoso:', userId);
    } catch (error) {
      
      const text = error.toString()
      
      // regex for username
      var regex = /username|(U|u)ser/
      if (regex.test(text)) {
        setShowErrorUsername(true)
        setUsernameTextError(text)
      }
      
      // regex for email
      regex = /(e|E)mail/
      if (regex.test(text)) {
        setShowErrorEmail(true)
        setEmailTextError(text)
      }
      
      // regex for password
      regex = /(p|P)assword/
      if (regex.test(text)) {
        setShowErrorPass(true)
        setPassTextError(text)
      }

      
      console.error('Error al registrarse:', error.toString());
    }
  };
  
  return (
    
    <Flex
      direction='column'
      alignSelf='center'
      justifySelf='center'
      overflow='hidden'>
      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{ModalState}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            todo es posible
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box
        position='absolute'
        minH={{ base: "70vh", md: "50vh" }}
        maxH={{ base: "70vh", md: "50vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        maxW={{ md: "calc(100vw - 50px)" }}
        left='0'
        right='0'
        bgRepeat='no-repeat'
        overflow='hidden'
        zIndex='-1'
        top='0'
        bgImage={BgSignUp}
        bgSize='cover'
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}
        borderRadius={{ base: "0px", md: "20px" }}>
        <Box w='100vw' h='100vh' bg='blue.500' opacity='0.8'></Box>
      </Box>
      <Flex
        direction='column'
        textAlign='center'
        justifyContent='center'
        align='center'
        mt='125px'
        mb='30px'>
        <Text fontSize='4xl' color='white' fontWeight='bold'>
          Welcome!
        </Text>
        <Text
          fontSize='md'
          color='white'
          fontWeight='normal'
          mt='10px'
          mb='26px'
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "333px" }}>
          Use these awesome forms to login or create new account in your project
          for free.
        </Text>
      </Flex>
      <Flex alignItems='center' justifyContent='center' mb='60px' mt='20px'>
        <Flex
          direction='column'
          w='445px'
          background='transparent'
          borderRadius='15px'
          p='40px'
          mx={{ base: "100px" }}
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
            Register With
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
          <FormControl>
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              UserName
            </FormLabel>
            
            {showErrorUsername && (
              <FormHelperText>{usernameTextError}</FormHelperText>
            )}
            <Flex>
              {showErrorUsername && (
                <ChakraWarning w='27px' h='27px' style={{margin: '6px 0 0 0'}} />
              )}
              <Input
                variant='auth'
                fontSize='sm'
                ms='4px'
                type='text'
                placeholder='Your User Name'
                mb='24px'
                size='lg'
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
              />
            </Flex>
            
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Email
            </FormLabel>
            {showErrorEmail && (
              <FormHelperText>{emailTextError}</FormHelperText>
            )}
            <Flex>
              {showErrorEmail && (
                <ChakraWarning w='27px' h='27px' style={{margin: '6px 0 0 0'}} />
              )}
              <Input
                variant='auth'
                fontSize='sm'
                ms='4px'
                type='email'
                placeholder='Your email address'
                mb='24px'
                size='lg'
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </Flex>
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Password
            </FormLabel>
            {showErrorPass && (
              <FormHelperText>{passTextError}</FormHelperText>
            )}
            <Flex>
              {showErrorPass && (
                <ChakraWarning w='27px' h='27px' style={{margin: '6px 0 0 0'}} />
              )}
              <Input
                variant='auth'
                fontSize='sm'
                ms='4px'
                type='password'
                placeholder='Your password'
                mb='24px'
                size='lg'
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
            </Flex>
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
              onClick={handleRegister}>
              SIGN UP
            </Button>
          </FormControl>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            maxW='100%'
            mt='0px'>
            <Text color={textColor} fontWeight='medium'>
              Already have an account?
              <Link
                color={titleColor}
                as='span'
                ms='5px'
                href='#'
                fontWeight='bold'>
                Sign In
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignUp;
