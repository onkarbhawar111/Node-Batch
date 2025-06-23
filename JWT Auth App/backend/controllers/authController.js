import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashed });
        await user.save();

        res.status(201).json({ msg: "User registered !" })
    } catch (err) {
        res.status(500).json({ error: "Registration failed...", details: err.message })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.finOne({ username });
        if (!user) {
            return res.status(400).json({ err: "Invalid Credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ err: "Invalid Credentials" })
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.json({ token })
    } catch (err) {
        res.status(500).json({ error: "Login failed...", details: err.message })
    }
}

export const profile = (req, res) =>{
    res.sjon({user: req.user})
}