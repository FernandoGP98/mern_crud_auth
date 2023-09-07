import User from '../models/user.model.js'

export const register = async (req, res) => {
    console.log(req.body)
    const {email, password, username} = req.body

    // User.create({
    //     username, 
    //     email, 
    //     password
    // })

    try {
        //Creamos un nuevo usuario con la informacion extraida del request
        // con al modelo de usuario que creamos antes.
        const newUser = new User({
            email,
            password,
            username
        })
        console.log(newUser)
        // .save() guarda el este nuevo usuario
        //y como el metodo es asyncrono, hay que esperar a que termine.
        const userSaved = await newUser.save()
        res.send(userSaved)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
    

}

export const login = (req, res) => {
    res.send("login")
}