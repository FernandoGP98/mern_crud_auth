import { Router } from "express";
import { register, login, logout, profile } from "../controllers/auth.controller.js";
import { authRequire } from "../middlewares/validateToken.js"
const router = Router()

//Peticiones con su ruta
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

//Url protegida para que no acceda algun usuario sin token
router.get('/profile', authRequire, profile)

//Se exporta el router porque las rutas deben añadir a la app de express
export default router