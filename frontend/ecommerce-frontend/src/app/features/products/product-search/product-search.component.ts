import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  // Local signal state tracking input value
  public readonly searchText = signal<string>('');

  // Angular 19 output event emitter replacement
  public readonly searchChange = output<string>();

  public search(): void {
    this.searchChange.emit(this.searchText());
  }
}