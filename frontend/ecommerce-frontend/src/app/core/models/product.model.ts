export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock_quantity: number;
  imageUrl?: string;
  created_at?: string;
  updatedAt?: string;
  status?: ProductStatus; // e.g., 'In Stock', 'Low Stock', 'Out of Stock'
}
export type ProductStatus = 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Unknown';
