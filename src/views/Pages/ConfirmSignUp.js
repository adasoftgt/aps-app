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
} from "@chakra-ui/react";
// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import React,{useState} from "react";

// alerts
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"

//import { Amplify } from 'aws-amplify';
// import awsconfig from '../../../aws-exports';


// Amplify auth
import { confirmSignUp } from '@aws-amplify/auth'


import { useHistory,useLocation } from "react-router-dom";

import CryptoJS from "crypto-js";
//import { jsx } from "@emotion/react";

function ConfirmSignUp() {
  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "blue.500");
  const textColor = useColorModeValue("gray.700", "white");
  const colorIcons = useColorModeValue("gray.700", "white");
  const bgIcons = useColorModeValue("trasnparent", "navy.700");
  const bgIconsHover = useColorModeValue("gray.50", "whiteAlpha.100");
  const history = useHistory();

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
    history.push({
      pathname: "/auth/signup",
    })
  }
  

  const [usernameState, setUsername] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');


  //alert useState
  const [alertShow,setAlertShow] = useState(false)
  const [alertText,setAlertText] = useState('')
  const [alertType,setAlertType] = useState('success')
  
  /*if(!queryParams.get("username")){
    history.push({
      pathname: "/auth/signup",
    })
  }*/
  const username = jsonData.username || usernameState;

  const handleConfirmation = async () => {
    
    try {
      const userData = {
        username,
      };
      
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode
      });
      
      setAlertShow(true)
      setAlertText('Codigo confirmado, redirigiendo....')

      setTimeout(() => {
        history.push({
          pathname: "/auth/signin",
          search: "?token=" + base64Data,
        });
      }, 800); // Delay in milliseconds
      
      
      console.log('Verificado')
    } catch (error) {
      setAlertShow(true)
      setAlertType('error')
      setAlertText(error.toString())
      console.log('error confirming sign up', error);
    }

    setTimeout(() => {
      setAlertShow(false)
    }, 10000); // Delay in milliseconds

  };
  
  return (
    <Flex
      direction='column'
      alignSelf='center'
      justifySelf='center'
      overflow='hidden'>
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
            Confirmar Cuenta
          </Text>
          <Text
            fontSize='lg'
            color='gray.400'
            fontWeight='bold'
            textAlign='center'
            mb='22px'>
            Se ha enviado un correo electrónico a tu dirección de correo electrónico ({jsonData.email}) con un código de confirmación. Por favor, abre el correo electrónico y copia el código para confirmar tu cuenta.
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
              User Name
            </FormLabel>
            <Input
              variant='auth'
              fontSize='sm'
              ms='4px'
              type='text'
              placeholder='User name'
              mb='24px'
              size='lg'
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              disabled
            />
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Confirmation Code
            </FormLabel>
            <Input
              variant='auth'
              fontSize='sm'
              ms='4px'
              type='text'
              placeholder='Your Confirmation Code'
              mb='24px'
              size='lg'
              value={confirmationCode} 
              onChange={(e) => setConfirmationCode(e.target.value)}
            />
            
            <Button
              fontSize='10px'
              variant='dark'
              fontWeight='bold'
              w='100%'
              h='45'
              mb='24px'
              onClick={handleConfirmation}>
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

export default ConfirmSignUp;
