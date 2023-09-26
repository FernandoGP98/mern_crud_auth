import  Task  from '../models/tasks.model.js'

export const getTasks = async(req, res)=>{
    //.Find trae todos los valores del modelo
    //Al especificar un campo, significa que comparara el dato que le hemos dado
    //con los que encuentre en la BD y retornara los que coincidan
    const allTasks = await Task.find({
        user: req.user.id
    })
    //.populate reemplaza un dato en la peticion con nueva informacion
    //En este caso, reemplazaremos el dato del user id con datos especificos de ese usuario.

    //Para que esto funcione de manera correcta en el modelo de datos debe existir una referencia
    //En el modelo de Task existe una dato ref, que hace referencia al modelo de User
    //asi se crea un relacion entre los modelos, o bien entre las tablas de la BD
    .populate('user')
    res.json(allTasks)
}

export const getTaskById = async(req, res)=>{
    //Accedemos a los parametros de la ruta por medio del request
    const taskFound = await Task.findById(req.params.id)
    if(!taskFound){
        return res.status(404).json('Task not found')
    }
    res.json(taskFound)
}

export const createTask = async(req, res)=>{
    const {title, description, taskDate} = req.body

    try {
        const newTask = new Task({
            title,
            description,
            taskDate,
            user: req.user.id
        })
        const taskSaved = await newTask.save()

        // res.json({
        //     title: taskSaved.title,
        //     description: taskSaved.description,
        //     taskDate: taskSaved.taskDate
        // })
        res.json(taskSaved)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const editTaskById = async(req, res)=>{
    //Busca el dato por id y lo actualiza con el segundo parametro que es el request Body
    //Retorna el dato anterior antes de ser actualizado
    //Al agregar la opcion new: true, ahora si retornada el dato actyalizado.
    const taskUpdate = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if(!taskUpdate){
        return res.status(404).json({ message:'Task not found' })
    }
    res.json(taskUpdate)
}

export const deleteTaskById = async(req, res)=>{
    //Busca el dato y lo elimina
    //Retorna el dato eliminado
    const taskDelete = await Task.findByIdAndDelete(req.params.id)
    //Si regresa nada es porque no encontro ni elimino el dato.
    if(!taskDelete){
        return res.status(404).json({ message:'Task not found' })
    }
    return res.status(200).json({message: 'Task deleted'})
}
