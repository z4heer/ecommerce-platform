import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AdminOrdersService } from '../../services/admin-orders.service';
import { OrderResponse } from '../../../../core/models/order.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSelectModule, MatFormFieldModule, FormsModule, MatSnackBarModule],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  private readonly adminOrdersService = inject(AdminOrdersService);
  private readonly snackBar = inject(MatSnackBar);

  readonly orders = signal<OrderResponse[]>([]);
  readonly displayedColumns: string[] = ['id', 'status', 'totalAmount', 'createdAt', 'actions'];

  readonly orderStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.adminOrdersService.getAllOrders().subscribe({
      next: (orders) => this.orders.set(orders),
      error: (err) => console.error('Failed to load orders', err)
    });
  }

  onStatusChange(order: OrderResponse, newStatus: string): void {
    if (order.status === newStatus) return;

    this.adminOrdersService.updateOrderStatus(order.id, newStatus).subscribe({
      next: (updatedOrder) => {
        this.snackBar.open(`Order status updated to ${newStatus}`, 'Close', { duration: 3000 });
        this.loadOrders();
      },
      error: (err) => {
        this.snackBar.open(`Failed to update order status: ${err.error?.detail || err.message}`, 'Close', { duration: 3000 });
        this.loadOrders(); // Reset select
      }
    });
  }
}
