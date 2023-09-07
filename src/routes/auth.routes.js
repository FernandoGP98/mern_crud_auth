import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
const router = Router()

//Peticiones con su ruta
router.post('/register', register)
router.post('/login', login)

//Se exporta el router porque las rutas deben añadir a la app de express
export default router