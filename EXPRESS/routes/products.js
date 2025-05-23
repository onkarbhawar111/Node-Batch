import express from 'express'
import { getAllProducts, getAllProductsTesting } from '../controller/products.js'

const router = express.Router()

router.route('/').get(getAllProducts)
router.route('/testing').get(getAllProductsTesting)
 
export default router