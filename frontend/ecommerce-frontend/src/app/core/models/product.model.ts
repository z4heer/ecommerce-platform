export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    stock_quantity: number;
    imageUrl?: string;
    created_at?: string;
    status?: string; // e.g., 'In Stock', 'Low Stock', 'Out of Stock'   
}
export type ProductStatus = 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Unknown'; 