import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './product-search.component.html'
})
export class ProductSearchComponent {

  searchText = '';

  constructor(
    private productService: ProductService
  ) { }

  search(): void {
    this.productService
      .filterProducts(this.searchText);
  }
}