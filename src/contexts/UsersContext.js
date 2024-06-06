// UsersContext.js
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

// cognito
import { CognitoIdentityServiceProvider } from 'aws-sdk';

import { USER_OPERATION } from 'structures';

import { useAuth } from './AuthContext';

// Importa el SDK de AWS
import AWS from 'aws-sdk';

// Configura las credenciales y la región
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});


const UsersContext = createContext();


import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, InvoiceStatus, InvoiceItemStatus, UserConfiguration,Customer,Configuration} from "models";
  
// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore'

const UsersProvider = ({ children }) => {
  
  const [users, setUsers] = useState([]);

  
  const [sellers,setSellers] = useState([])
  
  const [userOperationSelected,setUserOperationSelected] = useState(false)
  /**
   * @property {Object} invoiceDraft muestra modelo de la factura seleccionada por el usuario auth
   */
  const [invoiceDraft,setInvoiceDraft] = useState(false)

  /**
   * @property {Object} customerModel muestra modelo del cliente por el usuario auth
   */
  const [customerModel,setCustomerModel] = useState({})

   /**
   * @property {Object} paymentModel muestra modelo del payment por el usuario auth
   */
  const [paymentModel,setPaymentModel] = useState({})

   /**
   * @property {Object} invoiceModel muestra modelo del payment por el usuario auth
   */
   const [invoiceModel,setInvoiceModel] = useState({})

  /**
   * Autoincremetable de customer
   */
  const [customerAi,setCustomerAi] = useState('')

  const configurations = useRef('')

  const [applyChanges,setApplyChanges] = useState(false)

  /**
   * Buscar elemenntos dentro de las tablas, un solo buscador sin filtros
   */
  const [apsSearch,setApsSearch] = useState('')

  const { accessToken,userId } = useAuth()

  const cognito = new CognitoIdentityServiceProvider()
  
  /**
   * Esta es una estructura que se envia en cada fila de tabla al recuperar la lista de usuarios
   * @typedef {Object} Operation
   * @property {Object} attributes son los atributos recolectados del usuario de cognito
   * @property {Fuction} updateRolUser Esta funcion va actualizar el rol de un usuario cognito 
   *
  const USER_OPERATION = {
    attributes:"",
    updateRolUser:""
  }*/

  useEffect( async() => {
    const params = {
      UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
      GroupName: 'Sellers',
      //Filter: 'profile="seller"',
    };
    
    const Sellers = await cognito.listUsersInGroup(params).promise();
    setSellers(Sellers.Users ?? {})
  },[userId])


  /**
   * Actualizar los atributos del usario de cognito
   * 
   * @param {import('structures').UserOperation} user_operation es una estructura que contiene datos y atributos del usario a ser modificado
   */
  const updateAttrUser = async(user_operation) => {
    
    const sanitizarAttributes = (attributes) =>{
      return attributes.filter(item => item.Name !== "sub");
    }
    
    const params = {
      UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
      Username: user_operation.username,
      UserAttributes: sanitizarAttributes(user_operation.attributes),
      //AccessToken:accessToken,
    };
    await cognito.adminUpdateUserAttributes(params).promise()
  }

  /**
   * agregar usuario a un grupo especifico
   * @param {import('structures').UserOperation} user_operation Es una estructura que contiene datos y atributos del usario a ser modificado
   * @param {String} newGroup nombre del nuevo grupo segun configuracion de cognito 
   */
  const addGroupUser = async(user_operation,newGroup) => {
    
    const params = {
      UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
      Username: user_operation.username,
      GroupName: newGroup,
      //AccessToken:accessToken,
    };
    await cognito.adminAddUserToGroup(params).promise()
  }

  /**
   * remover usuario a un grupo especifico
   * @param {import('structures').UserOperation} user_operation Es una estructura que contiene datos y atributos del usario a ser modificado
   * @param {String} newGroup nombre del nuevo grupo segun configuracion de cognito 
   */
  const removeGroupUser = async(user_operation,newGroup) => {
    
    const params = {
      UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
      Username: user_operation.username,
      GroupName: newGroup,
      //AccessToken:accessToken,
    };
    await cognito.adminRemoveUserFromGroup(params).promise()
  }

  /**
   * Obtener la lista de grupos de cognito
   * @param {String} groupName el nombre del grupo que se quieren encontrar
   * @return {Promise<Object>} retorna un promesa de object que contine los datos del grupo de lo contrario object vacio 
   * @deprecated por revison
   */
  const getGroup = async(groupName) =>{
    const params = {
      UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
      GroupName: groupName
    };
    return await cognito.getGroup(params).promise()
  }

  

  /**
   * Confirmar a un usuario
   * 
   * @param {USER_OPERATION} user_operation es una estructura que contiene datos y atributos del usario a ser modificado
   */
  const confirmUser = async(user_operation) => {
    const params = {
      UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
      Username: user_operation.username,
      //AccessToken:accessToken,
    };
    
    await cognito.adminConfirmSignUp(params).promise()
  }
  
  /**
   * Disbled user
   * 
   * @param {USER_OPERATION} user_operation es una estructura que contiene datos y atributos del usario a ser modificado
   */
  const disableUser = async(user_operation) => {
    const params = {
      UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
      Username: user_operation.username,
      //AccessToken:accessToken,
    };
    
    await cognito.adminDisableUser(params).promise()
  }
  
  /**
   * Disbled user
   * 
   * @param {USER_OPERATION} user_operation es una estructura que contiene datos y atributos del usario a ser modificado
   */
  const enableUser = async(user_operation) => {
    const params = {
      UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
      Username: user_operation.username,
      //AccessToken:accessToken,
    };
    
    await cognito.adminEnableUser(params).promise()
  }

  const CTX = {
    USER_ID: "USER_ID",
    INVOICE_ID: "INVOICE_ID",
    INVOICE_DRAFT:"INVOICE_DRAFT",
    CUSTOMER_ID:"CUSTOMER_ID"
  };


  useEffect( async() => {
    const isCustumerOpenContext = await isOpenContext(CTX.CUSTOMER_ID)
    if(isCustumerOpenContext){
        const custumerId = await getValueOpenContext(CTX.CUSTOMER_ID)
        
        const isOpenContextDraft = await isOpenContext(CTX.INVOICE_DRAFT)
            
        if(isOpenContextDraft){
          const invoice_id = await getValueOpenContext(CTX.INVOICE_DRAFT)
          const invoice = await DataStore.query(
            Invoice, 
            c => c.id.eq(invoice_id)
          );
          setInvoiceDraft(invoice[0])

          const curtomer = await DataStore.query(
            Customer, 
            c => c.id.eq(custumerId)
          );

          setUserOperationSelected(curtomer[0])
        }
        
        

        
        
    }
      // const isCustumerOpenContext = await isOpenContext(CTX.CUSTOMER_ID)
      // if(isCustumerOpenContext){
      //   const custumerId = await getValueOpenContext(CTX.CUSTOMER_ID)
      //   const isOpenContextDraft = await isOpenContext(CTX.INVOICE_DRAFT)
      //   if(isOpenContextDraft){
      //     const invoice_id = await getValueOpenContext(CTX.INVOICE_DRAFT)
      //     const invoice = await DataStore.query(
      //         Invoice, 
      //         c => c.id.eq(invoice_id)
      //     );
      //     setInvoiceDraft(invoice)

      //     const curtomer = await DataStore.query(
      //       Customer, 
      //       c => c.id.eq(custumerId)
      //     );

      //     setUserOperationSelected(curtomer)

          
      //   }else{
      //     setInvoiceDraft(false)
      //   }
      // }
    
    // const configs = await DataStore.query(
    //     UserConfiguration, 
    //     c => c.and( c => [
    //         c.name.eq('invoice_draft'),
    //         c.userId.eq(userId)
    //     ])
    // );
    
    // configurations.current = configs
  
  

    // if(configs.length != 0){
    //     const invoice = await DataStore.query(
    //         Invoice, 
    //         c => c.id.eq(configs[0].value)
    //     );
        
    //     if(invoice.length !=0){
    //       setUserOperationSelected(invoice[0]?.clientId)
    //       setInvoiceDraft(invoice[0])
    //     }
        
    // }else{
    //   const isOpenContextData = await isOpenContext(CTX.USER_ID)
    //   if(isOpenContextData){
    //     const getValueOpenContextData = await getValueOpenContext(CTX.USER_ID)
    //     setUserOperationSelected(getValueOpenContextData)
    //   }else{
    //     setUserOperationSelected(false)
    //   }
    // }
  },[userId])

  // ------------------------------ CONTEXTOS ---------------------------------------


  const openContext = async(ctx,value) =>{
    const configs = await DataStore.query(
        UserConfiguration, 
        c => c.and( c => [
            c.name.eq(ctx),
            c.userId.eq(userId)
        ])
    );
    if(configs.length == 0){
      const newConfig = await DataStore.save(
        new UserConfiguration({
            userId: userId,
            name: ctx,
            value: value
        })
      );
      //setUserOperationSelected(value)
    }else{
      const config = configs[0]
      if(value != config.value){
        await DataStore.save(
          UserConfiguration.copyOf(config, updated => {
            updated['value'] = value
          })
        )
      }
      //setUserOperationSelected(value)
    }
  }
  
  const closeContext = async(ctx) =>{
    const configs = await DataStore.query(
      UserConfiguration, 
      c => c.and( c => [
          c.name.eq(ctx),
          c.userId.eq(userId)
      ])
    );
    
    if(configs.length != 0){
      const config = configs[0]
      console.log('deleteConfig',config)
      DataStore.delete(config);
      //setUserOperationSelected(false)
      
    }
  }

  const isOpenContext = async(ctx) =>{
    const configs = await DataStore.query(
      UserConfiguration, 
      c => c.and( c => [
          c.name.eq(ctx),
          c.userId.eq(userId)
      ])
    );
    if(configs.length != 0){
      return true
    }
    
    return false
  }

  const getValueOpenContext = async(ctx) =>{
    const configs = await DataStore.query(
      UserConfiguration, 
      c => c.and( c => [
          c.name.eq(ctx),
          c.userId.eq(userId)
      ])
    );
    
    if(configs.length != 0){
      const config = configs[0]
      return config.value
    }else{
      return ''
    }

  }

  /**
   * Verifiar los contexto antes de utilizarlos
   * @returns {objContexts}
   */
  const verifyContext = async() =>{
    /**
     * @typedef objContexts
     * @property {Object} invoiceModel Es el modelo que contiene todos los datos de factura seleccionada como contexto extraida de DataStore
     * @property {Object} customerModel Es el modelo que cotiene todos los datos de cosumidor seleccioando como contexto extraido de DataStore
     */
    var objContexts = {'invoiceModel':{},'customerModel':{}}
    // retorno de promesa
    return new Promise( async(resolve,reject) => {
      /**
       * Ver si existe contexto de customer
       */
      if(customerModel){
        if(Object.keys(customerModel).length == 0){
          const isOpen = await isOpenContext(CTX.CUSTOMER_ID)
          //setIsCustomer(isOpenContext_aux)
          if(isOpen){
            const id = await getValueOpenContext(CTX.CUSTOMER_ID)
            const model = await DataStore.query(Customer, id);
            objContexts.customerModel = model 
            setCustomerModel(model)
          }
        }
      }

      /**
       * Ver si existe contexto de invoice seleccioanda
       */
      if(invoiceModel){
        if(Object.keys(invoiceModel).length == 0){
          const isOpen = await isOpenContext(CTX.INVOICE_ID)
          //setIsCustomer(isOpenContext_aux)
          if(isOpen){
            const id = await getValueOpenContext(CTX.INVOICE_ID)
            const model = await DataStore.query(Invoice, id);
            objContexts.invoiceModel = model
            setInvoiceModel(model)
          }
        }
      }

      resolve(objContexts)
    })
  }

/**
 * Creacion o modificacion de la configuracion de auto-icrementable de customer
 */
// useEffect( async() =>{
  
//   const customerAiConfiguration = await DataStore.query(Configuration, 
//     c => c.and( c => [
//       c.name.eq('customerAi'),
//       c.id.eq('ff35fde6-7616-45f2-967f-8885280a9a4a')
//     ])
//   );

//   // const configSize = Object.keys(customerAiConfiguration).length
//   // if(configSize == 0){
//   //   await DataStore.save(
//   //     new Configuration({
//   //         name: "customerAi",
//   //         value: "0",
//   //     })
//   //   );
//   // }else if(configSize > 1){
    
//   //   for (let index = 1; index < customerAiConfiguration.length; index++) {
//   //     const element = customerAiConfiguration[index];
//   //     customerAiConfiguration.splice(index,1)
//   //     await DataStore.delete(element)
      
//   //   }
//   //   const customerAiConfigurationAux = customerAiConfiguration[0]
//   //   await DataStore.save(
//   //     Configuration.copyOf(customerAiConfigurationAux, updated => {
//   //         updated.value = customerAi
//   //     })
//   //   );
    
//   // }else{
//     if(customerAi != ''){
//       try{
//         const customerAiConfigurationAux = customerAiConfiguration[0]
//         await DataStore.save(
//           Configuration.copyOf(customerAiConfigurationAux, updated => {
//               updated.value = customerAi
//           })
//         );
//       }catch(err){
//         console.log(err)
//       }
//     }
//   //}

  


//   return () =>{
    
//   }
// },[customerAi])
  
/**
 * Obtener value de una configuacion si ya exite en DataStore
 * @param {String} name nombre de la configuracion
 * @returns {String} value
 */
const getValueConfiguration = (name) =>{
  return new Promise( async(resolve,reject) =>{
    const customerAiConfiguration = await DataStore.query(Configuration, 
      c => c.name.eq(name)
    );
  
    // verificar si tiene keys la consulta
    const configSize = Object.keys(customerAiConfiguration).length
    if(configSize != 0){
      resolve(customerAiConfiguration[0].value)
    }
  })
}

/**
 * Obtener el auto-increment de una configuracion y gardar el resultado de DataStore
 * @param {String} name nombre de la metadata de la configuracion
 * @returns {String} numero actual mas uno
 */
const getAutoIncrementConfiguration = async(name) =>{
  return new Promise( async(resolve,reject) =>{
    const value = await getValueConfiguration(name)
    const customerAiConfiguration = await DataStore.query(Configuration, 
      c => c.name.eq(name)
    );
    const newValue = (parseInt(value) + 1).toString()
    const customerAiConfigurationAux = customerAiConfiguration[0]
    await DataStore.save(
      Configuration.copyOf(customerAiConfigurationAux, updated => {
          updated.value = newValue
      })
    );

    resolve(newValue)
  })
}

  
  

  return (
    <UsersContext.Provider value={{ 
        sellers,
        updateAttrUser,
        addGroupUser,
        removeGroupUser,
        getGroup,
        confirmUser, 
        disableUser,
        enableUser,
        // capa de operacion
        userOperationSelected,setUserOperationSelected,
        invoiceDraft,setInvoiceDraft,
        customerModel,setCustomerModel,
        paymentModel,setPaymentModel,
        invoiceModel,setInvoiceModel,
        configurations,
        // CONFIGURATIONS
        getValueConfiguration,
        getAutoIncrementConfiguration,
        // valor de cliente autoincrementable
        customerAi,setCustomerAi,
        // CONTEXTOS
        verifyContext,
        openContext,closeContext,isOpenContext,getValueOpenContext,CTX,
        applyChanges,setApplyChanges,
        apsSearch,setApsSearch,
    }}>
      {children}
    </UsersContext.Provider>
  );
};

const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers debe ser utilizado dentro de un UsersProvider');
  }
  return context;
};

export { UsersProvider, useUsers };