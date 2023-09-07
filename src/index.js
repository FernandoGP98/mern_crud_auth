import app from './app.js'
import { connectDB } from './db.js'

//Empieza a conectar a la base de datos
connectDB()
//Inicia el servidor
app.listen(3000)
console.log("Server on port", 3000)
