

// ApsUserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// cognito
import { CognitoIdentityServiceProvider } from 'aws-sdk';

// Importa el SDK de AWS
import AWS from 'aws-sdk';

// Configura las credenciales y la región
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

// importando contexto de authtenticación
import { useAuth } from './AuthContext';

import { useApsHandlerContext } from './ApsHandlerContext';

import { USER_OPERATION } from 'structures';

// Crear el contexto
const ApsUserContext = createContext();

// Crear un proveedor del contexto
const ApsUserProvider = ({ children }) => {
  
  /**
   * Nombre del contexto para buscarlo dentro del modelo DataStore userConfiguration, cada usuario logueado puede tener se contexto seleccionado
   * @type {String}
   * @example
   * [{
   *  name: "USER_ID",
   *  id: "d48d028d-3fc2-49f3-b019-cc600db4ac90",
   *  userId: "32c02dce-fa2a-4cde-954e-4d3ea0338a7a"
   * },
   * {
   *  name: "USER_ID",
   *  id: "d48d028d-3fc2-49f3-b019-cc600db4ac90",
   *  userId: "bf543980-99ec-4345-9e60-b858121a8f89"
   * },
   * ]
   */
  const ctx = 'USER_ID'

  // interface congito
  const cognito = new CognitoIdentityServiceProvider()
  
  // Access token for authenticating API requests.
  const { accessToken,userId } = useAuth()
  
  // Configurando estados
  const [contextUserName,setContextUserName] = useState(false)
  /**
   * @type {import('structures').UserOperation}
   */
  const [userOperation,setUserOperation] = useState({})

  // Cargando la utilidades del handler de los contextos operativos
  const { apsHandlerCtxUtils } = useApsHandlerContext()
  
  /**
     * Chequea el useState para verifica que si esta con un estado activo no hay que buscar de nuevo DataStore userConfiguration
     * @returns {Boolean}
     */
  const isStateActive = async() => {
    return new Promise( (resolve,reject) =>{
      if(contextUserName){
        resolve(true)
      }
      resolve(false)
    })
    
  }

  /**
   * Obtener los datos de un usario de cognito
   * @returns {import('structures').UserOperation} retorna una estura que de objeto que tiene coginito 
   */
  const getUserCognito = async(ctxUserName) =>{
    return new Promise ( async(resolve,reject) =>{
      const params = {
        UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
        Username: ctxUserName
        //Filter: 'profile="seller"',
      };
  
      
      try{
        const user = await cognito.adminGetUser(params).promise();
        resolve(user)
      }catch(err){
        console.log('cd79e8e6-fb36-432f-97f5-a5f9a48f7c5d',err)
      }
      
    })
    
  }
  
  
  const apsUserCtxUtils = {
    /**
     * Abrir un Contexto
     * @param {String} value valor que se va guardar en el contexto operativo
     * 
     */
    async open(value){
      if(contextUserName != value){
        const resOpen = await apsHandlerCtxUtils.open(ctx,value)
        if(resOpen){
        /**
         * UserName que se encuentra en el contexto operativo
         * @type {String}
         */
        const ctxUserName = await apsHandlerCtxUtils.getValue(ctx)
          
        /**
         * Obtener los datos del usuario desde cognito
         * @type {Object}
         */  
        const userObj = await getUserCognito(ctxUserName)

        /**
         * Obtener la estructura de USER_OPERATION
         * @type {Object}
         */
        const user_operation = { ...USER_OPERATION };
        
        const sub =  userObj.UserAttributes.find((attribute) => attribute.Name === "sub");
        const userId = sub ? sub.Value : ''
        const profileAttr =  userObj.UserAttributes.find((attribute) => attribute.Name === "profile");
        const profile = profileAttr ? profileAttr.Value : ''
        user_operation.attributes = userObj.UserAttributes
        user_operation.username = userObj.Username
        user_operation.UserStatus = userObj.UserStatus
        user_operation.Enabled = userObj.Enabled
        user_operation.userId = userId
        user_operation.profile = profile
          
          setContextUserName(ctxUserName)
          setUserOperation(user_operation)
        }
        return resOpen
      }
      return false
    },
    /**
     * Cerrar este contexto de usuario
     * @returns {Boolean} si es true se cerro el contexto
     */
    async close(){
      const resClose = await apsHandlerCtxUtils.close(ctx)
      if(resClose){
        // Dada como terminado el useState del usario en el contexto
        setContextUserName(false)
        setUserOperation({})
      }
      return resClose
    }
    ,
    /***
     * Verificar si este contexto operativo esta abierto
     */
    async isOpen(){
      const resIsOpen = await apsHandlerCtxUtils.isOpen(ctx)
      return resIsOpen
    },
    /**
     * @returns {String}
     */
    async getValue(){
      const resGetValue = await apsHandlerCtxUtils.getValue(ctx)
      return resGetValue
    }
  }

  useEffect(async() =>{
    const resIsOpen = await apsHandlerCtxUtils.isOpen(ctx)
    
    const isStateActiveVar = await isStateActive()
    console.log('722743e3-3a44-4c62-af1a-f31a317ed6d3',resIsOpen,!isStateActiveVar)

    if(resIsOpen && !isStateActiveVar){
      // identificador de usuario extraido del contexto operativo
      const ctxUserName = await apsHandlerCtxUtils.getValue(ctx)
      
      const userObj = await getUserCognito(ctxUserName)
      const user_operation = { ...USER_OPERATION };
      const sub =  userObj.UserAttributes.find((attribute) => attribute.Name === "sub");
      const userId = sub ? sub.Value : ''
      
      const profileAttr =  userObj.UserAttributes.find((attribute) => attribute.Name === "profile");
      const profile = profileAttr ? profileAttr.Value : ''
      
      user_operation.attributes = userObj.UserAttributes
      user_operation.username = userObj.Username
      user_operation.UserStatus = userObj.UserStatus
      user_operation.Enabled = userObj.Enabled
      user_operation.userId = userId
      user_operation.profile = profile
      
      setContextUserName(ctxUserName)
      setUserOperation(user_operation)
      
    }

    return () =>{

    }
  },[userId])


  

  return (
    <ApsUserContext.Provider value={{ apsUserCtxUtils, contextUserName, userOperation }}>
      {children}
    </ApsUserContext.Provider>
  );
};


const useApsUserContext = () => {
    const context = useContext(ApsUserContext);
    if (!context) {
      throw new Error('useApsUserContext debe ser utilizado dentro de un ApsUserProvider');
    }
    return context;
};

export { ApsUserProvider, useApsUserContext };
