import User from '../models/user.model.js'
//bcrypt es una librearia que nos ayudara a encriptar y desencriptar las contraseñas del usuario
import bcrypt from 'bcryptjs'
//En jwt estamos generando el token que necesitamos, en la funcion createAccessToken
import { createAccessToken } from '../libs/jwt.js'

export const register = async (req, res) => {
    const {email, password, username} = req.body

    try {

        //Ecripcion de password
        //bcrypt.hash(variable de contraseña, numero de veces que se ejecutara el encriptado)
        const passHash = await bcrypt.hash(password, 10) //regresa un hash (string aleatorio)

        //Creamos un nuevo usuario con la informacion extraida del request
        // con al modelo de usuario que creamos antes.
        const newUser = new User({
            email,
            password: passHash,
            username
        })

        // .save() guarda el este nuevo usuario
        //y como el metodo es asyncrono, hay que esperar a que termine.
        const userSaved = await newUser.save()
        const token = await createAccessToken({id: userSaved._id})

        res.cookie("token", token)
        //Lo siguiente es la respuesta que este servicio mandara al front
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    

}

export const login = async (req, res) => {
    const {email, password} = req.body

    try {
        //Buscar el usuario si existe
        const userFound = await User.findOne({email})

        if(!userFound){
            return res.status(400).json({message: "User not found"})
        }
        //Comparar la contraseña del usuario obtenido con la del payload
        const passIsMatch = await bcrypt.compare(password, userFound.password) //regresa un boolean

        if(!passIsMatch){
            return res.status(400).json({message: "Incorrect password"})
        }

        //Generamos el token de usuario logeado
        const token = await createAccessToken({id: userFound._id})

        res.cookie("token", token)
        //Lo siguiente es la respuesta que este servicio mandara al front
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    

}

export const logout = (req, res) => {
    //Obtenemos de la cookie con el nombre de token y su valor que creamos en cada registe y login
    res.cookie('token', "", {
        expires: new Date(0)
    })
    res.status(200).json({message: "User logout"})
}