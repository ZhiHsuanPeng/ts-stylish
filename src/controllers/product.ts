import { RequestHandler, Request, Response, NextFunction } from 'express'
import { Product } from '../interfaces/product.schema.js'
import { catchAsync } from '../untils/catchAsync.js'
import * as productModel from '../models/product.js'

export const getAllProducts: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await productModel.getAllProducts()
    res.status(200).json(result)
})

export const addProducts: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (Array.isArray(req.body)) {
        await productModel.addProducts(req.body)
    } else {
        await productModel.addOneProduct(req.body)
    }
    res.status(200).json({ message: 'Products added successfully.' })
})

export const changeProducts: RequestHandler = catchAsync((req: Request, res: Response, next: NextFunction) => {})
