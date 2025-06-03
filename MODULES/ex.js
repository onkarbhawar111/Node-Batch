import express from "express"
// const express = require('express')

const app = express()
const PORT = 8080

app.get('/get', (req, res)=>{
    res.send('<h1>HOME PAGE</h1>')
}) 
app.get('/about', (req, res)=>{
    res.send("<h1>ABOUT PAGE</h1>")
})
app.get('/contact', (req, res)=>{
    res.send('<h2 style="color:red">CONTACT PAGE</h2>')
})

app.listen(PORT, ()=>{
    console.log(`Server started on ${PORT} `)
})