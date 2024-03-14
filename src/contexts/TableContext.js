// TableContext.js
import React, { createContext, useContext, useState, useRef } from 'react';

const TableContext = createContext();

const TableProvider = ({ children }) => {
    
    const [edit,setEdit] = useState([])
    const [index,setIndex] = useState(-1)
    
    //table pagination
    const [total, setTotal] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [paginationTokenArray,setPaginationTokenArray] = useState([])
    const [updateTotal,setUpdateTotal] = useState(false)
    
    // switch
    const [editGlobalEnabled,setEditGlobalEnabled] = useState(false)

    const [tableRolName,setTableRolName] = useState('')
    const [tableRolDisplayName,setTableRolDisplayName] = useState('')

    // activar area de setting
    const [settingStatus,setSettingStatus] = useState(false)
    /**
     * @property {String} idCurrentRow Esto es el identificador de la fila cuando se preciona setting esa fila
     */
    const idCurrentRow = useRef('')
    
    /**
     * Edit row of the compoenete UsersRow, esto hace que sean visibles los botones edicion en cada row de la tabla
     * @param {int} index 
     * @param {object} rowDetails each row rendering has a rowDetails 
     * 
     * @property {String} rowDetails.key: Es el key de una propiedad del objeto
     * @property {String} rowDetails.typeButton: Establece tipo de boton que esta haciendo click Puede ser "Save" or "Edit"
     * @property {String} rowDetails.id: Identificador de registro de DataStore aws amplify 
     * @property {String} rowDetails.newValue: Nuevo valor de la propiedad del objeto
     * @property {Function} rowDetails.setIsChange: Funcion de useState para activar el loading del boton para mostrar que estar cargando mientras se modifica la propiedad del objeto
     * @property {Function} rowDetails.setEdit: Funcion de useState para activar o desactivar el estado de edicion
     * @deprecated Esta funcion esta en desuso, porfavor utilizar "actionRow" en su lugar
     */
     
    const editRow = async(index,rowDetails) => {
        edit[index] = rowDetails
        setEdit(edit)
        
        // this index change for rederizar and aplicate change*
        if(rowDetails.typeButton == "Return"){
          rowDetails.setEdit(false)
          
        }
    
        if(rowDetails.typeButton == "Edit"){
          rowDetails.setEdit(true)
          
        }
    
        
    
        if(rowDetails.typeButton == "Save"){
          rowDetails.setEdit(false)
          rowDetails.setIsChange(true)
          await updateEditRow(rowDetails.id,rowDetails.key,rowDetails.newValue)
          rowDetails.setIsChange(false)
        }
        
        setIndex(index)
    }


     /**
     * ActionRow es para saber que accion tiene que tomar la
     * @param {int} index 
     * @param {object} rowDetails each row rendering has a rowDetails 
     * 
     * @property {String} rowDetails.index: Numero de fila de la tabla
     * @property {String} rowDetails.key: Es el key de una propiedad del objeto
     * @property {String} rowDetails.typeButton: Establece tipo de boton que esta haciendo click Puede ser "Save" or "Edit"
     * @property {String} rowDetails.id: Identificador de registro de DataStore aws amplify 
     * @property {String} rowDetails.newValue: Nuevo valor de la propiedad del objeto
     * @property {Function} rowDetails.setIsChange: Funcion de useState para activar el loading del boton para mostrar que estar cargando mientras se modifica la propiedad del objeto
     * @property {Function} rowDetails.setEdit: Funcion de useState para activar o desactivar el estado de edicion
     */
     
    const actonRow = async(rowDetails) => {
        // this index change for rederizar and aplicate change*
        if(rowDetails.typeButton == "Return"){
          // desactiar la edicion de la propiedad el la row
          rowDetails.setEdit(false)
        }
    
        if(rowDetails.typeButton == "Edit"){
          // activar edicion de una propiedad de la row
          rowDetails.setEdit(true)
          
        }
    
        
    
        if(rowDetails.typeButton == "Save"){
          rowDetails.setEdit(false)
          rowDetails.setIsChange(true)
          await updatePropertyRow(rowDetails)
          rowDetails.setIsChange(false)
        }
        
        setIndex(index)
    }
  
    /**
     * Update una propiedad del objeto
     * @param {Object} rowDetails objeto por fila de tabla
     * @property {String} rowDetails.id Indentificador unico de dataStore amplify 
     * @property {String} rowDetails.key Es la llave de una propiedad del objeto recuperado
     * @property {String} rowDetails.newValue Es el string que va sustituir el el valor de la propiedad del objeto
     * @property {SchemaModel} rowDetails.schema Es el esquema a donde se va actualizar los datos
     */
    async function updatePropertyRow(rowDetails) {
      try{

        const original = await DataStore.query(rowDetails.schema, id);
      
        if (original) {
          const updatedPost = await DataStore.save(
            rowDetails.schema.copyOf(original, updated => {
              updated[rowDetails.key] = rowDetails.newValue
            })
          );
        }

      }catch(err){
        console.log(err)
      }
    }

    

    return (
        <TableContext.Provider value={{ 
            editRow,actonRow,
            edit,setEdit,
            index,setIndex, 
            total, setTotal,
            currentPage, setCurrentPage, 
            pageSize, setPageSize,
            paginationTokenArray,setPaginationTokenArray,
            editGlobalEnabled,setEditGlobalEnabled,
            tableRolName,setTableRolName,
            tableRolDisplayName,setTableRolDisplayName,
            settingStatus,setSettingStatus,
            idCurrentRow,
            updateTotal,setUpdateTotal
        }}>
          {children}
        </TableContext.Provider>
    );
};

const useTable = () => {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error('useTable debe ser utilizado dentro de un TableProvider');
    }
    return context;
};

export { TableProvider, useTable };