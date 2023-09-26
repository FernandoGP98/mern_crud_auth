import mongoose from "mongoose";

//Esquema Tasks para la base de datos
const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required: false,
        trim: true,
    },
    taskDate: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
})

//Modelo User para las funciones de crud basado en el schema
export default mongoose.model('Task', taskSchema)