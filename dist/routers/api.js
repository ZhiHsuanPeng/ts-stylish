import { Router } from 'express';
import { getAllProducts, addProducts, modifyProducts } from '../controllers/product.js';
import { validateProduct, validateProductOptional } from '../middlewares/validation.js';
const router = Router();
router.get('/products', getAllProducts);
router.post('/products', validateProduct, addProducts);
router.patch('/products', validateProductOptional, modifyProducts);
export default router;
