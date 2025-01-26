import { Router } from 'express'
import { getAllProducts, addProducts } from '../controllers/product.js'
import { validateProduct } from '../middlewares/validation.js'

const router = Router()

router.get('/products', getAllProducts)
router.post('/products', validateProduct, addProducts)

export default router
