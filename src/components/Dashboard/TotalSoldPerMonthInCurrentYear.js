
import React,{useState,useEffect} from "react"

import { Text,HStack } from "@chakra-ui/react"

import { Product, ProductStatus, ProductPrice, Category, Invoice, InvoiceTerm, InvoiceItem, TypeDocument, InvoiceStatus,Customer,BatchChunk, BatchChunkStatus ,Batch, Payment } from "models";
  
// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';

import { useUsers } from "contexts/UsersContext";

import Moneda from "components/Monedas/Moneda";

import {barChartData, barChartOptions } from "variables/charts";

import BarChart from "components/Charts/BarChart";

import { v4 as uuidv4 } from 'uuid';

const TotalSoldPerMonthInCurrentYear = (props) =>{
    // Valores por defecto para evitar errores

     
    const defaultChartData = [{
        name: "Default Series",
        data: [0]
      }];
      
      const defaultChartOptions = {
        chart: {
          id: "default-chart"
        },
        xaxis: {
          categories: ["Default"]
        }
      };
    
    // SELLERS
    const { sellers } = useUsers() 

    const [chart,setChart] = useState({"options":defaultChartOptions,"data":defaultChartData,"key":uuidv4()})
    

    // Función para obtener el inicio y el fin de cada mes del año actual
    const getMonthsOfYear = () => {
        const year = new Date().getFullYear();
        const months = [];
        const monthsNames = []
    
        for (let month = 0; month < 12; month++) {
            const startDate = new Date(year, month, 1, 0, 0, 0);
            const endDate = new Date(year, month + 1, 0, 23, 59, 59);
            const name = startDate.toLocaleString('default', { month: 'short' })
            monthsNames.push(name)
            months.push({
                month: name ,
                startDate,
                endDate,
            });
        }
    
        return {"data":months,"categories":monthsNames};
    };

    useEffect( async() =>{
    
        

        
            const months = getMonthsOfYear()

            
            const chartInternal = []
            await months.data.reduce( async(totalSoldSum,month) =>{
                const startDateFix = month.startDate
                const endDateFix = month.endDate
                
                const invoices = await DataStore.query(Invoice,
                    c => c.and( c => [
                        c.fecha.ge(startDateFix.toISOString()),
                        c.fecha.le(endDateFix.toISOString()),
                        c.status.eq(InvoiceStatus.SENT)
                        
                    ]),
                );
                
                const totalSoldSumNumber = await totalSoldSum

                const saldoUnformat = invoices.reduce((saldoSum, invoice) => saldoSum + invoice.total, 0)
                
                chartInternal.push(parseFloat(saldoUnformat).toFixed(2).toString())
                
                return totalSoldSumNumber + saldoUnformat
                
            },Promise.resolve(0))

            let barChartOptionsAux = {...barChartOptions}
            barChartOptionsAux.xaxis.categories = months.categories
            barChartOptionsAux.xaxis.type = 'string'
            const chart = {
                "options": barChartOptionsAux ,
                "data": [
                    {
                        "name": "Monto",
                        "data": chartInternal
                    }
                ],
                key: uuidv4()
            }
            console.log('6a63bada-ff5f-44e1-af31-bcf3ae0971d0',chart)
            setChart(chart)

            
          
        

        return () =>{

        }
    },[])

    


    return(
        <>
            {Object.keys(chart).length != 0 &&(
                <BarChart key={chart.key} chartData={chart.data} chartOptions={chart.options} />
            )}
        </>
    )
}


export default TotalSoldPerMonthInCurrentYear