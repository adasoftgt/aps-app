// ApsHandlerContext.js
import React, { createContext, useContext, useState } from 'react';

import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, InvoiceStatus, InvoiceItemStatus, UserConfiguration,Customer,Configuration} from "models";
  
// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore'

import { useAuth } from './AuthContext';

// Crear el contexto
const ApsHandlerContext = createContext();

// Crear un proveedor del contexto
const ApsHanderProvider = ({ children }) => {
  
  // Access token for authenticating API requests.
  const { accessToken,userId } = useAuth()

  const apsHandlerCtxUtils = {
    /**
     * abrir un contexto operativo ingresarlo a DataStore userConfiguration si ya existe sobre escribe el que esta actualmente
     * @param {String} ctx nombre del contexto operacional
     * @param {String} value valor que se va agregar al contexto, esto puede ser indentificador para identificar el contexto a abrir
     * @returns {Boolean}
     */
    async open(ctx,value){
      return new Promise( async(resolve,reject) =>{
        const configs = await DataStore.query(
          UserConfiguration, 
          c => c.and( c => [
              c.name.eq(ctx),
              c.userId.eq(userId)
          ])
        );
        console.log('1011752e-dcc8-4803-a8cf-b5518d6ebb1a',configs)
        if(configs.length == 0){
          const newConfig = await DataStore.save(
            new UserConfiguration({
                userId: userId,
                name: ctx,
                value: value
            })
          );
          resolve(true)
        }else{
          const config = configs[0]
          if(value != config.value){
            await DataStore.save(
              UserConfiguration.copyOf(config, updated => {
                updated['value'] = value
              })
            )
          }
          resolve(true)
        }
      })
      
    },
    /**
     * Cerrar el contexto operativo, esto lo quita de la DataStore userConfiguration
     * @param {String} ctx nombre del contexto operacional
     * @return {Boolean} devuelve true si cerro el contexto y false si no lo cerro
     */
    async close(ctx){
      return new Promise( async(resolve,reject) =>{
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
          resolve(true)
        }
        resolve(false)
      })
      
    },
    /**
     * Verificar si esta abierto el contexto operacional
     * @param {String} ctx nombre del contexto operacional
     * @returns {Boolean} responde si, si existe el contexto operacional y no, si no existe
     */
    async isOpen(ctx){
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
    },
    /**
     * Obtener el contexto abierto
     * @param {String} ctx nombre del contexto operativo
     * @return {UserConfiguration} si existe trae el model UserConfiguration de lo contrario devuelve false
     */
    async getOpen(ctx){
      const configs = await DataStore.query(
        UserConfiguration, 
        c => c.and( c => [
            c.name.eq(ctx),
            c.userId.eq(userId)
        ])
      );
      
      if(configs.length != 0){
        const config = configs[0]
        return config
      }else{
        return false
      }
    },
    /**
     * Obtener el valor guardado en el contexto operativo en DataStore userConfiguration
     * @param {String} ctx nombre del contexto operativo
     * @returns {String} con el valor de configuracion buscada si no existe devolvera string vacio
     */
    async getValue(ctx){
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
  }

  

  return (
    <ApsHandlerContext.Provider value={{ apsHandlerCtxUtils }}>
      {children}
    </ApsHandlerContext.Provider>
  );
};


const useApsHandlerContext = () => {
    const context = useContext(ApsHandlerContext);
    if (!context) {
      throw new Error('useApsHandlerContext debe ser utilizado dentro de un ApsHanderProvider');
    }
    return context;
};

export { ApsHanderProvider, useApsHandlerContext };
