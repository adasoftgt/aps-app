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

  Select,
  Stack, HStack, VStack,

  Box,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesProjectRow from "components/Tables/TablesProjectRow";
// table row
import ProductsRow from "components/Tables/ProductsRow";
import React,{useState,useEffect,useRef} from "react";
import { tablesProjectData, tablesTableData } from "variables/general";
import Pagination from "components/Pagination/Paginacion.js"
import Capabilities from "components/Capabilities/Capabilities.js"

import { Product, ProductStatus, ProductPrice, Category, Rol } from "models";

import {USER_OPERATION} from "structures"


// Amplify datastore
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';




import { useToast } from '@chakra-ui/react'

// ICONS FI
import { FiArrowLeft,FiPlusSquare, FiDollarSign, FiEdit} from "react-icons/fi";

import { useTable } from "contexts/TableContext";
import { useAuth } from "contexts/AuthContext";
import { jsx } from "@emotion/react";

import ListBatch from "components/product/ListBatch";



// Alertas
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"


function Products() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const borderRoleColor = useColorModeValue("white", "transparent");
  const bgRole = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");

  

  //alert
  const [alertShow,setAlertShow] = useState(false)
  const [alertText,setAlertText] = useState('')
  const [alertType,setAlertType] = useState('success')

  /**
   * @property {Array} products Lista de productos
   */
  const [products, setProducts] = useState([]);

  const [productName, setProductName] = useState('');
  const productNameRef = useRef(productName)
  const [productSku, setProductSku] = useState('');
  const productSkuRef = useRef(productSku)
  const [productDescription, setProductDescription] = useState('');
  const productDescriptionRef = useRef(productDescription)
  const [productCategory, setProductCategory] = useState('');
  const productCategoryRef = useRef(productCategory)
  const [productQuantity, setProductQuantity] = useState(0);
  const productQuantityRef = useRef(productQuantity)
  const [productStatus, setProductStatus] = useState(ProductStatus.INACTIVE);
  const productStatusRef = useRef(productStatus)
  const [productPriceUnit, setProductPriceUnit] = useState(0);
  const productPriceUnitRef = useRef(productPriceUnit)
  const [productPriceOffer, setProductPriceOffer] = useState(0);
  const productPriceOfferRef = useRef(productPriceOffer)
  const [productPriceEt, setProductPriceEt] = useState(0);
  const productPriceEtRef = useRef(productPriceEt)
  const [productPricePharmacy, setProductPricePharmacy] = useState(0);
  const productPricePharmacyRef = useRef(productPricePharmacy)

  const [createProductStatus, setCreateProductStatus] = useState(false)
  const [listBatchStatus, setListBatchStatus] = useState(false)
  const [createBatchStatus, setCreateBatchStatus] = useState(false)

  const toast = useToast()



  const { 
    editRow,
    edit,setEdit,
    index,setIndex, 
    total, setTotal,
    currentPage, setCurrentPage, 
    pageSize,
    editGlobalEnabled,setEditGlobalEnabled,
    tableRolName,setTableRolName,
    tableRolDisplayName,setTableRolDisplayName,
    settingStatus,setSettingStatus,
    idCurrentRow

  } = useTable()

  // Lista de capacidades desde el contexto de useAuth
  const {
    capabilities,
    userId
  } = useAuth()

  
  const getProducts = async(page = 0,limit = 0) => {
    try{  
      const pageOfset = page - 1

      
      const products = await DataStore.query(Product, Predicates.ALL, {
        page: pageOfset,
        limit: limit
      })

      setProducts(products)
      
      //const price = await products[0].price
      /*const price = await DataStore.query(ProductPrice, 
        c => c.productPriceProductId.eq(products[0].id),
        { sort: (s) => s.id(SortDirection.DESCENDING),limit: 1 }
      );*/
      
      
      
      
    }catch(err){
      console.log('Error: recolectar productos',err)
    }
  }

  
  useEffect( async() => {
    //getProducts() // Tarea de observacion
    await DataStore.start();
    getProducts(currentPage,pageSize) // pimera pagina
  }, []);

  

  /**
   * Obtener la lista de usuarios cuando cambie el useState currentPage
   */
  useEffect( async() => {
    getProducts(currentPage,pageSize)
  },[currentPage])

  /**
   * Obtener la lista de usuarios cuando cambie el useState total
   * @property {int} total es el total de elemetos que se van a paginar
   */
  useEffect( async() => {
    getProducts(currentPage,pageSize)
  },[total])

  /**
   * @property {useRef} idCurrentRow Esta propiedad es un useRef utiliza la propiedad current para obtener el valor
   */


  const fillInputsEdit = async() =>{
    return new Promise( async(resolve,reject) =>{
      
      if(idCurrentRow.current){
        try{
          const products = await DataStore.query(
            Product, 
            p => p.id.eq(idCurrentRow.current)
          );

          const product = products[0]
          
          
          const prices = await DataStore.query(ProductPrice, 
            c => c.productPriceProductId.eq(product.id),
            { sort: (s) => s.dateCreated(SortDirection.DESCENDING),limit: 1 }
          );

          const price = prices[0]

          setProductName(product.name)
          productNameRef.current = product.name
          setProductSku(product.sku)
          productSkuRef.current = product.sku
          setProductDescription(product.description)
          productDescriptionRef.current = product.description
          //setProductCategory(product.category)
          setProductStatus(product.status)
          productStatusRef.current = product.status
          setProductPriceUnit(price.unit)
          productPriceUnitRef.current = price.unit
          setProductPriceOffer(price.offer)
          productPriceOfferRef.current = price.offer
          setProductPriceEt(price.et)
          productPriceEtRef.current = price.et
          setProductPricePharmacy(price.pharmacy)
          productPricePharmacyRef.current = price.pharmacy
          
          setCreateProductStatus(true)
          setSettingStatus(true)
          resolve()
        }catch(err){
          console.log(err)
          reject(err);
        }

        
      }


      
    })
  }


  const verifyChangeDataProduct = (updated) =>{
    if(productName != productNameRef.current){
      return true
    }
    
    if(productSku != productSkuRef.current){
      return true
    }

    if(productDescription != productDescriptionRef.current){
      return true
    }
    
    if(productStatus != productStatusRef.current){
      return true
    }

    return false
  }

  const changeProductUpdate = (updated) =>{
    if(productName != productNameRef.current){
      updated['name'] = productName
    }
    
    if(productSku != productSkuRef.current){
      updated['sku'] = productSku
    }

    if(productDescription != productDescriptionRef.current){
      updated['description'] = productDescription
    }
    
    if(productStatus != productStatusRef.current){
      updated['status'] = productStatus
    }

    return updated

  }
  
  const verifyChangePriceProduct = () =>{
    
    if(productPriceUnit != productPriceUnitRef.current){
      console.log('unit',productPriceUnit,productPriceUnitRef.current)
      return true
    }
    if(productPriceOffer != productPriceOfferRef.current){
      console.log('offer')
      return true
    }
    
    if(productPriceEt != productPriceEtRef.current){
      console.log('et')
      return true
    }
    
    if(productPricePharmacy != productPricePharmacyRef.current){
      console.log('pharmacy')
      return true
    }

    return false

  }

  /*useEffect( async() =>{
    const listaProductStatus = (createProductStatus == true || settingStatus == true) ? false : true
    
    if(listaProductStatus){
      await inputsClear();
    }
  },[settingStatus,createProductStatus])*/
  
  const inputsClear = () => {
    return new Promise( async(resolve,reject) =>{
      setProductName('')
      setProductSku('')
      setProductDescription('')
      setProductCategory('')
      setProductQuantity(0)
      setProductStatus(ProductStatus.INACTIVE)
      setProductPriceUnit(0)
      setProductPriceOffer(0)
      setProductPriceEt(0)
      setProductPricePharmacy(0)
      

      getProducts(currentPage,pageSize)
      
      // limpiando seleccion
      idCurrentRow.current = ''
      setCreateProductStatus(false)
      setSettingStatus(false)
      
      resolve()
    })
    
  }

  /**
   * Crear producto
   */
  const createProduct = async() => {
    try{
      
      const newProduct = await DataStore.save(
        new Product({
          sku: productSku,
          name: productName,
          description: productDescription,
          category: new Category({
            name: 'Unica'
          }),
          quantity: productQuantity,
          userId: userId,
          status: productStatus
        })
      );

      const date = new Date(Date.now()).toUTCString()
      const newPrice = DataStore.save(
        new ProductPrice({
          unit: parseFloat(productPriceUnit),
          offer: parseFloat(productPriceOffer),
          et: parseFloat(productPriceEt),
          pharmacy: parseFloat(productPricePharmacy),
          dateCreated: date ,
          userId: userId,
          product: newProduct
        })
      )

      toast({
        title: 'Create product',
        description: "We've created the product for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

      


      await inputsClear()

      
    

      
    }catch(err){
      console.log('Err al crear el product',err)
    }
  }

  const updateProduct = async() => {
    try{
      const product = await DataStore.query(Product, idCurrentRow.current);
      let message = false
      if (product) {
        if(verifyChangeDataProduct()){
            message = true
            const updatedPost = await DataStore.save(
              Product.copyOf(product, updated => {
                updated = changeProductUpdate(updated)
              })
            );
            getProducts(currentPage,pageSize)
          
        }

      
        if(verifyChangePriceProduct()){
          message = true
          const date = new Date(Date.now()).toUTCString()
          const newPrice = DataStore.save(
            new ProductPrice({
              unit: parseFloat(productPriceUnit),
              offer: parseFloat(productPriceOffer),
              et: parseFloat(productPriceEt),
              pharmacy: parseFloat(productPricePharmacy),
              dateCreated: date,
              userId: userId,
              product: product
            })
          )
        }
      }
      if(message){
        toast({
          title: 'Updated product',
          description: "We've updated the product for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }
    }catch(err){
      console.log(err)
    }
  }
  
  

 


  

  /**
   * Eliminar una object de DataStore de amplify
   * @param {String} id Identificador de registro de DataStore aws amplify
   */
  const deleteRow = async(id) => {
    
    
    const prices = await DataStore.query(ProductPrice, 
      c => c.productPriceProductId.eq(id)
    )
    
    if(prices){
      prices.map( (toPrice, index, arr) =>{
        if (toPrice) {
          DataStore.delete(toPrice);
        }
      })
    }

    const toDelete = await DataStore.query(Product, id);
    
    if (toDelete) {
      DataStore.delete(toDelete);
      // Se va cambiar total para renderizar de nuevo y cargar objetos restantes
      getProducts(currentPage,pageSize)
      
      toast({
        title: 'Delete product',
        description: "We've deleted the product for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      
    }
  }

  
  const isManageOptions = true//capabilities.some(capacity => caps.includes(capacity));


    
  return (
    
    <>
      
      {isManageOptions ? (
         <>
            {!createProductStatus ? (
              <> 
                {!listBatchStatus ? (
                  <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
                    <Flex style={{padding: "0 0 10px 0"}}>
                      <Card p='16px' >
                        
                          <CardBody px='5px'>
                            <FormControl display="flex" alignItems="center">
                              <FormLabel htmlFor="email-alerts" mb="0">
                                Necesitas editar
                              </FormLabel>
                              <Switch 
                                id="email-alerts" 
                                isChecked={editGlobalEnabled} // Vincula el estado al Switch
                                onChange={() => setEditGlobalEnabled(!editGlobalEnabled)} // Actualiza el estado al cambiar
                              />
                            </FormControl>
                            <FormControl display="flex" alignItems="center">
                              <FormLabel htmlFor="email-alerts" mb="0">
                                Crear Producto
                              </FormLabel>
                              <IconButton aria-label="Search database" onClick={() => setCreateProductStatus(!createProductStatus)} icon={<FiPlusSquare />} />
                            </FormControl>  
                            
                          </CardBody>  
                        
                        
                      </Card>
                    </Flex>
                      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
                        <CardHeader p="6px 0px 22px 0px">
                          <Text fontSize="xl" color={textColor} fontWeight="bold">
                            Products table
                          </Text>
                        </CardHeader>
                        
                        <CardBody>
                          <Table variant="simple" color={textColor}>
                            <Thead>
                              <Tr my=".8rem" pl="0px" color="gray.400" >
                                <Th pl="0px" borderColor={borderColor} color="gray.400" >
                                  SKU
                                </Th>
                                <Th borderColor={borderColor} color="gray.400" >Name</Th>
                                <Th borderColor={borderColor} color="gray.400" >Description</Th>
                                <Th borderColor={borderColor} color="gray.400" >Category</Th>
                                <Th borderColor={borderColor} color="gray.400" >Quantity</Th>
                                <Th borderColor={borderColor} color="gray.400" >Estatus</Th>
                                <Th borderColor={borderColor} color="gray.400" >Price</Th>
                                <Th borderColor={borderColor}>Quantity Batches</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              
                              {products.map((product, index, arr) => {
                                return (
                                  <ProductsRow
                                    id={product.id}
                                    index={index}
                                    name={product.name}
                                    sku={product.sku}
                                    description={product.description}
                                    category={product.category}
                                    //quantity={product.quantity}
                                    status={product.status}
                                    price={product.price} // model
                                    batches={product.batches}
                                    
                                    // functions
                                    deleteRowFunc={deleteRow}
                                    fillInputsEdit={fillInputsEdit}
                                    setListBatchStatus={setListBatchStatus}
                                    
                                    isLast={false}
                                    logo={''}
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
                    
                  </Flex>
                ):(
                  <ListBatch
                    createBatchStatus={createBatchStatus}
                    setCreateBatchStatus={setCreateBatchStatus}
                    listBatchStatus={listBatchStatus}
                    setListBatchStatus={setListBatchStatus}
                  />
                )}
              </>
            ) : (
              <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
                <Flex style={{padding: "0 0 10px 0"}}>
                    <Card p='16px' >
                      <CardBody px='5px'>
                        <FormControl display="flex" alignItems="center">
                          <FormLabel htmlFor="email-alerts" mb="0">
                            Regresar a lista de productos
                          </FormLabel>
                          <IconButton aria-label="Search database" 
                            onClick={ async() => {
                              await inputsClear()
                            }} 
                            icon={<FiArrowLeft />} />
                        </FormControl>  
                        
                      </CardBody>
                    </Card>
                  </Flex>
                <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap='22px' style={{padding: "10px 0 0 0"}}>
                  <Card p='16px'>
                    <CardHeader p='12px 5px' mb='12px'>
                      <Text fontSize='lg' color={textColor} fontWeight='bold'>
                        Agrega un pruducto
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
                          PRODUCTO
                        </Text>
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Name Product</FormLabel>
                            <Input 
                              type="text"
                              value={productName}
                              onChange={(e) => setProductName(e.target.value)} 
                            />
                            <FormHelperText>Ingrese el nombre del proeducto</FormHelperText>
                          </FormControl>
                        </Flex>
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>SKU</FormLabel>
                            <Input 
                              type="text"
                              value={productSku}
                              onChange={(e) => setProductSku(e.target.value)} 
                            />
                            <FormHelperText>Ingrese el SKU</FormHelperText>
                          </FormControl>
                        </Flex>
                      
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Description</FormLabel>
                            <Input 
                              type="text"
                              value={productDescription}
                              onChange={(e) => setProductDescription(e.target.value)} 
                            />
                            <FormHelperText>Ingrese el SKU</FormHelperText>
                          </FormControl>
                        </Flex>
                        
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Category</FormLabel>
                            <Input 
                              type="text"
                              value={productCategory}
                              onChange={(e) => setProductCategory(e.target.value)} 
                            />
                            <FormHelperText>Ingrese la categoria</FormHelperText>
                          </FormControl>
                        </Flex>
                        
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Status</FormLabel>
                            <Select placeholder="Select country" value={productStatus} onChange={(event) => setProductStatus(event.target.value)}>
                              <option value={ProductStatus.AVAILABLE}>{ProductStatus.AVAILABLE}</option>
                              <option value={ProductStatus.ACTIVE}>{ProductStatus.ACTIVE}</option>
                              <option value={ProductStatus.INACTIVE}>{ProductStatus.INACTIVE}</option>
                              <option value={ProductStatus.SOLDOUT}>{ProductStatus.SOLDOUT}</option>
                              <option value={ProductStatus.BOOKED}>{ProductStatus.BOOKED}</option>
                              <option value={ProductStatus.DISCONTINUED}>{ProductStatus.DISCONTINUED}</option>
                              <option value={ProductStatus.INOFFER}>{ProductStatus.INOFFER}</option>
                              <option value={ProductStatus.BEATEN}>{ProductStatus.BEATEN}</option>
                              <option value={ProductStatus.STAGED}>{ProductStatus.STAGED}</option>
                            </Select>
                            <FormHelperText>Ingrese el estado del producto</FormHelperText>
                          </FormControl>
                        </Flex>
                        
                      </Flex>
                    </CardBody>
                  </Card>
                  <Card p='16px'>
                    <CardHeader p='12px 5px' mb='12px'>
                      <Text fontSize='lg' color={textColor} fontWeight='bold'>
                        Precios
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
                          PRECIOS DE PRODUCTO
                        </Text>
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Precio unitario</FormLabel>
                            <Input 
                              type="text"
                              value={productPriceUnit}
                              onChange={(e) => setProductPriceUnit(e.target.value)} 
                            />
                            <FormHelperText>Ingrese el precio unitario del producto</FormHelperText>
                          </FormControl>
                        </Flex>
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Precio en oferta</FormLabel>
                            <Input 
                              type="text"
                              value={productPriceOffer}
                              onChange={(e) => setProductPriceOffer(e.target.value)} 
                            />
                            <FormHelperText>Ingrese el precio en oferta</FormHelperText>
                          </FormControl>
                        </Flex>
                      
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Precio ET</FormLabel>
                            <Input 
                              type="text"
                              value={productPriceEt}
                              onChange={(e) => setProductPriceEt(e.target.value)} 
                            />
                            <FormHelperText>Ingrese el precio ET</FormHelperText>
                          </FormControl>
                        </Flex>
                        
                        <Flex align='center' mb='20px'>
                          <FormControl id="email">
                            <FormLabel>Precio farmacia</FormLabel>
                            <Input 
                              type="text"
                              value={productPricePharmacy}
                              onChange={(e) => setProductPricePharmacy(e.target.value)} 
                            />
                            <FormHelperText>Ingrese el precio farmacia</FormHelperText>
                          </FormControl>
                        </Flex>
                        
                        
                        
                        {settingStatus ?(
                          <Flex align='center' mb='20px'>
                            <HStack spacing="24px">
                              <Button colorScheme="blue"
                                onClick={updateProduct}
                              >Actualizar</Button>
                            </HStack>
                        </Flex>
                        ):(
                          <Flex align='center' mb='20px'>
                          <HStack spacing="24px">
                            <Button colorScheme="blue"
                              onClick={createProduct}
                            >Crear</Button>
                          </HStack>
                        
                        </Flex>
                        )}
                        
                      </Flex>
                    </CardBody>
                  </Card>
                  
                </Grid>
              </Flex>
            )}
        </>
      ) : (
        <>
          <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
            No tiene acceso
          </Flex>
        </>
      )}
     
      
      
    </>


    
  );
}


export default Products;
