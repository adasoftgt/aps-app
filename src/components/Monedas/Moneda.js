import React from "react";
import { Badge } from "@chakra-ui/react"



function Moneda(props){
    
    const {amount} = props

    function currencyFormat(num) {
        try{
            const strAmount = (num != '0' ) ? Number.parseFloat(num) : '0.00'
            return strAmount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }catch(err){
            return '0.00'
        }
    }
    /*const formatCurrency = (amount) => {
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

    const amountFormat = formatCurrency(amount)*/
    const amountFormat = currencyFormat(amount)

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