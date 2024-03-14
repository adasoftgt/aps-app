// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Grid,
  Switch,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button, ButtonGroup,
  IconButton,

  Stack, HStack, VStack,

  Box
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesProjectRow from "components/Tables/TablesProjectRow";
import RolesRow from "components/Tables/RolesRow";
import React,{useState,useEffect,useRef} from "react";
import { tablesProjectData, tablesTableData } from "variables/general";
import Pagination from "components/Pagination/Paginacion.js"
import Capabilities from "components/Capabilities/Capabilities.js"

// modelos
import { Rol } from "models";

// Amplify datastore
import { DataStore, Predicates } from '@aws-amplify/datastore';


import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"

import { FiArrowLeft } from "react-icons/fi";



function Roles() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const borderRoleColor = useColorModeValue("white", "transparent");
  const bgRole = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");

  //Formulario de creacion de rol
  const [rolName,setRolName] = useState('')
  const [rolDisplayName,setRolDisplayName] = useState('')
  
 
  const [rolId,SetRolId] = useState('') // si rolID esta activo significa que se que tiene que mostrar la lista de capacidades
  const [rolCaps,setRolCaps] = useState([]) // lista de capacidades del rol
  


  const [tableRolName,setTableRolName] = useState('')
  const [tableRolDisplayName,setTableRolDisplayName] = useState('')
  const [roles,setRoles] = useState([])
  const [count,setCount] = useState(0)
  const [edit,setEdit] = useState([])
  const [index,setIndex] = useState(-1)
  const [tableUpdate,setTableUpdate] = useState({})

  //alert
  const [alertShow,setAlertShow] = useState(false)
  const [alertText,setAlertText] = useState('')
  const [alertType,setAlertType] = useState('success')

  // switch
  const [editGlobalEnabled,setEditGlobalEnabled] = useState(true)

  //table pagination
  const [total, setTotal] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

 


  const createRol = async() => {
    
    try {
      
      const newRol = DataStore.save(
        new Rol({
          name: rolName,
          displayname: rolDisplayName,
          type: 'Custom',
          capabilities: ['read'],
        })
      );
      
      setRolName('');setRolDisplayName('')
      setAlertShow(true);setAlertText('Rol Creado')
      setTimeout(() => {
        setAlertShow(false);
      },5000)
      
      // Se va cambiar total para renderizar de nuevo y cargar objetos nuevos
      setTotal(total + 1)
    } catch (error) {
      console.error('Error creating Rol:', error);
    }
  }

  const getRolesSync = async() => {
    try {
      //await DataStore.clear();
         
      const sub = DataStore.observeQuery(Rol).subscribe(({ items }) => {
        setRoles(items);
        setTotal(items.length)
      });

      setTimeout(function(){
        try{
          sub.unsubscribe();
        }catch(err){
          console.log('unsubscribe',err)
        }
      },1000,sub)
      
    } catch (error) {
      console.error('Error consultar Rol:', error);
    }
  }

  const getRolesLocal = async() => {
    const roles = await DataStore.query(Rol, Predicates.ALL, {
      page: currentPage - 1,
      limit: pageSize
    });
    //const roles = await DataStore.query(Rol, Predicates.ALL)
    //console.log('roles',roles,pageSize,currentPage)
    
    setRoles(roles)
  }
  

  const handleCapabilities = async (rolIdCap,rolDisplayNameCap) => {
      const rolSelected = await DataStore.query(Rol, rolIdCap);
      console.log('handleCapabilities',rolSelected.capabilities)
      setRolCaps(rolSelected.capabilities)
      SetRolId(rolIdCap)
      setRolDisplayName(rolDisplayNameCap)
  }


  useEffect(() => {
    getRolesLocal()
  },[currentPage])

  useEffect(() => {
    getRolesLocal()
  },[total])
  
  useEffect(() => {
    
    // getRolesLocal()
    // Se ejecuta cuando se renderiza el componente por primera vez
    // o cuando cambia el valor de count
    //console.log('me volvi a llamar')
    const interval = setInterval(() => {
      if(roles.length == 0 && count < 20){
        getRolesSync()
        
        setCount(count + 1);
      }else{
        console.log('consultado' + count,roles,roles.length,new Date().toLocaleTimeString())
        
        clearInterval(interval);
        return this
      }
      
    }, 300);

    return () => {
      // Se ejecuta cuando se desmontona el componente
      //console.log('me volvi a limpiar')
      clearInterval(interval);

    };
  }, [count]);

  

  /**
   * Eliminar una object de DataStore de amplify
   * @param {String} id Identificador de registro de DataStore aws amplify
   */
  const deleteRow = async(id) => {
    const toDelete = await DataStore.query(Rol, id);
    
    if (toDelete) {
      DataStore.delete(toDelete);
      // Se va cambiar total para renderizar de nuevo y cargar objetos restantes
      setTotal(total - 1)
    }
  }

  /**
   * Edit row of the compoenete rolesRow, 
   * @param {int} index 
   * @param {object} rowDetails each row rendering has a rowDetails 
   * 
   * @property {String} rowDetails.key: Es el key de una propiedad del objeto
   * @property {String} rowDetails.typeButton: Establece tipo de boton que esta haciendo click Puede ser "Save" or "Edit"
   * @property {String} rowDetails.id: Identificador de registro de DataStore aws amplify 
   * @property {String} rowDetails.newValue: Nuevo valor de la propiedad del objeto
   * @property {Function} rowDetails.setIsChange: Funcion de useState para activar el loading del boton para mostrar que estar cargando mientras se modifica la propiedad del objeto
   * @property {Function} rowDetails.setEdit: Funcion de useState para activar o desactivar el estado de edicion
   * 
   */
  const editRow = async(index,rowDetails) => {
    console.log('rowDetails',rowDetails)
    edit[index] = rowDetails
    setEdit(edit)
    

    /*if(index == 0){
      index = false 
    }else{
      index = index * -1
    }*/
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
   * Update una propiedad del objeto 
   * @param {String} id Indentificador unico de dataStore amplify 
   * @param {String} key Es la llave de una propiedad del objeto recuperado
   * @param {String} newValue Es el string que va sustituir el el valor de la propiedad del objeto 
   */
  async function updateEditRow(id, key, newValue) {
    try{

      const original = await DataStore.query(Rol, id);
    
      if (original) {
        const updatedPost = await DataStore.save(
          Rol.copyOf(original, updated => {
            updated[key] = newValue
          })
        );
      }

    }catch(err){
      console.log(err)
    }
  }

  /**
   * Create or update cability of role
   * @param {String} rolId Indentificador unico de dataStore amplify 
   * @param {Boolean} status Estatus el switch
   * @param {*} capValue nombre de la capacidad agregar al rol
   */
  async function createOrUpdateCap(rolId,status,capValue){
    try{

      const original = await DataStore.query(Rol, rolId);
    
      if (original) {
        const updatedPost = DataStore.save(
          Rol.copyOf(original, updated => {
            var capabilities = updated['capabilities'] 
            if(status == false){
              const index = capabilities.indexOf(capValue);
              capabilities.splice(index, 1)
              
            }else{
              capabilities.push(capValue)
              
            }
            
            
          })
        );

        const modificated = await DataStore.query(Rol, rolId);
        
        setRolCaps(modificated['capabilities'])
      }

    }catch(err){
      console.log(err)
    }
  }

  
  
  
  

  return (
    <>
      {!rolId ? (
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
          <div style={{padding: "0 0 10px 0"}}>
            <Card p='16px' >
              <CardBody px='5px'>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="email-alerts" mb="0">
                    Necesitas editar
                  </FormLabel>
                  <Switch 
                    id="email-alerts" 
                    defaultIsChecked={editGlobalEnabled} // Vincula el estado al Switch
                    onChange={() => setEditGlobalEnabled(!editGlobalEnabled)} // Actualiza el estado al cambiar
                  />
                </FormControl> 
              </CardBody>
            </Card>
          </div>
          <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
            <CardHeader p="6px 0px 22px 0px">
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                Roles table
              </Text>
            </CardHeader>
            <CardBody>
              <Table variant="simple" color={textColor}>
                <Thead>
                  <Tr my=".8rem" pl="0px" color="gray.400" >
                    <Th pl="0px" borderColor={borderColor} color="gray.400" >
                      Author
                    </Th>
                    <Th borderColor={borderColor} color="gray.400" >Function</Th>
                    <Th borderColor={borderColor} color="gray.400" >Type</Th>
                    <Th borderColor={borderColor} color="gray.400" >Employed</Th>
                    <Th borderColor={borderColor}></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {roles.map((rol, index, arr) => {
                    return (
                      <RolesRow
                        displayname={rol.displayname}
                        logo={''}
                        email={''}
                        subdomain={''}
                        name={rol.name}
                        status={rol.type}
                        date={rol.createdAt}
                        isLast={false}
                        key={index}
                        index={index}
                        id={rol.id}
                        deleteRowFunc={deleteRow}
                        setTableRolDisplayName={setTableRolDisplayName}
                        setTableRolName = {setTableRolName}
                        //edit = {typeof edit[index] !== "undefined" ? edit[index] == true ? true : false : false}
                        edit = {edit[index]}
                        editRow={editRow}
                        editGlobalEnabled={editGlobalEnabled}
                        handleCapabilities={handleCapabilities}
                      />
                    );
                  })}
                </Tbody>
              </Table>
              <Pagination
                total={total}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
              />
            </CardBody>
          </Card>

        
      
      
          <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap='22px' style={{padding: "10px 0 0 0"}}>
            <Card p='16px'>
              <CardHeader p='12px 5px' mb='12px'>
                <Text fontSize='lg' color={textColor} fontWeight='bold'>
                  Agrega un rol
                </Text>
              </CardHeader>
              <CardBody px='5px'>
                <Flex direction='column'>
                  {alertShow && (
                    <Alert
                      type={alertType}
                      variant="solid"
                      style={{
                        borderRadius: "15px"
                      }}
                    >
                      {alertText}
                    </Alert>
                  )}
                  <Text fontSize='sm' color='gray.400' fontWeight='600' mb='20px'>
                    ACCOUNT
                  </Text>
                  <Flex align='center' mb='20px'>
                    <FormControl id="email">
                      <FormLabel>Name de Rol</FormLabel>
                      <Input 
                        type="text"
                        value={rolName}
                        onChange={(e) => setRolName(e.target.value)} 
                      />
                      <FormHelperText>Ingrese el nombre del rol</FormHelperText>
                    </FormControl>
                  </Flex>
                  <Flex align='center' mb='20px'>
                    <FormControl id="email">
                      <FormLabel>Display Name de Rol</FormLabel>
                      <Input 
                        type="text"
                        value={rolDisplayName}
                        onChange={(e) => setRolDisplayName(e.target.value)} 
                      />
                      <FormHelperText>Ingrese el nombre a mostrar display name</FormHelperText>
                    </FormControl>
                  </Flex>
                  <Flex align='center' mb='20px'>
                    <HStack spacing="24px">
                      <Button colorScheme="blue"
                        onClick={createRol}
                      >Crear</Button>
                    </HStack>
                  
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </Grid>
          
        </Flex>
      ) : (
        <>
          <Flex  pt={{ base: "120px", md: "75px" }}>
            <IconButton
              colorScheme="teal"
              aria-label="Call Fred"
              size="lg"
              icon={<FiArrowLeft />}
              onClick={() => SetRolId('')}
            />
          </Flex>
          <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
            <Capabilities 
              rolId={rolId} 
              rolCaps={rolCaps} 
              createOrUpdateCap={createOrUpdateCap}
              rolDisplayName={rolDisplayName}
            />
          </Flex>
        </>
      )}
      
      
    </>


    
  );
}

export default Roles;
