// import mysql from 'mysql2/promise'
import { Sequelize, DataTypes, Model } from 'sequelize';
export class SequelizeManager {
    static sequelizeInstance;
    static productInstance;
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
    static getProductInstance() {
        return this.productInstance;
    }
    static getSequelizeInstance() {
        return this.sequelizeInstance;
    }
}
