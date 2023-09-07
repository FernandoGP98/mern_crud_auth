import mongoose from "mongoose";

//Esquema Usuario para la base de datos
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true
})
//Modelo User para las funciones de crud basado en el schema
export default mongoose.model('User', userSchema)