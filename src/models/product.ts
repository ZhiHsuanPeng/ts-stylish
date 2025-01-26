import { Product, Product_variant } from '../interfaces/product.schema.js'
import { SequelizeManager } from '../init.js'

export const addOneProduct = async (body: Product) => {
    const { category, title, description, price, texture, wash, place } = body
    const ProductInstance = SequelizeManager.getProductInstance()
    const product = await ProductInstance.create({
        category,
        title,
        description,
        price,
        texture,
        wash,
        place,
    })

    await Promise.all(
        body.variants.map(async (v) => {
            const { color_code, size, stock } = v
            await SequelizeManager.getProductVariantInstance().create({
                color_code,
                size,
                stock,
                product_id: product.dataValues.id as number,
            })
        })
    )
}

export const addPrducts = async (body: Product) => {
    const ProductInstance = SequelizeManager.getProductInstance()
}
