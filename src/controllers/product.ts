import { RequestHandler, Request, Response, NextFunction } from 'express'
import { catchAsync } from '../untils/catchAsync.js'
import { addOneProduct } from '../models/product.js'

export const getAllProducts: RequestHandler = (req, res, next) => {
    res.status(400).json({})
}

export const addProducts: RequestHandler = catchAsync(
    (req: Request, res: Response, next: NextFunction) => {
        if (Array.isArray(req.body)) {
        } else {
            addOneProduct(req.body)
        }
        res.status(400).json({})
    }
)
