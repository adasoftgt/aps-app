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
    useToast,
  } from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

// Pagination
import Pagination from "components/Pagination/Paginacion.js"

import {React, useEffect, useState, useMemo, useRef} from "react";
import { useTable } from "contexts/TableContext";
import { useAuth } from "contexts/AuthContext";

import ProductsBatchRow from "components/Tables/ProductsBatchRow";

import { Product, Batch, BatchStatus } from "models";

import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';

// ICONS FI
import { FiArrowLeft,FiPlusSquare, FiDollarSign, FiEdit} from "react-icons/fi";




function ListBatch(props){

    const toast = useToast()
    
    const {
        setCreateBatchStatus,
        createBatchStatus,
        listBatchStatus,
        setListBatchStatus,
    } = props

    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const borderRoleColor = useColorModeValue("white", "transparent");
    const bgRole = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");


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

    const {
        userId
    } = useAuth()

    const [batches,setBatches] = useState([])

    const [batchSku,setBatchSku] = useState('')
    const batchSkuRef = useRef(batchSku)
    const [batchQuantity,setBatchQuantity] = useState(0)
    const batchQuantityRef = useRef(batchQuantity)
    const [day,setDay] = useState('1')
    const dayRef = useRef(day)
    const [month,setMonth] = useState('')
    const monthRef = useRef(month)
    const [year,setYear] = useState('')
    const yearRef = useRef(year)

    const [status,setStatus] = useState(BatchStatus.OPEN)
    const statusRef = useRef(status)

    const [updateBatchStatus,setUpdateBatchStatus] = useState(false)

    const productBatchesId = useRef(0)
    
    const days = useMemo( () =>{
        const array = [];

        for (let i = 1; i <= 31; i++) {
            array.push(i);
        }
        return (
            <>
                {array.map( (day) => {
                    return(
                        <option value={day}>{day}</option>
                    )    
                })}
                
            </>
        )
    },[])

    const months = useMemo( () =>{
        const array = [];

        for (let i = 1; i <= 12; i++) {
            array.push(i);
        }
        return (
            <>
                {array.map( (month) => {
                    return(
                        <option value={month}>{month}</option>
                    )    
                })}
                
            </>
        )
    },[])

    const years = useMemo( () => {
        const year = new Date().getFullYear()
        const nextFiveYears = Array.from({ length: 5 }).map((_, i) => year + i);
        
        return (
            <>
                {nextFiveYears.map( (year) => {
                    return(
                        <option value={year}>{year}</option>
                    )    
                })}
                
            </>
        )
        
    },[])


    const batchStatus = useMemo( () =>{
        const array = Object.keys(BatchStatus)
        
        return (
            <>
                {array.map( (batchEstado) => {
                    return(
                        <option value={batchEstado}>{batchEstado}</option>
                    )    
                })}
                
            </>
        )
    },[])

    


    const getBatches = async(page = 0,limit = 0) => {
        try{  
          const pageOfset = page - 1
    
          
          const batches = await DataStore.query(Batch, b => b.productBatchesId.eq(idCurrentRow.current), {
            page: pageOfset,
            limit: limit
          })
    
          setBatches(batches)
          
          //const price = await products[0].price
          /*const price = await DataStore.query(ProductPrice, 
            c => c.productPriceProductId.eq(products[0].id),
            { sort: (s) => s.id(SortDirection.DESCENDING),limit: 1 }
          );*/
          
          
          
          
        }catch(err){
          console.log('Error: recolectar productos',err)
        }
    }


    useEffect( () =>{
        getBatches(currentPage,pageSize)
        
        return () =>{
            
        }
    },[])

    const createBatch = async() =>{
        try{
            const product = await DataStore.query(Product, idCurrentRow.current);
            const newBatch = DataStore.save(
                new Batch({
                    sku: batchSku,
                    expiration_date: new Date(year, month - 1 , day).toDateString(),
                    day: day,
                    month: month,
                    year: year,
                    quantity: parseInt(batchQuantity),
                    status: status,
                    userId: userId,
                    product: product,
                    locked: false
                })
            )

            /*const updatedPost = await DataStore.save(
                Product.copyOf(product, updated => {
                    updated['quantity'] = updated['quantity'] + parseInt(batchQuantity)
                })
            );*/

            toast({
                title: 'Created batch',
                description: "We've created the batch for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })

            await clearInputs()
        }catch(err){
            toast({
                title: 'An error occurred.',
                description: "Unable to create Batch.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            console.log(err)
        }
        
    }

    const checkModifyInput = () =>{
        if(batchSku != batchSkuRef.current){
            return true
        }
        
        if(batchQuantity != batchQuantityRef.current){
            return true
        }
        
        if(status != statusRef.current){
            return true
        }
        
        if(day != dayRef.current){
            return true
        }

        if(month != monthRef.current){
            return true
        }

        if(year != yearRef.current){
            return true
        }

        return false
    }
    
    const changeBatchUpdate = (updated) =>{
        let changeDate = false
        if(batchSku != batchSkuRef.current){
            updated['sku'] = batchSku
        }
        
        if(batchQuantity != batchQuantityRef.current){
            updated['quantity'] = parseInt(batchQuantity)
        }
        
        if(status != statusRef.current){
            updated['status'] = status
        }
        
        if(day != dayRef.current){
            changeDate = true
            updated['day'] = day
        }

        if(month != monthRef.current){
            changeDate = true
            updated['month'] = month
        }

        if(year != yearRef.current){
            changeDate = true
            updated['year'] = year
        }

        if(changeDate){
            updated['expiration_date'] = new Date(year, month - 1 , day).toDateString()
        }
        

    }


    const updateBatch = async() => {
        
        
        const batch = await DataStore.query(Batch, idCurrentRow.current);

        const updatedPost = await DataStore.save(
            Batch.copyOf(batch, updated => {
              updated = changeBatchUpdate(updated)
            })
        );

        //await clearInputs()

        toast({
            title: 'Updated batch',
            description: "We've updated the batch for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })

    }

    const clearInputs = () =>{
        return new Promise( (resolve,reject) => {
            setBatchSku('')
            setBatchQuantity(0)
            setStatus(BatchStatus.OPEN)
            setDay('')
            setMonth('')
            setYear('')
            
            resolve();
        })
    }

  

    const fillInputsEdit = async() =>{
        return new Promise( async(resolve,reject) =>{
            if(idCurrentRow.current){
                try{
                    
                    const batches = await DataStore.query(Batch, 
                        c => c.id.eq(idCurrentRow.current),
                        { sort: (s) => s.expiration_date(SortDirection.ASCENDING) }
                    );
                    
                    const batch = batches[0]

                    setBatchSku(batch.sku)
                    setBatchQuantity(batch.quantity)
                    setStatus(batch.status)
                    setDay(batch.day)
                    setMonth(batch.month)
                    setYear(batch.year)

                      
                    setCreateBatchStatus(true)
                    setUpdateBatchStatus(true)
                    resolve()



                }catch(err){
                    console.log(err)
                    reject(err)
                }
            }
        } )
    }

    

    const handleCreateBatch = async() =>{
        // save identificator the product
        productBatchesId.current = idCurrentRow.current
        await clearInputs()
        setCreateBatchStatus(true)
    }

    const handleDeleteRow = async(id) =>{
        const batch = await DataStore.query(Batch, id)
        DataStore.delete(batch)
        getBatches(currentPage,pageSize)
        toast({
            title: 'Delete batch',
            description: "We've delete the batch for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    /**
     * Regresar la lista de batch del producto seleccionado
     */
    const handleReturnListBatch = async() =>{
        idCurrentRow.current = productBatchesId.current
        setCreateBatchStatus(!createBatchStatus)
        getBatches(currentPage,pageSize)
    }

    
    return(
        <>
            {!createBatchStatus ? (
                <>
                    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
                        <Flex style={{padding: "0 0 10px 0"}}>
                            <Card p='16px' >
                            
                                <CardBody px='5px'>
                                    <FormControl display="flex" alignItems="center">
                                    <FormLabel htmlFor="email-alerts" mb="0">
                                        Return to products
                                    </FormLabel>
                                    <IconButton aria-label="Search database" onClick={() => setListBatchStatus(!listBatchStatus)} icon={<FiArrowLeft />} />
                                    </FormControl>

                                    <FormControl display="flex" alignItems="center">
                                    <FormLabel htmlFor="email-alerts" mb="0">
                                        Create Batch
                                    </FormLabel>
                                    <IconButton aria-label="Search database" onClick={handleCreateBatch} icon={<FiPlusSquare />} />
                                    </FormControl>    
                                    
                                </CardBody>
                            </Card>
                        
                        
                        </Flex>
                    </Flex>
                    <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
                        <CardHeader p="6px 0px 22px 0px">
                            <Text fontSize="xl" color={textColor} fontWeight="bold">
                            Batch table
                            </Text>
                        </CardHeader>
                        
                        <CardBody>
                            <Table variant="simple" color={textColor}>
                            <Thead>
                                <Tr my=".8rem" pl="0px" color="gray.400" >
                                <Th pl="0px" borderColor={borderColor} color="gray.400" >
                                    SKU
                                </Th>
                                <Th borderColor={borderColor} color="gray.400" >Due date</Th>
                                <Th borderColor={borderColor} color="gray.400" >Quantity</Th>
                                <Th borderColor={borderColor} color="gray.400" >Status</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {batches.map((batch, index, arr) => {
                                    return(
                                        <ProductsBatchRow 
                                            id={batch.id}
                                            sku={batch.sku}
                                            dateDue={batch.day.toString() + "/" + batch.month.toString() + "/" + batch.year.toString()}
                                            quantity={batch.quantity}
                                            status={batch.status}

                                            // functions
                                            updateBatchStatus={updateBatchStatus}
                                            setUpdateBatchStatus={setUpdateBatchStatus}
                                            fillInputsEdit={fillInputsEdit}
                                            deleteRowFunc={handleDeleteRow}
                                        />
                                    )      
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
                </>
            ):(
                <>
                    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
                        <Flex style={{padding: "0 0 10px 0"}}>
                            <Card p='16px' >
                                <CardBody px='5px'>
                                    <FormControl display="flex" alignItems="center">
                                    <FormLabel htmlFor="email-alerts" mb="0">
                                        Regrear a batches
                                    </FormLabel>
                                    <IconButton aria-label="Search database" onClick={handleReturnListBatch} icon={<FiArrowLeft />} />
                                    </FormControl>
                                </CardBody>
                            </Card>
                        
                        
                        </Flex>
                    </Flex>
                    
                   
                    <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap='22px' style={{padding: "10px 0 0 0"}}>
                        <Card p='16px'>
                            <CardHeader p='12px 5px' mb='12px'>
                            <Text fontSize='lg' color={textColor} fontWeight='bold'>
                                Agrega un lote
                            </Text>
                            </CardHeader>
                            <CardBody px='5px'>
                            <Flex direction='column'>
                                <Text fontSize='sm' color='gray.400' fontWeight='600' mb='20px'>
                                
                                </Text>
                                <Flex align='center' mb='20px'>
                                    <FormControl id="email">
                                        <FormLabel>SKU</FormLabel>
                                        <Input 
                                            type="text"
                                            value={batchSku}
                                            onChange={(e) => setBatchSku(e.target.value)} 
                                        />
                                        <FormHelperText>Ingrese el SKU/codigo de lote</FormHelperText>
                                    </FormControl>
                                </Flex>
                                <Text fontSize='sm' color='gray.400' fontWeight='600' mb='20px'>
                                    Cantidad de productos
                                </Text>
                                <Flex align='center' mb='20px'>
                                    <FormControl id="email">
                                        <FormLabel>Quantity</FormLabel>
                                        <Input 
                                            type="text"
                                            value={batchQuantity}
                                            onChange={(e) => setBatchQuantity(e.target.value)} 
                                        />
                                        <FormHelperText>Ingrese el SKU/codigo de lote</FormHelperText>
                                    </FormControl>
                                </Flex>
                                <Text fontSize='sm' color='gray.400' fontWeight='600' mb='20px'>
                                    Fecha de vencimiento del lote
                                </Text>
                                <Flex align='center' mb='20px'>
                                    <FormControl id="email">
                                        <FormLabel>Day</FormLabel>
                                        <Select placeholder="Select Day" value={day} onChange={(event) => setDay(event.target.value)}>
                                            {days}
                                        </Select>
                                        <FormHelperText>Ingrese el dia</FormHelperText>
                                    </FormControl>
                                </Flex>
                                <Flex align='center' mb='20px'>
                                    <FormControl id="email">
                                        <FormLabel>Month</FormLabel>
                                        <Select placeholder="Select Month" value={month} onChange={(event) => setMonth(event.target.value)}>
                                            {months}
                                        </Select>
                                        <FormHelperText>Ingrese el mes</FormHelperText>
                                    </FormControl>
                                </Flex>
                                <Flex align='center' mb='20px'>
                                    <FormControl id="email">
                                        <FormLabel>Year</FormLabel>
                                        <Select placeholder="Select Year" value={year} onChange={(event) => setYear(event.target.value)}>
                                            {years}
                                        </Select>
                                        <FormHelperText>Ingrese el año</FormHelperText>
                                    </FormControl>
                                </Flex>
                                
                                <Flex align='center' mb='20px'>
                                    <FormControl id="email">
                                        <FormLabel>Estado</FormLabel>
                                        <Select placeholder="Select status" value={status} onChange={(event) => setStatus(event.target.value)}>
                                            {batchStatus}
                                        </Select>
                                        <FormHelperText>Ingrese el año</FormHelperText>
                                    </FormControl>
                                </Flex>
                                
                            
                                {!updateBatchStatus ? (
                                    <Flex align='center' mb='20px'>
                                        <HStack spacing="24px">
                                        <Button colorScheme="blue"
                                            onClick={createBatch}
                                        >Create</Button>
                                        </HStack>
                                    </Flex>
                                ):(
                                    <Flex align='center' mb='20px'>
                                        <HStack spacing="24px">
                                        <Button colorScheme="blue"
                                            onClick={updateBatch}
                                        >Update</Button>
                                        </HStack>
                                    </Flex>
                                )}
                                
                                
                                
                                
                                
                                
                            </Flex>
                            </CardBody>
                        </Card>
                    </Grid>
                </>
            )}
        </>
    )
}

export default ListBatch;