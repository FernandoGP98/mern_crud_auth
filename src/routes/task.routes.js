import { Router } from "express";
import { authRequire } from "../middlewares/validateToken.js"
const router = Router()

//Peticiones con su ruta
router.get('/tasks', authRequire, (req, res) =>{res.send('tasks')})

//Se exporta el router porque las rutas deben añadir a la app de express
export default router