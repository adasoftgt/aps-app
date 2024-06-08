// ApsStatsContext.js
import React, { createContext, useContext, useState, useEffect  } from 'react';

import { lineChartData,lineChartOptions } from 'variables/charts';

import { useApsHandlerContext } from './ApsHandlerContext';

import { useUsers } from "contexts/UsersContext"

import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, TypeDocument, InvoiceStatus,Customer,BatchChunk,Batch, Payment } from "models";

import { v4 as uuidv4 } from 'uuid';

import Moneda from 'components/Monedas/Moneda';
// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';


// Crear el contexto
const ApsStatsContext = createContext();

// Crear un proveedor del contexto
const ApsStatsProvider = ({ children }) => {
  
    const { apsHandlerCtxUtils } = useApsHandlerContext()

    const {sellers} = useUsers()

    const [apsStatsLineChart,setApsStatsLineChart] = useState({"options":lineChartOptions,"data":[],"key": uuidv4()})

    const getStartOfMonth = () => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
      };
      
    const getEndOfMonth = () => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    };

    useEffect(async()=>{
        const categorie_sellers = []
        const data_sellers = []
        
        if(sellers.length != 0){
            
            const totalAmount = await sellers.reduce( async(totalAmountSum,seller) =>{
                const seller_sub = seller.Attributes.find(attribute => attribute.Name === 'sub')?.Value;
                categorie_sellers.push(seller.Username)
                
                const startDateFix = getStartOfMonth() // June 1st, 2024 (month starts at 0)
                
                const endDateFix = getEndOfMonth() // June 7th, 2024
                
                


                const invoices = await DataStore.query(Invoice,
                    c => c.and( c => [
                        c.cashierId.eq(seller_sub),
                        c.fecha.ge(startDateFix.toISOString()),
                        c.fecha.le(endDateFix.toISOString()),
                    ]),
                );
                
                
                            
                const amountUnformat = invoices.reduce((saldoSum, invoice) => saldoSum + invoice.total, 0)
                const totalAmountSumNumber = await totalAmountSum
                data_sellers.push(amountUnformat)
                return totalAmountSumNumber + amountUnformat
            },Promise.resolve(0))
            

            // OPTIONS
            let apsStatsLineChartOptionsAux = {...lineChartOptions}
            apsStatsLineChartOptionsAux.xaxis.type = "string"
            apsStatsLineChartOptionsAux.xaxis.categories = categorie_sellers
            apsStatsLineChartOptionsAux.xaxis.convertedCatToNumeric = false
            

            setApsStatsLineChart({
                "options":apsStatsLineChartOptionsAux,
                "data":[{
                    "name": "Amount",
                    "data": data_sellers
                }],
                "key": uuidv4()
            })
        }
        return () =>{

        }
    },[sellers])
  
    
    
    return (
        <ApsStatsContext.Provider value={{ apsStatsLineChart }}>
        {children}
        </ApsStatsContext.Provider>
    );
};


const useApsStatsContext = () => {
    const context = useContext(ApsStatsContext);
    if (!context) {
      throw new Error('useApsStatsContext debe ser utilizado dentro de un ApsStatsProvider');
    }
    return context;
};

export { ApsStatsProvider, useApsStatsContext };
