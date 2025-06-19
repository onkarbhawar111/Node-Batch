import express from 'express'
import { body } from 'express-validator'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    return res.json({ msg: "success" })
})



//connection

mongoose.connect('mongodb://localhost:27017/onkar')
    .then(() => {
        console.log('MongoDB Connected')
    })
    .catch((err) => {
        console.log("Error: ", err)
    })

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number
}, { versionKey : false})

const UserModel = mongoose.model('users', UserSchema)

//apis
//GET-ALL
app.get('/api/getUsers', (req, res) => {
    UserModel.find()
        .then(response => res.json(response))
        .catch(err => res.json(err))
})

//GET BY ID


//CREATE USER
app.post('/api/createUser', async (req, res) => {
    const body = req.body;
    if (!body.name || !body.age) {
        return res.status(400).json({ msg: "All fields are required." })
    }
    const result = await UserModel.create({
        name: req.body.name,
        age: req.body.age,
    })
    console.log("Result: ", result)
    return res.status(200).json("User created successfully")

})


//UPDATE
app.put('/api/updateUser/:id', async (req, res) => {
    try {

        // if (!body.name || !body.age) {
        //     return res.status(400).json({ msg: "All fields are required." })
        // }
        const { name, age } = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            { name, age },
            { new: true }
        )
        if (!updatedUser) return res.status(404).json({ msg: "User Not Found" })
        res.json({ msg: "User updated successfully", user: updatedUser })
    } catch (err) { 
        res.status(500).json({ "error": err.message })
    }
})


//DELETE
app.delete('/api/deleteUser/:id', async (req, res) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id)
        if (!deletedUser) return res.status(404).json({ msg: "User Not Found" })
        res.json({ msg: "User deleted successfully" })
    } catch (err) {
        res.status(500).json({ "error": err.message })
    }
})

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}...`)
})