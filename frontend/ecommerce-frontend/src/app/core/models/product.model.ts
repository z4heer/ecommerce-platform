export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    stock_quantity: number;
    image_url?: string;
    created_at?: string;
}