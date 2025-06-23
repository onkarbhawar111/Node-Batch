import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const app = express()
app.use(cors())

// const uploadDir = path.join(process.cwd(), 'uploads');
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')  // Save inside ./uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + ' - ' + file.originalname)
    }
})

const upload = multer({ storage })

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file)
    if (!req.file) {
        return res.status(400).json({ msg: "No file uploaded..." })
    }

    res.json({ msg: "File uploaded successfully", file: `/uploads/${req.file.filename}` })
})

app.use('/uploads', express.static('uploads'))

app.listen(3001, () => {
    console.log('Server started on port 3001...')
})
