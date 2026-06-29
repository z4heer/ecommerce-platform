import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { ProductService }
  from '../../../core/services/product.service';

@Component({
  selector: 'app-product-category-filter',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl:
    './product-category-filter.component.html'
})
export class ProductCategoryFilterComponent {

  categories: string[] = [
    'Electronics',
    'Books',
    'Clothing',
    'Sports',
    'Home'
  ];

  constructor(
    private productService: ProductService
  ) { }

  onCategoryChange(
    category: string
  ): void {

    this.productService
      .filterByCategory(category);
  }
}