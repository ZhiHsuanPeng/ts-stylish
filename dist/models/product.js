import { SequelizeManager } from '../init.js';
export const addOneProduct = async (body, transactionWithMultipleProducts) => {
    const t = transactionWithMultipleProducts || (await SequelizeManager.getSequelizeInstance().transaction());
    try {
        const { category, title, description, price, texture, wash, place, variants, colors, images } = body;
        const ProductInstance = SequelizeManager.getProductInstance();
        const productVariantInstance = SequelizeManager.getProductVariantInstance();
        const productColorInstance = SequelizeManager.getProductColorInstance();
        const productImageInstance = SequelizeManager.getProductImageInstance();
        const product = await ProductInstance.create({
            category,
            title,
            description,
            price,
            texture,
            wash,
            place,
        }, {
            transaction: t,
        });
        await Promise.all(variants.map((v) => {
            const { color_code, size, stock } = v;
            return productVariantInstance.create({
                color_code,
                size,
                stock,
                product_id: product.dataValues.id,
            }, {
                transaction: t,
            });
        }));
        await Promise.all(colors.map((c) => {
            const { color, code } = c;
            return productColorInstance.create({
                color,
                code,
                product_id: product.dataValues.id,
            }, {
                transaction: t,
            });
        }));
        await Promise.all(images.map((i) => {
            return productImageInstance.create({
                image_url: i,
                product_id: product.dataValues.id,
            }, {
                transaction: t,
            });
        }));
        if (!transactionWithMultipleProducts) {
            await t.commit();
        }
    }
    catch (err) {
        await t.rollback();
        throw Error('An error happened when adding product.');
    }
};
export const addProducts = async (body) => {
    const t = await SequelizeManager.getSequelizeInstance().transaction();
    try {
        for (const product of body) {
            await addOneProduct(product, t);
        }
        await t.commit();
    }
    catch (err) {
        await t.rollback();
        throw err;
    }
};
export const getAllProducts = async () => {
    try {
        const ProductInstance = SequelizeManager.getProductInstance();
        const productVariantInstance = SequelizeManager.getProductVariantInstance();
        const productColorInstance = SequelizeManager.getProductColorInstance();
        const productImageInstance = SequelizeManager.getProductImageInstance();
        const products = await ProductInstance.findAll({
            attributes: ['id', 'category', 'title', 'description', 'price', 'texture', 'wash', 'place'],
            include: [
                {
                    model: productVariantInstance,
                    as: 'variants',
                    attributes: ['color_code', 'size', 'stock'],
                },
                {
                    model: productColorInstance,
                    as: 'colors',
                    attributes: ['color', 'code'],
                },
                {
                    model: productImageInstance,
                    as: 'images',
                    attributes: ['image_url'],
                },
            ],
        });
        // internally, sequilize will transform data to JSON structure, if you only want array which
        // contain only primitive value, then you would have to type cast to get rid of the type error
        // This step transform the product data ( originally is Sequelize Model ) to JSON format
        const transformProduct = products.map((p) => {
            return {
                ...p.toJSON(),
            };
            // this type casting avoids type conflict
            // replace the old images property with new images property, which allow you to access image_url property
        });
        return transformProduct.map((product) => {
            return {
                ...product,
                images: product.images.map((i) => i.image_url),
            };
        });
    }
    catch (err) {
        if (err instanceof Error) {
            throw err;
        }
    }
};
export const modifyOneProduct = async (body) => {
    const { id, variants, colors, images, ...product } = body;
    const ProductInstance = SequelizeManager.getProductInstance();
    const productVariantInstance = SequelizeManager.getProductVariantInstance();
    const productColorInstance = SequelizeManager.getProductColorInstance();
    const productImageInstance = SequelizeManager.getProductImageInstance();
    if (variants) {
        await productVariantInstance.destroy({ where: { product_id: id } });
        const newVariants = variants.map((v) => ({ ...v, product_id: id }));
        await productVariantInstance.bulkCreate(newVariants);
    }
    if (colors) {
        await productColorInstance.destroy({ where: { product_id: id } });
        const newColors = colors.map((c) => ({ ...c, product_id: id }));
        await productColorInstance.bulkCreate(newColors);
    }
    if (images) {
        await productImageInstance.destroy({ where: { product_id: id } });
        const newImages = images.map((i) => ({ image_url: i, product_id: id }));
        await productImageInstance.bulkCreate(newImages);
    }
    const result = await ProductInstance.update(product, {
        where: {
            id,
        },
    });
    return result;
};
