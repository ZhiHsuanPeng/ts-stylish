import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import { Product, Product_color, Product_variant } from '../interfaces/product.schema.js'
import { catchAsync } from '../untils/catchAsync.js'

const productVariantSchema = Joi.object<Product_variant>({
    color_code: Joi.string().required(),
    size: Joi.string().required(),
    stock: Joi.number().integer().min(1).required(),
})

const productColorSchema = Joi.object<Product_color>({
    color: Joi.string().required(),
    code: Joi.string().required(),
})

const productSchema = Joi.object<Product>({
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
}).unknown(false)

const productOptionalSchema = Joi.object<Product>({
    id: Joi.number().required(),
    category: Joi.string().optional(),
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().positive().optional(),
    texture: Joi.string().optional(),
    wash: Joi.string().optional(),
    place: Joi.string().optional(),
    variants: Joi.array().items(productVariantSchema).optional(),
    colors: Joi.array().items(productColorSchema).optional(),
    sizes: Joi.array().items(Joi.string()).optional(),
    images: Joi.array().items(Joi.string()).optional(),
}).unknown(false)

const queryOptionalSchema = Joi.object<Product>({
    category: Joi.string().optional(),
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().positive().optional(),
    texture: Joi.string().optional(),
    wash: Joi.string().optional(),
    place: Joi.string().optional(),
    variants: Joi.array().items(productVariantSchema).optional(),
    colors: Joi.array().items(productColorSchema).optional(),
    sizes: Joi.array().items(Joi.string()).optional(),
    images: Joi.array().items(Joi.string()).optional(),
}).unknown(false)

export const validateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (Array.isArray(req.body)) {
        if (req.body.length > 5) {
            throw new Error('You cannot add more than 5 products at once')
        }
        let allValidationResults = []
        for (const product of req.body) {
            allValidationResults.push(productSchema.validateAsync(product))
        }
        await Promise.all(allValidationResults)
    } else {
        await productSchema.validateAsync(req.body)
    }
    next()
})

export const validateProductOptional = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (Array.isArray(req.body)) {
        if (req.body.length > 5) {
            throw new Error('You cannot modify more than 5 products at once')
        }
        let allValidationResults = []
        for (const product of req.body) {
            allValidationResults.push(productOptionalSchema.validateAsync(product))
        }
        await Promise.all(allValidationResults)
    } else {
        await productOptionalSchema.validateAsync(req.body)
    }
    next()
})

export const validateQueryString = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await queryOptionalSchema.validateAsync(req.query)
    next()
})
