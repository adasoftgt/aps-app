import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Image } from '@chakra-ui/react';

  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";

  import InvoicePDF from './InvoicePDF_old';

function PrintAps(props){
  const {invoiceItems = []} = props

  // useEffect(() => {
  //   // Carga la información de la factura desde una API o archivo JSON
  //   fetch('https://api.ejemplo.com/facturas/123')
  //     .then((response) => response.json())
  //     .then((data) => setFactura(data));
  // }, []);

  const renderItems = () => {
    
    return invoiceItems.map((item) => (
      <DetalleProducto
        key={item.sku}
        sku={item.sku}
        nombre={item.nombre}
        descripcion={item.descripcion}
        cantidad={item.cantidad}
        bonificacion={item.bonificacion}
        precioUnitario={item.precioUnitario}
      />
    ));
  };

  /*return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Box p={4}>
        <Flex style={{padding: "0 0 10px 0"}}>
          <Card p='16px' >
              <CardBody px='5px' style={{ textAlign: 'center' }}>
                <Encabezado empresa="Mi Empresa" cliente="Juan Pérez" />
              </CardBody>
          </Card>
        </Flex>      
        <Box borderWidth={1} borderRadius={8} p={4}>
          <Flex justifyContent="space-between">
            <Text fontSize="lg">Factura</Text>
            <Text fontSize="md">Fecha: super fecha</Text>
          </Flex>
          <Flex mt={4}>
            <Box width="20%">
              <Text fontWeight="bold">SKU</Text>
            </Box>
            <Box width="30%">
              <Text fontWeight="bold">Nombre</Text>
            </Box>
            <Box width="30%">
              <Text fontWeight="bold">Descripción</Text>
            </Box>
            <Box width="10%">
              <Text fontWeight="bold">Cantidad</Text>
            </Box>
            <Box width="10%">
              <Text fontWeight="bold">Bonificación</Text>
            </Box>
            <Box width="10%">
              <Text fontWeight="bold">Precio Unitario</Text>
            </Box>
            <Box width="10%">
              <Text fontWeight="bold">Total</Text>
            </Box>
          </Flex>
          {renderItems()}
        </Box>
        <PiePagina total={100.25} />
      </Box>
    </Flex>
  );*/
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Box p={4}>
        <Flex style={{padding: "0 0 10px 0"}}>
          <Card p='16px' >
              <CardBody px='5px' style={{ textAlign: 'center' }}>
                < InvoicePDF />
              </CardBody>
          </Card>
        </Flex> 
      </Box> 
    </Flex>    
  )
}


function Encabezado ({ empresa,cliente }) {
  return (
    <>
      <Box>
        <Image src="logo.png" width="100px" />
        <Text fontSize="lg" fontWeight="bold">{empresa}</Text>
      </Box>
      <Box>
        <Text>Cliente: {cliente}</Text>
        <Text>Dirección: Calle 123, Ciudad</Text>
        <Text>Teléfono: 123-456-7890</Text>
      </Box>
    </>
  );
};

function PiePagina ({ total }) {
  return (
    <Box mt={4} borderTopWidth={1} p={4}>
      <Flex justifyContent="space-between">
        <Text>Subtotal:</Text>
        <Text>{total.toFixed(2)}</Text>
      </Flex>
      <Flex mt={2} justifyContent="space-between">
        <Text>IVA:</Text>
        <Text>{0.16 * total.toFixed(2)}</Text>
      </Flex>
      <Flex mt={2} borderTopWidth={1} justifyContent="space-between">
        <Text fontWeight="bold">Total:</Text>
        <Text fontWeight="bold">{total.toFixed(2) + (0.16 * total.toFixed(2))}</Text>
      </Flex>
    </Box>
  );
};

export default PrintAps