import { catchAsync } from '../untils/catchAsync.js';
import * as productModel from '../models/product.js';
export const getAllProducts = catchAsync(async (req, res, next) => {
    const result = await productModel.getAllProducts();
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
export const changeProducts = catchAsync((req, res, next) => { });
