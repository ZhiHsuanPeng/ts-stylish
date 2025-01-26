import { catchAsync } from '../untils/catchAsync.js';
import { addOneProduct } from '../models/product.js';
export const getAllProducts = (req, res, next) => {
    res.status(400).json({});
};
export const addProducts = catchAsync((req, res, next) => {
    if (Array.isArray(req.body)) {
    }
    else {
        addOneProduct(req.body);
    }
    res.status(400).json({});
});
