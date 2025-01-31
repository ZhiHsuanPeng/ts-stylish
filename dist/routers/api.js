import { Router } from 'express';
import { getAllProducts, addProducts, modifyProducts, getProductById } from '../controllers/product.js';
import { validateProduct, validateProductOptional, validateQueryString } from '../middlewares/validation.js';
const router = Router();
router.get('/product/:id', getProductById);
router.get('/products', validateQueryString, getAllProducts);
router.post('/products', validateProduct, addProducts);
router.patch('/products', validateProductOptional, modifyProducts);
export default router;
