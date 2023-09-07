import express from 'express'
//Morgan es un libreria que nos ayuda a ver las peticiones realizadas al servidor.
import morgan from 'morgan'

import authRoutes from './routes/auth.routes.js'

const app  = express()

app.use(morgan('dev'))
//Middleware express.json para comvertir los request bodies en un ibj de javascript
app.use(express.json())

//Se le agrega /api para que todas las peticiones lo requieran
//y evitar confuciones con rutas de front.
app.use("/api", authRoutes)

export default app