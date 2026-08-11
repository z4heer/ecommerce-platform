import { Product } from '../../app/core/models/product.model';

export function createProduct(
    overrides: Partial<Product> = {}
): Product {

    return {

        id: 'P-1001',

        name: 'Sample Product',

        description: 'Sample Description',

        category: 'Electronics',

        price: 500,

        stock_quantity: 100,

        status: 'In Stock',

        imageUrl: '',

        created_at: new Date().toISOString(),

        updatedAt: new Date().toISOString(),

        ...overrides

    };

}