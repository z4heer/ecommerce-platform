import { ProductStatus } from './product.model';

export interface CartItem {

  productId: string;

  productName: string;

  productImageUrl?: string;

  quantity: number;

  unitPrice: number;

  stockQuantity: number;

  status: ProductStatus;

  addedAt: Date;

}