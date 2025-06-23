import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then((response)=>{
    console.log('MongoDB connected...')

    app.listen(process.env.PORT, ()=>{
        console.log("Server is running on 5000")
    })

}).catch(err =>{
    console.log(err)
})