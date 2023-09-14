import { TOKEN_SECRET } from "../config.js"
import jwt  from "jsonwebtoken"
//Exportar la funcion para usarla en otro lado
export function createAccessToken(payload){
    //jwt.sign es una funcion que genera un token basado en la informacion mandada
    //en este caso solo mandaremos un id como identificador del token
    //requiere de un string clave para encriptar y desencriptar el token
    //Y la configuracion de tiempo de expiracion, etc.
    //Al agregar el callback, la funcion pasa de ser sincrona a asincrona (evitamos esperar segundos extras)

    //Lo ponemos dentro de una promesa para poder user await cuando usemos la funcion.
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            //String de encriptado 
            TOKEN_SECRET, 
            {
                //Configuracion de token (1 dia)
                expiresIn: "1d"
            },
            //Callback asincrono
            (err, token) => {
                if(err){
                    reject(err)
                }
                else{
                    //Si todo sale bien reponder con el token generado.
                    resolve(token)
                }
            }
        )
    })
}