import React from "react";
import { Badge } from "@chakra-ui/react"


function Moneda(props){
    
    const {amount} = props

    const formatCurrency = (amount) => {
        // Convertir a string
        const strAmount = (amount != '0') ? amount.toString() : '0.00'
      
        // Separar la parte entera y decimal
        const [integerPart, decimalPart] = strAmount.split('.');
      
        // Agregar comas a la parte entera
        const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      
        // Formatear la parte decimal (opcional)
        const formattedDecimalPart = decimalPart ? `.${decimalPart.slice(0, 2)}` : '';
      
        // Retornar el monto formateado
        return `${formattedIntegerPart}${formattedDecimalPart}`;
    }

    const amountFormat = formatCurrency(amount)


    return(
        <>
            {amountFormat}
            <Badge ml="1" fontSize="0.8em" style={{ backgroundColor: 'transparent', color: 'inherit' }}>
                GTQ
            </Badge>
        </>
    )
}

export default Moneda