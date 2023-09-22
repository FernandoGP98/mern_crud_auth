import jwt  from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js"

export const authRequire = (req, res, next) => {
    const { token }= req.cookies
    
    //Si no hay un token retornar error de estatus 401 no autorizado
    if(!token){
        return res.status(401).send({message: 'No token, authorization denied'})
    }

    //jwt.verifiy retornara un error si falla
    //Si es success retornara el contenido del token decodificado
    jwt.verify(token, TOKEN_SECRET, (err, user)=>{
        if(err){
            return res.status(401).send({message: 'Invalid token'})
        }
        req.user = user
        next()
    })
}