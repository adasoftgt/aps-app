
import { TypeDocument } from "models";

function WhatDocument(props){
    const {typeDocument} =props
    
    switch(typeDocument){
      case TypeDocument.INVOICE:
        return(
          <>Factura</>
        )
      case TypeDocument.SHIPPING:
        return(
          <>Envio</>
        )
      case TypeDocument.NOTE:
        return(
          <>Nota</>
        )
      default:
        return null
        
      
  
    }
}

export default WhatDocument