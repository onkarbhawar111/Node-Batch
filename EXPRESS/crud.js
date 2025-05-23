import express from 'express'
import fs from 'fs/promises'
import router from './routes/products.js'

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: true})) 

app.get('/login', (req, res)=>{
    res.send(
        '<form method=POST action=/login><input name="username" type="text" placeholder="Enter your username"><input name="password" type="password" placeholder="Enter your password"><button type="submit">Login</button></form>'
    )
})

app.post('/login', (req, res)=>{
    console.log("URL: ", req.body)
    res.send('Logged in successfully')
})

// const data = await fs.readFile('./MOCK_DATA.json', 'utf-8')
// const users = JSON.parse(data)

//GET ALL
// app.get('/getUsers', (req, res)=>{
//     res.send(users);
// })

//GET BY ID








//MODULAR ROUTING 

app.use('/api/products', router)


app.listen(5000, (req, res)=>{
    console.log('Server started at 5000')
})