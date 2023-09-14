import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
const router = Router()

//Peticiones con su ruta
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

//Se exporta el router porque las rutas deben añadir a la app de express
export default router