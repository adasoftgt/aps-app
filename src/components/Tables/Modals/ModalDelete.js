import {React,useEffect,useState,useRef} from "react";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    useDisclosure,
    IconButton,
    Tooltip,
  } from '@chakra-ui/react'

  import { useToast } from "@chakra-ui/react";

  import { FiEdit, FiDelete, FiSettings, FiSave, FiArrowLeft, FiDollarSign, FiCheckCircle, FiBox, FiLayers} from "react-icons/fi";

function ModalDelete(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {userName,deleteRow,id,nameModulo} = props
    const finalRef = useRef(null)

    const toast = useToast()
    return (
        <>
          <Tooltip label={`Eliminar ${nameModulo}`}>
            <IconButton  aria-label="Delete" icon={<FiDelete />} onClick={onOpen}/>
          </Tooltip>
          
          <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Eliminar {nameModulo} </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                ¿Estás seguro de que deseas eliminar al {nameModulo} <strong>{userName}</strong>? Esta acción no se puede deshacer.
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Cerrar
                </Button>
                <Button variant='ghost' onClick={() => {
                  deleteRow(id)
                  toast({
                    title: `Delete ${nameModulo}`,
                    description: `We've delete the ${nameModulo} for you.`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
                }}>SI</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default ModalDelete