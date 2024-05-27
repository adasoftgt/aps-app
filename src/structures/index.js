
/**
 * Objeto de ejemplo de payload de cognito
 */
const USER = {
    "Username": "adasoftgt",
    "Attributes": [
        {
            "Name": "sub",
            "Value": "9afc5c60-5826-4e97-ae58-a11883be9f33"
        },
        {
            "Name": "email_verified",
            "Value": "true"
        },
        {
            "Name": "email",
            "Value": "adasoftgt@gmail.com"
        }
    ],
    "UserCreateDate": "2024-01-06T01:08:00.061Z",
    "UserLastModifiedDate": "2024-01-06T01:08:17.050Z",
    "Enabled": true,
    "UserStatus": "CONFIRMED"
}


/**
 * Atributos del usuario dentro de cognito
 * @typedef UserAttributes
 * @property {String} profile El ID de perfil del usuario en Cognito.
 * @property {String} email El correo electrónico del usuario en Cognito.
 */
const USER_ATTRIBUTES = {
    profile:"",
    email:"",
}

/**
 * Esta es una estructura que se envia en cada fila de tabla al recuperar la lista de usuarios
 * @typedef {Object} UserOperation
 * @property {UserAttributes} attributes son los atributos recolectados del usuario de cognito 
 * @property {string} username nombre de usuario dentro de cognito
 * @property {string} UserStatus nombre de usuario dentro de cognito :: CONFIRMED | 
 * @property {boolean} Confirmed compara UserStatus y verifica si viene CONFIRMED devuelve true or false
 * @property {boolean} Enabled Estado de enabled o disbled de usuario para poder ingresar a la plataforma
 * @property {String} useId  codigo unico de id identificadion de usuario
 */
const USER_OPERATION = {
    attributes: "",
    username: "",
    UserStatus: "",
    Confirmed: "",
    Enabled: "",
    userId: ""
}


/**
 * Estrutura de operacion de producto
 */
const PRODUCT_OPERATION =  {

}


// CONTEXTOS










const CTX_PROFILE_ADMIN = {
    id: "", // identificador de usuario administrador
    name: "PROFILE_ADMIN",
    isOpen: false,
}

const CTX_PROFILE_CLIENT ={
    id: "", // identificador de cliete
    name: "PROFILE_CLIENT",
    opened_by: CTX_PROFILE_ADMIN,
    isOpen: false,
}


const CTX_PROFILE_COLLECTOR = {
    id: "", // identificador de collections
    name: "PROFILE_COLLECTIONS",
    opened_by: CTX_PROFILE_ADMIN,
    isOpen: false,
}

/**
 * Contexto para payment de app
 */
const CTX_PAYMENT = {
    id: "", // identificador de payment
    name: "PAYMENT",
    opened_by: CTX_PROFILE_CLIENT,
    isOpen: false,
}

/**
 * Contexto de facturacion
 */
const CTX_INVOICE = {
    id: "", // identificador de invoice
    name: "INVOICE",
    opened_by: CTX_PROFILE_CLIENT,
    isOpen: false,
}



export {
    USER_OPERATION,
    USER_ATTRIBUTES,
    USER,
    PRODUCT_OPERATION,
    CTX_PAYMENT,
    CTX_INVOICE,
    CTX_PROFILE_CLIENT,
    CTX_PROFILE_COLLECTOR,
    CTX_PROFILE_ADMIN,
    
}


