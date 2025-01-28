export interface Product extends ProductSchema {
    variants: Product_variant[]
    colors: Product_color[]
    sizes: string[]
    images: { image_url: string }[]
}

export interface ProductSchema {
    id?: number
    category: string
    title: string
    description: string
    price: number
    texture: string
    wash: string
    place: string
}

export interface ProductVariantSchema extends Product_variant {
    product_id: number
}

export interface Product_variant {
    color_code: string
    size: string
    stock: number
}

export interface ProductColorSchema extends Product_color {
    product_id: number
}

export interface Product_color {
    color: string
    code: string
}

export interface ProductImageSchema {
    product_id: number
    image_url: string
}
