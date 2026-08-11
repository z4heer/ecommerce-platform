import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { API_CONSTANTS } from '../../../../core/constants/api.constants';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

interface UserResponse {
  id: string;
  email: string;
  is_active: boolean;
  created_at: string;
  role: string;
}

@Component({
  selector: 'app-customer-directory',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatTooltipModule],
  templateUrl: './customer-directory.component.html',
  styleUrls: ['./customer-directory.component.scss']
})
export class CustomerDirectoryComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${API_CONSTANTS.BASE_URL}/admin/users`;

  readonly customers = signal<UserResponse[]>([]);
  readonly displayedColumns: string[] = ['email', 'role', 'isActive', 'createdAt'];

  ngOnInit(): void {
    this.http.get<UserResponse[]>(this.apiUrl).subscribe({
      next: (data) => this.customers.set(data),
      error: (err) => console.error('Failed to load customers', err)
    });
  }
}
