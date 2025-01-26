export interface Product extends ProductSchema {
    variants: Product_variant[]
    colors: Product_color[]
    sizes: string[]
    images: string[]
}

export interface ProductSchema {
    category: string
    title: string
    description: string
    price: number
    texture: string
    wash: string
    place: string
}

export interface Product_variant {
    color_code: string
    size: string
    stock: number
}

export interface Product_color {
    color: string
    code: string
}
