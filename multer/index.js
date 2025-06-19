import express from 'express'
import multer from 'multer'

const app = express()

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
       cb(null, './uploads') 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + ' - ' + file.originalname)
    }
})

const upload = multer({storage: storage})

app.post('/upload',upload.single('myfile'),  (req, res)=>{
    console.log(req.file)
    res.send('File Uploaded successfully')
})

app.listen(3001, ()=>{
    console.log('Server started at 3001')
})