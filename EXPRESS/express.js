import express from 'express'

const app = express()
const PORT = 3000

//IN-BUILT MIDDLEWARE
app.use(express.json())

//CUSTOM MIDDLEWARES
app.use((req, res, next)=>{
    console.log('Middleware 1 called....')
    next()
})
app.use((req, res, next)=>{
    console.log('Middleware 2 called....')
    next()
})

const books = [
    {id: 101, name: "Wings of Fire", author: "APJ Abdul Kalam"},
    {id: 102, name: "Think like a Monk", author: "Jay Shetty"}
]

//GET ALL
app.get('/getBooks', (req, res)=>{
    res.json(books);
})

//GET BY ID
app.get('/getBooks/:id', (req, res)=>{
    const id = req.params.id
    const book = books.find((b)=> b.id == id)
    res.json(book);
})

//CREATE
app.post('/createBook', (req, res)=>{
    const book = {id: 100 + books.length+1, name:req.body.name, author:req.body.author}
    books.push(book)
    res.status(201).json(book);
})

app.listen(PORT, (req, res)=>{
    console.log(`Server started on PORT: ${PORT}`)
})