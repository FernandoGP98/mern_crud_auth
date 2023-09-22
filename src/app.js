import express from 'express'
//Morgan es un libreria que nos ayuda a ver las peticiones realizadas al servidor.
import morgan from 'morgan'
//cookieParser es usado para convertir cookies a json
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js'

const app  = express()

app.use(morgan('dev'))
//Middleware express.json para comvertir los request bodies en un obj de javascript
app.use(express.json())

app.use(cookieParser())

//Se le agrega /api para que todas las peticiones lo requieran
//y evitar confuciones con rutas de front.
app.use("/api", authRoutes)
app.use("/api", taskRoutes)

export default app