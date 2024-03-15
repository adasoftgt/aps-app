import {React} from "react"

import { InvoiceStatus } from "models"


function WhatInvoiceStatus( props ){
    const {status} = props
    
      switch(status){
        case InvoiceStatus.DRAFT:
          return(
            <>BORRADOR</>
          )
        case InvoiceStatus.SENT:
          return(
            <>ENVIADO</>
          )
        case InvoiceStatus.PAID:
          return(
            <>PAGADO</>
          )
        case InvoiceStatus.OVERDUE:
          return(
            <>ATRASADO</>
          )
        case InvoiceStatus.CANCELLED:
          return(
            <>CANCELADO</>
          )
        default:
            return null
  
      }
}

export default WhatInvoiceStatus