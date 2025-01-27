import { SequelizeManager } from '../init.js';
export const addOneProduct = async (body) => {
    const t = await SequelizeManager.getSequelizeInstance().transaction();
    try {
        const { category, title, description, price, texture, wash, place } = body;
        const ProductInstance = SequelizeManager.getProductInstance();
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
        await Promise.all(body.variants.map(async (v) => {
            const { color_code, size, stock } = v;
            await SequelizeManager.getProductVariantInstance().create({
                color_code,
                size,
                stock,
                product_id: product.dataValues.id,
            }, {
                transaction: t,
            });
        }));
        await Promise.all(body.colors.map(async (c) => {
            const { color, code } = c;
            await SequelizeManager.getProductColorInstance().create({
                color,
                code,
                product_id: product.dataValues.id,
            }, {
                transaction: t,
            });
        }));
        await t.commit();
    }
    catch (err) {
        await t.rollback();
        throw Error('An error happened when adding product.');
    }
};
export const addPrducts = async (body) => {
    const ProductInstance = SequelizeManager.getProductInstance();
};
