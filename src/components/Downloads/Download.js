
import { IconButton } from '@chakra-ui/react'

import React, { useState,useEffect } from 'react';
import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver';


import {ProductPrice,Batch,BatchStatus,Invoice,InvoiceItem,InvoiceStatus,Product,Customer} from "models";

// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { jitteredBackoff } from '@aws-amplify/core/internals/aws-client-utils';

import { useUsers } from 'contexts/UsersContext';
import moment from 'moment';

import { TbFileTypeXls } from "react-icons/tb";

const DetalleDownload = () => {
  const [data, setData] = useState([]);

    const { sellers } = useUsers()
  /**
   * {
    "id": "6d6b8352-8b9f-426d-a419-ea059092ab43",
    "price": 40,
    "total": 40,
    "status": "DRAFT",
    "productPriceStatus": null,
    "dateCreated": "Mon, 22 Apr 2024 23:44:50 GMT",
    "createdAt": "2024-04-22T23:44:51.438Z",
    "updatedAt": "2024-04-22T23:46:02.485Z",
    "productItemsId": "5118ccaf-d62b-4022-9638-f17b5a80e36d",
    "invoiceItemsId": "e6a2e2d7-c3c3-46d1-b5f5-9f87811e4db6",
    "_version": 3,
    "_lastChangedAt": 1713829562488,
    "_deleted": null
}
   */
  useEffect( async() =>{
    
    const convertirFecha = (isoDate) => {
        const fechaUTC = moment(isoDate);
        const fechaSolo = fechaUTC.format('YYYY-MM-DD');
        const fechaGuatemala = fechaUTC.locale('es-GT').format('DD-MM-YYYY'); // Formato de fecha local
        return fechaGuatemala
    };

    const getSellerUserName = (findUserId) =>{
        for (let index = 0; index < sellers.length; index++) {
            const seller = sellers[index];
            const user_id = seller.Attributes.find(attribute => attribute.Name === 'sub')?.Value;
            if(findUserId == user_id){
              return seller.Username.toUpperCase()
              //setSellerUserName(seller.Username)
              break;
            }
            
        }
    }


    
    const invoiceItems = await DataStore.query(InvoiceItem);
    const datas = []
    //setData(invoiceItems)
    const totalItems = await invoiceItems.reduce( async(totalSum,invoiceItem) => {
        const productId = invoiceItem.productItemsId
        const invoiceId = invoiceItem.invoiceItemsId
        
        const product = await DataStore.query(Product, productId)
        const invoice = await DataStore.query(Invoice, invoiceId)
        const customerId = invoice.clientId
        const userId = invoice.cashierId
        const customer = await DataStore.query(Customer, customerId)
       
        const data = {
            "CODIGO_FACTURA": invoiceItem.invoiceItemsId,
            "CODIGO_PRODUCTO": product.sku,
            "DESCRIPCION": product.description,
            "P/UNITARIO":  parseFloat(invoiceItem.price).toFixed(2),
            "TOTAL": parseFloat(invoiceItem.total).toFixed(2),
            "CODIGO_CLIENTE": customer.sku,
            "FECHA": convertirFecha(invoice.fecha),
            "VENDEDOR": getSellerUserName(userId),
            "SECTOR":customer.sector,
            "TRANSPORTE": customer.carrier,
            "CLIENTE": customer.name
        }
        
        datas.push(data)
       
        const totalSumNumber = await totalSum

        return totalSumNumber + invoiceItem.total
    },Promise.resolve(0))
    
    setData(datas)
    
    
    return () =>{

    }
  },[]) 


  const handleDownload = () => {
    if(data.length != 0){ 
        // Crear una hoja de cálculo a partir de los datos
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Data');

        // Crear un archivo Blob
        const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        const fileName = 'data.xlsx';

        // Guardar el archivo
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, fileName);
    }else{

    }
  };

  return (
    <>
      <IconButton aria-label='Descargar XLSX' icon={<TbFileTypeXls />} onClick={handleDownload} />
    </>
  );
};

export default DetalleDownload;
