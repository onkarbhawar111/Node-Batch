import express from 'express'
import { body, validationResult } from 'express-validator'

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ msg: "Welcome......!!!" })
})

// app.post('/', (req, res)=>{
//     const {name, email, username} = req.body
//     if(!name){
//         return res.json({error: "Username is required..."})
//     }
//     if(!email){
//          res.json({error: "Email is required..."})
//     }
//     if(!username){
//          res.json({error: "Username is required..."})
//     }
//     res.json({msg: 'User created...'})
// })

const validations = [body('name').notEmpty().withMessage('Name cant be empty'),
body('email').notEmpty().withMessage('Email cannot be Empty...').isEmail().withMessage('INVALID Email...'),
body('password').isLength({ min: 3 }).withMessage('Password should be min 3 chars long').isLength({ max: 10 }).withMessage("password max 10 allowed"),
body('age').optional().isInt({ min: 18 }).withMessage('Minimum age is 18, so you are not allowed...'),
body('mobile_no').matches(/[6-9]\d{9}/).withMessage('Invalid phone no.')
]

app.post('/', validations,
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ Error: errors.array() })
        }
        res.json({ data: req.body })
    })


app.listen(PORT, (req, res) => {
    console.log(`Server started at ${PORT}...`)
})