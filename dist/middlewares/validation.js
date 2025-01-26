import Joi from 'joi';
import { catchAsync } from '../untils/catchAsync.js';
export const validateProduct = catchAsync(async (req, res, next) => {
    const productVariantSchema = Joi.object({
        color_code: Joi.string().required(),
        size: Joi.string().required(),
        stock: Joi.number().integer().min(1).required(),
    });
    const productColorSchema = Joi.object({
        color: Joi.string().required(),
        code: Joi.string().required(),
    });
    const productSchema = Joi.object({
        category: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().positive().required(),
        texture: Joi.string().required(),
        wash: Joi.string().required(),
        place: Joi.string().required(),
        variants: Joi.array().items(productVariantSchema).required(),
        colors: Joi.array().items(productColorSchema).required(),
        sizes: Joi.array().items(Joi.string()).required(),
        images: Joi.array().items(Joi.string()).required(),
    });
    if (Array.isArray(req.body)) {
        if (req.body.length > 5) {
            throw new Error('You cannot add more than 5 products at once');
        }
        let allValidationResults = [];
        for (const product of req.body) {
            allValidationResults.push(productSchema.validateAsync(product));
        }
        await Promise.all(allValidationResults);
    }
    else {
        await productSchema.validateAsync(req.body);
    }
    next();
});
