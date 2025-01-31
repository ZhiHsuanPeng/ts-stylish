import { catchAsync } from '../untils/catchAsync.js';
import * as productModel from '../models/product.js';
export const getAllProducts = catchAsync(async (req, res, next) => {
    console.log(req.query);
    const result = await productModel.getAllProducts(req.query);
    res.status(200).json(result);
});
export const addProducts = catchAsync(async (req, res, next) => {
    if (Array.isArray(req.body)) {
        await productModel.addProducts(req.body);
    }
    else {
        await productModel.addOneProduct(req.body);
    }
    res.status(200).json({ message: 'Products added successfully.' });
});
export const modifyProducts = catchAsync(async (req, res, next) => {
    await productModel.modifyOneProduct(req.body);
    res.status(200).json({ message: 'Products modified successfully.' });
});
export const getProductById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        throw new Error('Product id is required.');
    }
    if (id && typeof Number(id) === 'number') {
        const result = await productModel.getProductById(Number(id));
        res.status(200).json(result?.[0] ?? { message: 'Product not found' });
        return;
    }
    res.status(400).json({ message: 'Invalid product id. Id must be of type number' });
});
