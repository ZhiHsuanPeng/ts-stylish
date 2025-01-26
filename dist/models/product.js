import { SequelizeManager } from '../init.js';
export const addOneProduct = async (body) => {
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
    });
    await Promise.all(body.variants.map(async (v) => {
        const { color_code, size, stock } = v;
        await SequelizeManager.getProductVariantInstance().create({
            color_code,
            size,
            stock,
            product_id: product.dataValues.id,
        });
    }));
};
export const addPrducts = async (body) => {
    const ProductInstance = SequelizeManager.getProductInstance();
};
