import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Product } from '../models/product.model';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsSubject =
    new BehaviorSubject<Product[]>([]);
  private allProducts: Product[] = [];
  products$ =
    this.productsSubject.asObservable();
  private readonly logger = inject(LoggerService);
  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {

    this.logger.info('Fetching products from API');
    return this.http.get<Product[]>(
      `${environment.api.baseUrl}/products`
    ).pipe(
      tap(products => {
        this.productsSubject.next(products)
        this.allProducts = products;
      }
      )
    );
  }

  getProductById(
    id: string
  ): Observable<Product> {

    return this.http.get<Product>(
      `${environment.api.baseUrl}/products/${id}`
    );
  }

  createProduct(
    product: Product
  ): Observable<Product> {

    return this.http.post<Product>(
      `${environment.api.baseUrl}/products`,
      product
    );
  }

  updateProduct(
    id: string,
    product: Product
  ): Observable<Product> {

    return this.http.put<Product>(
      `${environment.api.baseUrl}/products/${id}`,
      product
    );
  }

  deleteProduct(
    id: string
  ): Observable<void> {

    return this.http.delete<void>(
      `${environment.api.baseUrl}/products/${id}`
    );
  }

  filterProducts(searchTerm: string): void {

    const filtered =
      this.allProducts.filter(product =>
        product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );

    this.productsSubject.next(filtered);
  }

  filterByCategory(
    category: string
  ): void {

    if (!category) {

      this.productsSubject.next(
        this.allProducts
      );

      return;
    }

    const filtered =
      this.allProducts.filter(
        product =>
          product.category === category
      );

    this.productsSubject.next(filtered);
  }
}