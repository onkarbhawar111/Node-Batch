import express from 'express'
// import fs from 'fs/promises'
import fs from 'fs'

const app = express()

const data = fs.readFileSync('./MOCK_DATA.json', 'utf8')
const users = JSON.parse(data)

//GET ALL
app.get('/getUsers', (req, res)=>{
    res.json(users);
})

//GET BY ID


app.listen(5000, (req, res)=>{
    console.log('Server started at 5000')
})