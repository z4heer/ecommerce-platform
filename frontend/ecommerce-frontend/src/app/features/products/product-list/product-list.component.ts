import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

import { Observable } from 'rxjs';

import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { ProductSearchComponent } from '../product-search/product-search.component';
import { ProductCategoryFilterComponent }
  from '../product-category-filter/product-category-filter.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    ProductSearchComponent,
    ProductCategoryFilterComponent
  ],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  products$!: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private router: RouterModule
  ) { }

  ngOnInit(): void {

    this.productService
      .getProducts()
      .subscribe();

    this.products$ =
      this.productService.products$;
  }
  logout() {
    console.log('Logged out successfully');

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    //this.currentUserSubject.next(false);
    //this.router.navigate(['/login']);

  }
}