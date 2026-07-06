import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, retry, timer } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Product } from '../../../core/models/product.model';
import { LoggerService } from '../../../core/services/logger.service';

const PRODUCT_RETRY_COUNT = 2;
const PRODUCT_RETRY_DELAY_MS = 1000;

export interface ProductsQueryState {
  data: Product[];
  loading: boolean;
  error: any | null;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly logger = inject(LoggerService);

  // 1. Unified Reactive Signal State Managers
  private readonly productsState = signal<Product[]>([]);
  private readonly isLoadingState = signal<boolean>(false);
  private readonly errorState = signal<any | null>(null);

  // 2. Pure Read-Only Signal exposure matching modern Angular patterns
  public readonly products = this.productsState.asReadonly();

  // 3. True Angular 19 Native Signal Query replacement for getProductsQuery()
  public readonly productsQuery = computed<ProductsQueryState>(() => ({
    data: this.productsState(),
    loading: this.isLoadingState(),
    error: this.errorState()
  }));

  getProducts(): Observable<Product[]> {
    this.logger.info('Fetching products from API');
    this.isLoadingState.set(true);
    this.errorState.set(null);

    return this.http.get<Product[]>(
      `${environment.api.baseUrl}/products`
    ).pipe(
      retry({
        count: PRODUCT_RETRY_COUNT,
        delay: (error, retryCount) => {
          this.logger.warn(`Retry ${retryCount}/${PRODUCT_RETRY_COUNT} : Products API`);
          return timer(retryCount * PRODUCT_RETRY_DELAY_MS);
        }
      }),
      tap({
        next: (products) => {
          this.productsState.set(products);
          this.isLoadingState.set(false);
        },
        error: (err) => {
          this.logger.error('Failed to load products', err);
          this.errorState.set(err);
          this.isLoadingState.set(false);
        }
      })
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.api.baseUrl}/products/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.api.baseUrl}/products`, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${environment.api.baseUrl}/products/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.api.baseUrl}/products/${id}`);
  }

  // NOTE: filterProducts and filterByCategory are no longer needed since the 
  // presenting UI components can filter the unified products state signal via pure computed operations.
}