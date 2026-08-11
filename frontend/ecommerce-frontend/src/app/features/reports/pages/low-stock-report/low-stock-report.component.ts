import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { API_CONSTANTS } from '../../../../core/constants/api.constants';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

interface LowStockResponse {
  product_id: string;
  name: string;
  sku: string;
  stock_quantity: number;
  last_updated: string;
}

@Component({
  selector: 'app-low-stock-report',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule, MatTooltipModule],
  templateUrl: './low-stock-report.component.html',
  styleUrls: ['./low-stock-report.component.scss']
})
export class LowStockReportComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${API_CONSTANTS.BASE_URL}/admin/reports/low-stock`;

  readonly lowStockItems = signal<LowStockResponse[]>([]);
  readonly displayedColumns: string[] = ['name', 'sku', 'stockQuantity', 'lastUpdated'];
  readonly totalSalesVolume = signal<number>(1250); // Hardcoded summary metric for this example

  ngOnInit(): void {
    this.http.get<LowStockResponse[]>(this.apiUrl).subscribe({
      next: (data) => this.lowStockItems.set(data),
      error: (err) => console.error('Failed to load low stock items', err)
    });
  }
}
