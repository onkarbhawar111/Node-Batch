import express from 'express'
import { register, login, profile } from '../controllers/authController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import checkRole from '../middlewares/roleMiddleWare.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, profile);

router.get('/admin-panel', authMiddleware, checkRole(['admin']), (req, res)=>{
    res.json({msg: `Hello Admin ${req.user.username} `})
} )

export default router