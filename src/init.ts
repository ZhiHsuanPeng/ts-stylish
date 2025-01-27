// import mysql from 'mysql2/promise'
import { Sequelize, DataTypes, Model } from 'sequelize'

import {
    ProductSchema,
    ProductVariantSchema,
    ProductColorSchema,
} from './interfaces/product.schema.js'

export class SequelizeManager {
    static sequelizeInstance: Sequelize
    static productInstance: typeof Model & {
        new (): Model<ProductSchema, ProductSchema>
    }
    static productVariantInstance: typeof Model & {
        new (): Model<ProductVariantSchema, ProductVariantSchema>
    }

    static productColorInstance: typeof Model & {
        new (): Model<ProductColorSchema, ProductColorSchema>
    }
    constructor() {}

    static async initSequelize(): Promise<void> {
        try {
            const sequelize = new Sequelize('stylish', 'jeremy', 'jeremy', {
                host: 'localhost',
                dialect: 'mysql',
            })

            await sequelize.authenticate()

            this.sequelizeInstance = sequelize
            console.log('Sql connection ok')
        } catch (err) {
            throw err
        }
    }

    static initProductModel() {
        const sequelize = this.sequelizeInstance
        class ProductInstance
            extends Model<ProductSchema, ProductSchema>
            implements ProductSchema
        {
            public category!: string
            public title!: string
            public description!: string
            public price!: number
            public texture!: string
            public wash!: string
            public place!: string
        }

        ProductInstance.init(
            {
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
            },
            {
                sequelize,
                tableName: 'products',
                timestamps: true,
                underscored: true,
            }
        )

        this.productInstance = ProductInstance as typeof Model & {
            new (): Model<ProductSchema, ProductSchema>
        }
    }

    static initProductVariantModel() {
        const sequelize = this.sequelizeInstance
        class ProductVariantInstance
            extends Model<ProductVariantSchema, ProductVariantSchema>
            implements ProductVariantSchema
        {
            public color_code!: string
            public size!: string
            public stock!: number
            public product_id!: number
        }

        ProductVariantInstance.init(
            {
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
            },
            {
                sequelize,
                tableName: 'variants',
                timestamps: true,
                underscored: true,
            }
        )

        this.productVariantInstance = ProductVariantInstance as typeof Model & {
            new (): Model<ProductVariantSchema, ProductVariantSchema>
        }
    }

    static initProductColorModel() {
        const sequelize = this.sequelizeInstance
        class ProductColorInstance
            extends Model<ProductColorSchema, ProductColorSchema>
            implements ProductColorSchema
        {
            public color!: string
            public code!: string
            public product_id!: number
        }

        ProductColorInstance.init(
            {
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
            },
            {
                sequelize,
                tableName: 'colors',
                timestamps: true,
                underscored: true,
            }
        )

        this.productColorInstance = ProductColorInstance as typeof Model & {
            new (): Model<ProductColorSchema, ProductColorSchema>
        }
    }

    static establishRelationship() {
        this.getProductInstance().hasMany(this.getProductVariantInstance(), {
            foreignKey: 'product_id',
        })

        this.getProductInstance().hasMany(this.getProductColorInstance(), {
            foreignKey: 'product_id',
        })
    }

    static getProductInstance() {
        return this.productInstance
    }

    static getProductVariantInstance() {
        return this.productVariantInstance
    }

    static getProductColorInstance() {
        return this.productColorInstance
    }

    static getSequelizeInstance() {
        return this.sequelizeInstance
    }
}
