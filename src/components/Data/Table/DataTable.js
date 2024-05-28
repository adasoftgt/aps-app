

import React from 'react';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';

/**
 * Componente de datatable
 * @param {Object} prop
 * @param {Object} prop.columns
 * @param {Object} prop.data
 */
export const ApsDataTable = ({columns,data}) =>{
    
    const customStyles = {
        rows: {
          style: {
            backgroundColor: 'lightgray', // Set background color for all rows
          },
        },
        cells: {
          style: {
            color: 'black', // Set text color for all cells
          },
        },
        header: {
          style: {
            backgroundColor: 'blue', // Set background color for header row
            color: 'white', // Set text color for header row
          },
        },
      };
    
    // example
    /*data = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', city: 'New York' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', city: 'London' },
        { id: 3, name: 'Michael Brown', email: 'michael.brown@example.com', city: 'Paris' },
      ];

    columns = [
        {
          name: 'ID',
          selector: row => row.id,
          sortable: true,
        },
        {
          name: 'Name',
          selector: row => row.name,
          sortable: true,
        },
        {
          name: 'Email',
          selector: row => row.email,
          sortable: true,
        },
        {
          name: 'City',
          selector: row => row.city,
          sortable: true,
        },
    ];*/
    if(data.length != 0 && columns.length != 0){
        return(
            <DataTable
            columns={columns}
            data={data}
            pagination
            customStyles={customStyles}
            // Optional features (see documentation for more):
            // filtering
            // sorting
            // expandableRows
            // selectableRows
        />  
        )
    }else{
        return <></>
    }
}