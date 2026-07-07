import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-category-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './product-category-filter.component.html',
})
export class ProductCategoryFilterComponent {
  // Made input signal-driven, default to standard collection values if not provided by parent
  public readonly categories = input<string[]>([
    'Electronics',
    'Books',
    'Clothing',
    'Sports',
    'Home',
  ]);

  // Angular 19 declarative output stream
  public readonly categoryChange = output<string>();

  public onCategoryChange(category: string): void {
    this.categoryChange.emit(category || 'All');
  }
}
