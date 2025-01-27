import { Product, Product_variant } from '../interfaces/product.schema.js'
import { SequelizeManager } from '../init.js'

export const addOneProduct = async (body: Product) => {
    const t = await SequelizeManager.getSequelizeInstance().transaction()
    try {
        const {
            category,
            title,
            description,
            price,
            texture,
            wash,
            place,
            variants,
            colors,
        } = body

        const ProductInstance = SequelizeManager.getProductInstance()
        const product = await ProductInstance.create(
            {
                category,
                title,
                description,
                price,
                texture,
                wash,
                place,
            },
            {
                transaction: t,
            }
        )

        const productVariantInstance =
            SequelizeManager.getProductVariantInstance()
        await Promise.all(
            variants.map(async (v) => {
                const { color_code, size, stock } = v
                await productVariantInstance.create(
                    {
                        color_code,
                        size,
                        stock,
                        product_id: product.dataValues.id as number,
                    },
                    {
                        transaction: t,
                    }
                )
            })
        )

        const productColorInstance = SequelizeManager.getProductColorInstance()
        await Promise.all(
            colors.map(async (c) => {
                const { color, code } = c
                await productColorInstance.create(
                    {
                        color,
                        code,
                        product_id: product.dataValues.id as number,
                    },
                    {
                        transaction: t,
                    }
                )
            })
        )
        await t.commit()
    } catch (err) {
        await t.rollback()
        throw Error('An error happened when adding product.')
    }
}

export const addPrducts = async (body: Product) => {
    const ProductInstance = SequelizeManager.getProductInstance()
}
