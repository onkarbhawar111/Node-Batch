import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'

const app = express()
app.use(cors())

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, '../uploads')
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() +' - ' + file.originalname)
    }
})

const upload = multer({storage}) 

app.post('/upload', upload.single('file'), (req, res)=>{
    console.log(req.file)
    if(!req.file){
        res.status(400).json({msg: "No file Uploaded..."})
    }

    res.json({msg:"File Uploaded Successfully"})
})

app.use('/uploads', express.static('uploads'))

app.listen(3001, ()=>{
    console.log('Server started at 3001...')
})