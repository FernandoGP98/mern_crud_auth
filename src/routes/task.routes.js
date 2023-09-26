import { Router } from "express";
import { authRequire } from "../middlewares/validateToken.js"
import {getTasks, getTaskById, createTask, deleteTaskById, editTaskById} from "../controllers/tasks.controller.js"
const router = Router()

//Peticiones con su ruta
//Conseguir todas las tareas
router.get('/tasks', authRequire, getTasks)
//Conseguir una tarea por id
router.get('/tasks/:id', authRequire, getTaskById)
//Publicar tarea
router.post('/task', authRequire, createTask)
//Eliminar tarea por id
router.delete('/tasks/:id', authRequire, deleteTaskById)
//Editar tarea por id
router.put('/tasks/:id', authRequire, editTaskById)

//Se exporta el router porque las rutas deben añadir a la app de express
export default router