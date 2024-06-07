// ApsProductContext.js
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, InvoiceStatus, InvoiceItemStatus, UserConfiguration,Customer,Configuration} from "models";
  
// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore'


import { useApsHandlerContext } from './ApsHandlerContext';

import { useAuth } from './AuthContext';

// Crear el contexto
const ApsProductContext = createContext();



// Crear un proveedor del contexto
const ApsProductProvider = ({ children }) => {
  
    /**
     * Nombre del contexto para buscarlo dentro del modelo DataStore userConfiguration, cada usuario logueado puede tener se contexto seleccionado
     * @type {String}
     * @example
     * [{
     *  name: "PRODUCT_ID",
     *  id: "d48d028d-3fc2-49f3-b019-cc600db4ac90",
     *  userId: "32c02dce-fa2a-4cde-954e-4d3ea0338a7a"
     * },
     * {
     *  name: "PRODUCT_ID",
     *  id: "d48d028d-3fc2-49f3-b019-cc600db4ac90",
     *  userId: "bf543980-99ec-4345-9e60-b858121a8f89"
     * },
     * ]
     */
    const ctx = 'PRODUCT_ID'

    const [apsProductId,setApsProductId] = useState('')
    const [apsProductModel,setApsProductModel] = useState({})
    const [apsProductModels,setApsProductModels] = useState({})

    const { apsHandlerCtxUtils } = useApsHandlerContext()

    // Access token for authenticating API requests.
    const { accessToken,userId } = useAuth()
  
    // FUNCTIONS
    /**
     * Verificar si esta abierto el contexto operativo(CtxOps) en el estado
     * @param {Object} obj el objecto que contiene el modelo del producto
     * @returns {Boolean}
     */
    const isOpenCtxOpsState = () =>{
        return new Promise( async(resolve,reject) =>{
            if(apsProductModel.length != 0){
                resolve(true)
            }else{
                resolve(false)
            }
            
        })
    }

    /**
     * obtener el modelo del contexto de producto
     * @param {String} id indentificador de producto
     * @returns {Object} devuelve el objecto del modelo del producto si no exite el producto se devuelve objeto vacio {}
     */
    const getModel = async(id) =>{
        return new Promise( async(resolve,reject) =>{
            const model = await DataStore.query(Product,id)
            try{
                resolve(model)
            }catch(err){
                resolve({})
            }
        })
    }
    
    const apsProductCtxUtils = {
        /**
         * Abrir un Contexto
         * @param {String} value valor que se va guardar en el contexto operativo
         * @returns {Boolean} Si se abrio contexto devuvle true si no devuelve false
         */
        async open(value){
          if(apsProductId != value){
            const resOpen = await apsHandlerCtxUtils.open(ctx,value)
            if(resOpen){
                
                setApsProductId(value)
                const productModel = await getModel(value)
                setApsProductModel(productModel)
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
            setApsProductId('')
            setApsProductModel({})
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
        
        const resIsOpenCtxOpsState = await isOpenCtxOpsState()
        
        console.log('b5dfb560-9a37-4d43-a994-2594b667549b',resIsOpen,!resIsOpenCtxOpsState)
        if(resIsOpen && !resIsOpenCtxOpsState){
            // identificador de usuario extraido del contexto operativo
            const ctxProductId = await apsHandlerCtxUtils.getValue(ctx)
          
            setApsProductId(ctxProductId)
            const productModel = await getModel(ctxProductId)
            setApsProductModel(productModel)
          
        }
    
        return () =>{
    
        }
    },[userId])

    useEffect( async() => {
        const products = await DataStore.query(Product)
        setApsProductModels(products)
        return () =>{
            
        }
    },[userId])

  

    return (
        <ApsProductContext.Provider value={{ apsProductCtxUtils, apsProductId, apsProductModel, apsProductModels }}>
        {children}
        </ApsProductContext.Provider>
    );
};


const useApsProductContext = () => {
    const context = useContext(ApsProductContext);
    if (!context) {
      throw new Error('useApsProductContext debe ser utilizado dentro de un ApsProductProvider');
    }
    return context;
};

export { ApsProductProvider, useApsProductContext };
