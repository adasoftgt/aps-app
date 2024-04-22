import { Box } from "@chakra-ui/react";

import React,{useState,useEffect} from "react";

// Importa el SDK de AWS
import AWS from 'aws-sdk';

// Configura las credenciales y la región
/*
 
 */
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

// cognito
import { CognitoIdentityServiceProvider } from 'aws-sdk';


function UserName(props){
    const cognito = new CognitoIdentityServiceProvider()

    const {userId} = props

    const [user,setUser] = useState({});


    useEffect( async() =>{
      
      const params = {
        UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
        Filter: `sub = "${userId}"`,
      };
      
      const list = await cognito.listUsers(params).promise();

      const usuario = list.Users[0]
    
      //console.log('usuario',usuario)

      setUser(usuario)
         
      
      return () =>{

      }
    },[userId])
    
    
    return(
        <>{user?.Username}</>
    )
}

export default UserName