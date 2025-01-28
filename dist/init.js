// import mysql from 'mysql2/promise'
import { Sequelize, DataTypes, Model } from 'sequelize';
export class SequelizeManager {
    static sequelizeInstance;
    static productInstance;
    static productVariantInstance;
    static productColorInstance;
    static productImageInstance;
    constructor() { }
    static async initSequelize() {
        try {
            const sequelize = new Sequelize('stylish', 'jeremy', 'jeremy', {
                host: 'localhost',
                dialect: 'mysql',
            });
            await sequelize.authenticate();
            this.sequelizeInstance = sequelize;
            console.log('Sql connection ok');
        }
        catch (err) {
            throw err;
        }
    }
    static initProductModel() {
        const sequelize = this.sequelizeInstance;
        class ProductInstance extends Model {
            category;
            title;
            description;
            price;
            texture;
            wash;
            place;
        }
        ProductInstance.init({
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            texture: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            wash: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            place: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        }, {
            sequelize,
            tableName: 'products',
            timestamps: true,
            underscored: true,
        });
        this.productInstance = ProductInstance;
    }
    static initProductVariantModel() {
        const sequelize = this.sequelizeInstance;
        class ProductVariantInstance extends Model {
            color_code;
            size;
            stock;
            product_id;
        }
        ProductVariantInstance.init({
            color_code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            size: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: 'variants',
            timestamps: true,
            underscored: true,
        });
        this.productVariantInstance = ProductVariantInstance;
    }
    static initProductColorModel() {
        const sequelize = this.sequelizeInstance;
        class ProductColorInstance extends Model {
            color;
            code;
            product_id;
        }
        ProductColorInstance.init({
            color: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: 'colors',
            timestamps: true,
            underscored: true,
        });
        this.productColorInstance = ProductColorInstance;
    }
    static initProductImageModel() {
        const sequelize = this.sequelizeInstance;
        class ProductImageInstance extends Model {
            image_url;
            product_id;
        }
        ProductImageInstance.init({
            image_url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: 'images',
            timestamps: true,
            underscored: true,
        });
        this.productImageInstance = ProductImageInstance;
    }
    static establishRelationship() {
        this.getProductInstance().hasMany(this.getProductVariantInstance(), {
            foreignKey: 'product_id',
        });
        this.getProductInstance().hasMany(this.getProductColorInstance(), {
            foreignKey: 'product_id',
        });
        this.getProductInstance().hasMany(this.getProductImageInstance(), {
            foreignKey: 'product_id',
        });
    }
    static getProductInstance() {
        return this.productInstance;
    }
    static getProductVariantInstance() {
        return this.productVariantInstance;
    }
    static getProductColorInstance() {
        return this.productColorInstance;
    }
    static getProductImageInstance() {
        return this.productImageInstance;
    }
    static getSequelizeInstance() {
        return this.sequelizeInstance;
    }
}
