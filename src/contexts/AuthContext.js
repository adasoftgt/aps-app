// AuthContext.js
import React, { createContext, useContext, useState, useEffect, useRef,useMemo } from 'react';

// Amplify auth
import { signIn, getCurrentUser, fetchAuthSession, currentUserInfo, fetchUserAttributes } from 'aws-amplify/auth';

// accessToken
import { defaultStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';

/**
 * Bloque cognito
 */
import { CognitoIdentityServiceProvider } from 'aws-sdk';

// Importa el SDK de AWS
import AWS from 'aws-sdk';

// Configura las credenciales y la región
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

// modelos
import { Rol } from "models";

// Amplify datastore
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { Code } from '@chakra-ui/react';

import { CTX_INVOICE,CTX_PROFILE_ADMIN,CTX_PROFILE_CLIENT,CTX_PROFILE_COLLECTIONS,CTX_PAYMENT } from 'structures';


const AuthContext = createContext();




const AuthProvider = ({ children }) => {

    const cognito = new CognitoIdentityServiceProvider()
    // verificar la cantidad de roles
    //const roles = await DataStore.query(Rol, Predicates.ALL);

    const [roles,setRoles] = useState([])

    const [recargar,setRecargar] = useState(false)
    //const [capabilities,setCapabilities] = useState([])
    const [attributes,setAttributes] = useState([])
    const [accessToken,setAccessToken] = useState(null)
    //const [userId,setUserId] = useState(null)
    const now = useRef(new Date().toISOString())

    const userIdent = useRef(null);

    cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);

    const [isUserAuthenticated,setIsUserAuthenticated] = useState(false)
    const [userData,setUserData] = useState(false)

    const [ctxAuth,setCtxAuth] = useState([])

    //console.log('roles',roles)
    /**
     * Guardar en memoria el resultado de rolesOptions
     * @property {Array} options lista del nombre de roles
     */
    const rolesOptions = useMemo(() => {
        const options = roles.map(rol => rol.name)
        return options
    },[roles])

    /**
     * Este efecto se elimino y su funcionalidad de paso Docode: 4b4da013-ea1e-4e7a-bb3e-b67c4ea2de2e
     */
    /*useEffect( async() =>{
        try {
            const { username, userId, signInDetail } = await getCurrentUser();
            const attributes = await fetchUserAttributes();
            console.log('attributes',attributes)
            setUserData(
                {username,attributes}
            )
            //setIsUserAuthenticated(true)
        }catch(err){
            //setIsUserAuthenticated(false)
        }

        return () =>{

        }
    },[])*/

    /**
     * Efecto para cargar accesstoken de codgnito
     * Docode: 4b4da013-ea1e-4e7a-bb3e-b67c4ea2de2e
     */
    useEffect(async() => {
        try{
            const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};  
        
            const { username, userId, signInDetails } = await getCurrentUser();
            
            const attributes = await fetchUserAttributes();
            setUserData(
                {username,attributes}
            )
            
            
            setAccessToken(accessToken.toString())  
            //setUserId(userId)
            userIdent.current = userId
        }catch(err){
            console.error('User not login')
        }
      
        return () => {
            
        }
    },[recargar])


    // Roles
    useEffect(() => {
        
        const sub = DataStore.observeQuery(Rol, 
            (rol) => rol.updatedAt.gt(now.current)
        ).subscribe( async({ items }) => {
            if(accessToken != null){
                const roles = await DataStore.query(Rol, Predicates.ALL);
                setRoles(roles)
            }
        })
        

        return () => {
            sub.unsubscribe()
        }
    },[accessToken])

    /**
     * @property {String} profileValue name de de profile que tiene el usuario auntenticado
     */
    const profileValue = useMemo( () =>{
        
        if(attributes.length != 0){
            return attributes.find(attribute => attribute.Name === 'profile').Value; 
        }
        return ""
    },[attributes])

    /**
     * @property {Array} capabilities Lista de capacidades del usuario auntenticado 
     */
    const capabilities = useMemo( () =>{
        if(roles.length != 0 && profileValue != ""){
            return roles.find(rol => rol.name === profileValue).capabilities;
        }
        return []
    },[profileValue,roles])
    
    /**
     * @property {Object} user datos de usuarios autenticado
     * userId : "98888517-155f-441b-911b-8c9aa01da6e2"
     * username: "wbeto"
     */
    useEffect( async() =>{
        if(accessToken){
            const user_auth = await getCurrentUser()
            const params = {
                AccessToken: accessToken
            };
            
            const user = await cognito.getUser(params).promise()
            
            // Se obtine la array de atributos
            const userAttributes = user.UserAttributes
            setAttributes(userAttributes)
            
        }

        return () => {

        }
    },[accessToken])
    

    const userId = userIdent.current

    /*const caps = ['manage_options']
    const isOptions = capabilities.some(capacity => caps.includes(capacity));
    if(isOptions){
        const ctx_profile_admin = {...CTX_PROFILE_ADMIN}
        ctx_profile_admin.id = userId
        setCtxAuth(ctx_profile_admin)
    }else{
        const caps = ['payments_options']
        const isOptions = capabilities.some(capacity => caps.includes(capacity));
        if(isOptions){
            const ctx_profile_collector = {...CTX_PROFILE_COLLECTOR}
            ctx_profile_collector.id = userId
            setCtxAuth(ctx_profile_collector)
        }else{
            const ctx_profile_client = {...CTX_PROFILE_CLIENT}
            ctx_profile_client.id = userId
            setCtxAuth(ctx_profile_client)
        }
        
    }*/

    

    

    return (
        <AuthContext.Provider value={{ 
            signIn,getCurrentUser,
            roles,setRoles,
            rolesOptions,
            accessToken,
            userId,
            capabilities,
            userData,setUserData,
            isUserAuthenticated,setIsUserAuthenticated,
            ctxAuth,setCtxAuth,
            recargar,setRecargar
        }}>
          {children}
        </AuthContext.Provider>
    );
};


const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };