import express from 'express'
import { body } from 'express-validator'
import mongoose from 'mongoose'

const app = express()
const PORT = 8080

app.use(express.json())

app.get('/', (req, res)=>{
    return res.json({msg:"success"})
})
//connection

mongoose.connect('mongodb://localhost:27017/nodedb')
.then(()=>{
    console.log('MongoDB Connected')
})
.catch((err)=>{
    console.log("Error: ", err)
})

const UserSchema = new mongoose.Schema({
    name: String,
    age:Number,
    isActive: Boolean
},{
    collection:'user'
})

const UserModel = mongoose.model('user', UserSchema)

//apis
//GET
app.get('/api/getUsers', (req, res)=>{
    UserModel.find()
    .then(response => res.json(response))
    .catch(err => res.json(err))
})

app.post('/api/createUser', async (req, res)=>{
    const body = req.body; 
    if(!body.name || !body.age){
        return res.status(400).json({msg:"All fields are required."})
    }
    const result = await UserModel.create({
        name: req.body.name,
        age: req.body.age,
        isActive: req.body.isActive
    })
    console.log("Result: ", result)
    return res.status(200).json("User created successfully")

})

app.put('/api/updateUser/:id', (req, res)=>{
    const newUser = UserModel.findByIdAndUpdate()
})

app.listen(PORT, ()=>{
    console.log(`Server started on ${PORT}...`) 
})