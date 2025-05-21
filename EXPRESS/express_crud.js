import express from 'express'

const app = express()
const PORT = 3000

//IN-BUILT MIDDLEWARE
app.use(express.json())

//CUSTOM MIDDLEWARES
// app.use((req, res, next)=>{
//     console.log('Middleware 1 called....')
//     next()
// })
// app.use((req, res, next)=>{
//     console.log('Middleware 2 called....')
//     next()
// })


//ROUTE-SPECIFIC MIDDLEWARES
// function routeMiddleware(req, res, next){
//     res.send('Login Middleware')
//     console.log('route middleware called....')
// }

// app.get('/login', (req, res)=>{
//     res.send('Login Page')
// })

//ERROR-HANDLING MIDDLEWARES

app.use((req, res, next)=>{
    console.log('Error middleware.....')

    const err = new Error('Authentication failed....')
    next(err)
})

app.use((err, req, res, next)=>{
    console.log(err)
    res.send({message: 'Server Error' || err.message})

    next()
})

const books = [
    {id: 101, name: "Wings of Fire", author: "APJ Abdul Kalam"},
    {id: 102, name: "Think like a Monk", author: "Jay Shetty"}
]

//GET ALL
app.get('/', (req, res)=>{
    res.send('HOME PAGE');
})
app.get('/getBooks', (req, res)=>{
    res.json(books);
})

//GET BY ID
app.get('/getBooks/:id', (req, res)=>{
    const id = req.params.id
    const book = books.find((b)=> b.id == id)
    if(!book) return res.status(404).send(`BOOK NOT FOUND with id: ${id}`)
    res.json(book);
})

//CREATE
app.post('/createBook', (req, res)=>{
    const book = {id: 100 + books.length+1, name:req.body.name, author:req.body.author}
    books.push(book)
    res.status(201).json(book);
})

//UPDATE
app.put('/updateBook/:id', (req, res)=>{
    const id = req.params.id
    const book = books.find(b => b.id == id)
    if(!book) return res.status(404).send('Not Found ...')
        book.name = req.body.name
        book.author = req.body.author
      books.push(book)  
      res.send(book)
})

//DELETE
app.delete('/deleteBook/:id', (req, res)=>{
    const id = req.params.id;
    const book = books.filter(b => b.id != id )
    if(!book) return res.status(404).send('NOT Found !')
    res.send(book)
})

//HOW TO ACCESS MULTIPLE QUERY PARAMETERS
app.get('/get/:id/order/:quantity', (req, res)=>{
    const {id, quantity} = req.params
    res.end(`Id: ${id} & Quantity: ${quantity}`)
})

//ACCESS SEARCH QUERY
app.get('/search', (req, res)=>{
    const q1 = req.query.q
    // console.log(q1)
    res.end(`Search Query : ${q1}`)
})



app.listen(PORT, (req, res)=>{
    console.log(`Server started on PORT: ${PORT}`)
})