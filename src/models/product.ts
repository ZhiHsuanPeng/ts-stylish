import { ProductSchema, Product } from '../interfaces/product.schema.js'
import { SequelizeManager } from '../init.js'
import { Transaction, Model } from 'sequelize'

export const addOneProduct = async (body: Product, transactionWithMultipleProducts?: Transaction) => {
    const t = transactionWithMultipleProducts || (await SequelizeManager.getSequelizeInstance().transaction())
    try {
        const { category, title, description, price, texture, wash, place, variants, colors, images } = body

        const ProductInstance = SequelizeManager.getProductInstance()
        const productVariantInstance = SequelizeManager.getProductVariantInstance()
        const productColorInstance = SequelizeManager.getProductColorInstance()
        const productImageInstance = SequelizeManager.getProductImageInstance()

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

        await Promise.all(
            variants.map((v) => {
                const { color_code, size, stock } = v
                return productVariantInstance.create(
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

        await Promise.all(
            colors.map((c) => {
                const { color, code } = c
                return productColorInstance.create(
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

        await Promise.all(
            images.map((i) => {
                return productImageInstance.create(
                    {
                        image_url: i,
                        product_id: product.dataValues.id as number,
                    },
                    {
                        transaction: t,
                    }
                )
            })
        )
        if (!transactionWithMultipleProducts) {
            await t.commit()
        }
    } catch (err) {
        await t.rollback()
        throw Error('An error happened when adding product.')
    }
}

export const addProducts = async (body: Product[]) => {
    const t = await SequelizeManager.getSequelizeInstance().transaction()
    try {
        for (const product of body) {
            await addOneProduct(product, t)
        }
        await t.commit()
    } catch (err) {
        await t.rollback()
        throw err
    }
}

export const getAllProducts = async () => {
    try {
        const ProductInstance = SequelizeManager.getProductInstance()
        const variants = SequelizeManager.getProductVariantInstance()
        const colors = SequelizeManager.getProductColorInstance()
        const images = SequelizeManager.getProductImageInstance()
        const products = await ProductInstance.findAll({
            attributes: ['id', 'category', 'title', 'description', 'price', 'texture', 'wash', 'place'],
            include: [
                {
                    model: variants,
                    as: 'variants',
                    attributes: ['color_code', 'size', 'stock'],
                },
                {
                    model: colors,
                    as: 'colors',
                    attributes: ['color', 'code'],
                },
                {
                    model: images,
                    as: 'images',
                    attributes: ['image_url'],
                },
            ],
        })

        // internally, sequilize will transform to JSON structure, if you only want array which
        // contain only value, then you would have to type casting to get rid of the type error
        const transformProduct = products.map((p) => {
            return {
                ...p.toJSON(),
            }
            // this avoids type conflict
            // replace the old images property and replace it with new images property
        }) as (Omit<Product, 'images'> & { images: { image_url: string }[] })[]

        return transformProduct.map((product) => {
            return {
                ...product,
                images: product.images.map((i) => i.image_url),
            }
        })
    } catch (err) {
        if (err instanceof Error) {
            throw err
        }
    }
}
