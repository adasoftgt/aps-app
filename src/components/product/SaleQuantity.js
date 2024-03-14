
import { IconButton, Input, Tooltip, useMergeRefs, useToast, Badge, useColorModeValue, Text} from "@chakra-ui/react"

import { Stack, HStack, VStack, Box} from "@chakra-ui/react"

import {React, useEffect, useRef, useState} from "react"

import { Batch,BatchStatus,InvoiceItem, BatchChunk, BatchChunkStatus, InvoiceStatus } from "models";

import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { AiOutlineConsoleSql } from "react-icons/ai";

import { GrValidate } from "react-icons/gr";

import { v4 as uuidv4 } from 'uuid';

import { useUsers } from "contexts/UsersContext";

function SaleQuantity(props){
    
    const toast = useToast()

    // ----------------------- PROPS ----------------------------
    const {index,invoiceItemId,productId,onUpdateItem,onQuantity} = props

    
    const [quantity,setQuantity] = useState(0)
    
    const quantityRef = useRef(quantity)

    const [inStock,setInStock] = useState(0)

    const [contador,setContador] = useState(0)
    

    const quantityRequest = useRef(0)
    const quantityBatch = useRef(0)
    const cont = useRef(0)
    
    /**
     * Cantidad de productos en los chunks
     */
    const checkQuantityChunks = async() =>{
        
        const chunks  = await DataStore.query(BatchChunk, 
            c => c.and( c => [
                c.invoiceItemChunksId.eq(invoiceItemId),
                c.status.eq(BatchChunkStatus.SALES_QUANTITY)
            ]),
            { sort: (s) => s.dateCreated(SortDirection.ASCENDING) }
        );
        
        let disponible = 0
        chunks.map( (chunk) => {
            disponible += chunk.quantity
        })
        setQuantity(disponible)
        quantityRef.current = disponible
        onQuantity(disponible)
        
    }

    const checkQuantityBatches = async() =>{
        const batches = await DataStore.query(Batch, 
            c => c.and( c => [
            c.productBatchesId.eq(productId),
            c.quantity.gt(0),
            c.status.eq(BatchStatus.AVAILABLE)
            ]),
            { sort: (s) => s.expiration_date(SortDirection.ASCENDING) }
        );

        let disponible = 0
        batches.map( (batch) => {
            disponible += batch.quantity
        })
        setInStock(disponible)
    }

    useEffect( ()=>{
        checkQuantityChunks()
    },[inStock])

    useEffect( async() =>{
        checkQuantityBatches()
    },[productId])

    useEffect( async() =>{
        //setSaleQuantity(quantity)
        checkQuantityBatches()
    },[quantity])

    useEffect( async() =>{
        checkQuantityChunks()
    },[invoiceItemId])

    useEffect( async() =>{
        checkQuantityChunks()
    },[contador])

    
    
    const handleQuantity = async() =>{
        
        
        if(quantity != ''){
        
            if(quantityRef.current != 0){
                if(quantityRef.current == quantity){
                    toast({
                        title: 'Take product',
                        description: "Esta cantidad esta tomada",
                        status: 'info',
                        duration: 9000,
                        isClosable: true,
                    })
                    return this
                }else{
                    if(quantityRef.current < quantity){
                        quantityRequest.current = quantity - quantityRef.current
                    }else{
                        quantityRequest.current = quantity - quantityRef.current
                    }
                }
               
            }else{
                quantityRequest.current = quantity
            }
            
            if(quantityRequest.current > 0){
            
                const batches = await DataStore.query(Batch, 
                    c => c.and( c => [
                    c.productBatchesId.eq(productId),
                    c.quantity.gt(0),
                    c.status.eq(BatchStatus.AVAILABLE)
                    ]),
                    { sort: (s) => s.expiration_date(SortDirection.ASCENDING) }
                );
                
                let disponible = 0
                batches.map( (batch) => {
                    disponible += batch.quantity
                })

                if(quantityRequest.current  <= disponible){

                
                
                    const invoiceItem = await DataStore.query(InvoiceItem,invoiceItemId)
                    
                    

                    const mapa = async(batch,index) =>{
                        quantityBatch.current = batch.quantity
                        do{
                            if(quantityBatch.current >= quantityRequest.current ){
                                console.log('es mayor')
                                const date = new Date(Date.now()).toUTCString()
                                DataStore.save(
                                    new BatchChunk({
                                        quantity: parseInt(quantityRequest.current),
                                        status: BatchChunkStatus.SALES_QUANTITY,
                                        batch: batch,
                                        item: invoiceItem,
                                        dateCreated: date,
                                    })
                                );

                                
                                quantityBatch.current = quantityBatch.current - quantityRequest.current
                                quantityRequest.current = 0
                                
                                try{
                                
                                    await DataStore.save(
                                        Batch.copyOf(batch, updated => {
                                            updated.quantity = parseInt(quantityBatch.current)
                                        })
                                    );
                                    const batch2 = await DataStore.query(Batch, batch.id);
                                    console.log('batch2',batch2)
                                    
                                }catch(err){
                                    console.log('DataStore.save <=',err)
                                }
                                
                                
                            }else{
                                console.log('es menor')
                                if(quantityBatch.current <= quantityRequest.current ){
                                    DataStore.save(
                                        new BatchChunk({
                                            quantity: parseInt(quantityRequest.current),
                                            status: BatchChunkStatus.SALES_QUANTITY,
                                            batch: batch,
                                            item: invoiceItem
                                        })
                                    );
                                }

                                quantityRequest.current = quantityRequest.current - quantityBatch.current
                                quantityBatch.current = 0

                                try{
                                    await DataStore.save(
                                        Batch.copyOf(batch, updated => {
                                            updated.quantity = parseInt(quantityBatch.current)
                                        })
                                    );
                                    const batch3 = await DataStore.query(Batch, batch.id);
                                    console.log('batch3',batch3)
                                }catch(err){
                                    console.log('DataStore.save <=',err)
                                }
                            }
                            console.log('quantityRequest.current,quantityBatch.current',quantityRequest.current,quantityBatch.current)
                        }while(quantityRequest.current != 0 && quantityBatch.current != 0 )

                        if(quantityRequest.current != 0){
                            index++
                            mapa(batches[index],index)
                        } 
                    }
                    
                    mapa(batches[0],0)

                    setContador(contador + 1)
                    toast({
                        title: 'Take product',
                        description: "We have take product for you.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })

                    // Guardando la referencia
                    quantityRef.current = quantity

                    onQuantity(quantity)
                    // se mando actualizar los modelos
                    //onUpdateItem(index,false,'quantity',quantity)
                    
                    return
                    
                }else{
                    toast({
                        title: 'No products available',
                        description: `Oops we only have ${disponible} products`,
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                    return
                }

            }else{
                // ingresa quantityRequest.current negativo tomar esa consideracion
                //quantityRequest.current = quantityRequest.current * (-1)
                const BatchChunks = await DataStore.query(BatchChunk, 
                    c => c.and( c => [
                        c.invoiceItemChunksId.eq(invoiceItemId),
                        c.status.eq(BatchChunkStatus.SALES_QUANTITY)
                    ]),
                );

                for (let index = 0; index < BatchChunks.length; index++) {
                    const toBatchChunk = BatchChunks[index];
                    const batch = await DataStore.query(Batch, toBatchChunk.batchChunksId)
                    
                    if (batch) {
                        if(quantityRequest.current > toBatchChunk.quantity){
                            quantityRequest.current = quantityRequest.current + toBatchChunk.quantity
                            const updatedPost = await DataStore.save(
                                Batch.copyOf(batch, updated => {
                                    updated['quantity'] = updated.quantity + toBatchChunk.quantity
                                })
                            );
                            if(toBatchChunk){
                                DataStore.delete(toBatchChunk);
                            }
                        }else{
                            const updatedPost = await DataStore.save(
                                Batch.copyOf(batch, updated => {
                                    updated['quantity'] = updated.quantity - quantityRequest.current
                                })
                            );
                            const updatedChunk = await DataStore.save(
                                BatchChunk.copyOf(toBatchChunk, updated => {
                                    updated['quantity'] = updated.quantity + quantityRequest.current
                                })
                            );
                            break;
                        }
                    }
                }
                toast({
                    title: 'Return product',
                    description: "We have return product for you.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            }
            
        }

        
        


    }

    

    return(
        <Controls 
            quantity={quantity}
            checkQuantityBatches={checkQuantityBatches}
            onQuantity={handleQuantity}
            inStock={inStock}
            setQuantity={setQuantity}
        />
        
        
            
            
        
    )
}


function Controls(props){
    const {quantity,checkQuantityBatches,onQuantity,inStock,setQuantity} = props

    const {invoiceDraft} = useUsers()
    
    const textColor = useColorModeValue("gray.500", "white");
    
    switch(invoiceDraft.status ?? ''){
        case InvoiceStatus.DRAFT:
            return(
                <HStack spacing="5px">
                    <Box w="150px" h="40px">
                        <Input
                            //key={uuidv4()} 
                            type="text"
                            placeholder="quantity" 
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value) } 
                            onMouseEnter={checkQuantityBatches}
                            onMouseLeave={checkQuantityBatches}
                        />
                    </Box>
                    <Box w="40px" h="40px">
                        <Tooltip label="Validar existencias">
                            <Box position="relative" display="inline-block">
                                <IconButton icon={<GrValidate />} onClick={onQuantity} onMouseEnter={checkQuantityBatches} onMouseLeave={checkQuantityBatches}/>
                                {inStock > 0 && (
                                    <Badge
                                    position="absolute"
                                    bottom="-3"
                                    right="-3"
                                    colorScheme="yellow"
                                    borderRadius="full"
                                    px="2"
                                    fontSize="xs"
                                    >
                                        {inStock}
                                    </Badge>
                                )}
                            </Box>
                        </Tooltip>
                    </Box>
                </HStack>
            )
        case InvoiceStatus.SENT:
        case InvoiceStatus.PAID:
        case InvoiceStatus.OVERDUE:
        case InvoiceStatus.CANCELLED:
            return (
                <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                    {quantity}
                </Text>
            )
        default:
            return null
    }
}
export default SaleQuantity