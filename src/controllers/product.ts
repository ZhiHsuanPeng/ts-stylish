import { RequestHandler, Request, Response, NextFunction } from 'express'
import { catchAsync } from '../untils/catchAsync.js'
import { addOneProduct, addPrducts } from '../models/product.js'

export const getAllProducts: RequestHandler = (req, res, next) => {
    res.status(400).json({})
}

export const addProducts: RequestHandler = catchAsync((req: Request, res: Response, next: NextFunction) => {
    if (Array.isArray(req.body)) {
        addPrducts(req.body)
    } else {
        addOneProduct(req.body)
    }
    res.status(200).json({ message: 'Products added successfully.' })
})

export const changeProducts: RequestHandler = catchAsync((req: Request, res: Response, next: NextFunction) => {})
