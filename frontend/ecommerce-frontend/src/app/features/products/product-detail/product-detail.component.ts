import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Product } from '../../../core/models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './product-detail.component.html',
  styles: [`
    .detail-container {
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
    }
    .back-btn {
      margin-bottom: 16px;
    }
    .product-card {
      padding: 16px;
    }
    .info-row {
      margin: 12px 0;
      font-size: 16px;
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  private readonly location = inject(Location);

  public readonly product = signal<Product | undefined>(undefined);

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (product) => {
          console.log('Detail Data Payload:', product); // Check properties here if stock is still empty!
          this.product.set(product);
        },
        error: (err) => console.error('Error fetching product metadata detail:', err)
      });
    }
  }

  public goBack(): void {
    // Falls back gracefully or navigates directly back to the catalog grid
    this.router.navigate(['/products']);
  }
}