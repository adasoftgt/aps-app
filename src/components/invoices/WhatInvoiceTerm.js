import {React} from "react"

import { InvoiceTerm } from "models"



function WhatInvoiceTerm( props ){
    const {term} = props
    
      switch(term){
        case InvoiceTerm.PAYMENT_ON_DELIVERY:
            return(
                <>PAGO A LA ENTREGA</>
            )
        case InvoiceTerm.ONE_WEEK:
            return(
                <>UNA SEMANA</>
            )
        case InvoiceTerm.TWO_WEEKS:
            return(
                <>DOS SEMANAS</>
            )
        case InvoiceTerm.THREE_WEEKS:
            return(
                <>TRES SEMANAS</>
            )
        case InvoiceTerm.ONE_MONTH:
            return(
                <>UN onMouseEnter</>
            )
        case InvoiceTerm.TWO_MONTHS:
            return(
                <>DOS MESES</>
            )
        case InvoiceTerm.THREE_MONTHS:
            return(
                <>TRES MESES</>
            )
        case InvoiceTerm.FOUR_MONTHS:
            return(
                <>CUATRO MESES</>
            )
        case InvoiceTerm.FIVE_MONTHS:
            return(
                <>5 MESES</>
            )
        case InvoiceTerm.SIX_MONTHS:
            return(
                <>SEIS MESES</>
            )
        case InvoiceTerm.SEVEN_MONTHS:
            return(
                <>SIETE MESES</>
            )
        case InvoiceTerm.EIGHT_MONTHS:
            return(
                <>OCHO MESES</>
            )
        case InvoiceTerm.NINE_MONTHS:
            return(
                <>NUEVE MESES</>
            )
        case InvoiceTerm.TEN_MONTHS:
            return(
                <>DIEZ MESES</>
            )
        case InvoiceTerm.ELEVEN_MONTHS:
            return(
                <>ONCE MESES</>
            )
        case InvoiceTerm.ONE_YEAR:
            return(
                <>UN AÑO</>
            )
        case InvoiceTerm.TWO_YEAR:
            return(
                <>DOS AÑOS</>
            )
        default:
            return null
  
      }
}

export default WhatInvoiceTerm