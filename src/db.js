//Importamos la libreria mongoose
//nos ayudara para la conexion de la base de datos
import mongoose from "mongoose";

/**
 * @method connectDB
 * @description Funcion que conecta conecta a la base de datos de mongodb
 */
export const connectDB = async () => {
    try {
        //mongodb://localhost/NombreDeLaBasedeDatos
        await mongoose.connect('mongodb://localhost/merndb')
        console.log(">>>> Se conecto a la BD")
    } catch (error) {
        console.log(error)
    }
}