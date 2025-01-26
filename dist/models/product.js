import { SequelizeManager } from '../init.js';
export const addOneProduct = async (body) => {
    const { category, title, description, price, texture, wash, place } = body;
    const ProductInstance = SequelizeManager.getProductInstance();
    const id = await ProductInstance.create({
        category,
        title,
        description,
        price,
        texture,
        wash,
        place,
    });
    return id;
};
export const addPrducts = async (body) => {
    const ProductInstance = SequelizeManager.getProductInstance();
};
