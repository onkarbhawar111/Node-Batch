import http from 'http'
import fs from 'fs'

const myServer = http.createServer((req, res)=>{
// console.log(req.method)
const log =  `\nDate : ${Date.now()} and url: ${req.url} searched`
fs.appendFile('log.txt', log, (err, data)=>{
    if(err) throw err;
    console.log('new line added...')
} )

res.setHeader('Content-Type', 'text/html') 
if(req.url == '/'){
    res.writeHead(200, "Success")
    res.end("Server is running....")
} else if(req.url == '/about'){
    res.end('THIS IS ABOUT PAGE')
} else if(req.url == '/htm'){
    const h = fs.readFileSync('ind.html', 'utf8')
    res.end(h) 
} else if(req.url == '/contact-us'){
        console.log(res.statusCode)
        res.end('<h1>CONTACT PAGE</h1>')
    }
     else{
        res.end('PAGE NOT FOUND')
    }    
})

myServer.listen(3000, ()=>{
    console.log('Server is running on Port: 3000')
})