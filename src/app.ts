import express, { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

import { SequelizeManager } from './init.js'
import routers from './routers/api.js'

const app = express()

// this IIFE init the database with the newest data schema
;(async function initAndSync() {
    try {
        await SequelizeManager.initSequelize()
        SequelizeManager.initProductModel()
        SequelizeManager.initProductVariantModel()
        SequelizeManager.initProductColorModel()
        SequelizeManager.initProductImageModel()
        SequelizeManager.establishRelationship()

        const sequelize = SequelizeManager.getSequelizeInstance()
        await sequelize.sync({ alter: true })
        console.log('Table initialized')
    } catch (err) {
        console.log(err)
    }
})()

app.use(express.json({ limit: '10kb' }))
app.use('/api/v1', routers)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Joi.ValidationError) {
        res.status(400).json({
            message: err.message,
            details: err.details,
        })
        return
    }
    res.status(500).send('Something broke!')
})

app.listen(3000, () => {
    console.log('Listening on 3000')
})
