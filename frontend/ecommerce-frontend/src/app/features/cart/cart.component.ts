import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { PageHeaderComponent } from '../../layout/page-header/page-header.component';
import { AppCardComponent } from '../../shared/components/app-card/app-card.component';
import { LayoutService } from '../../layout/services/layout.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, AppCardComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  protected cartService = inject(CartService);
  protected layoutService = inject(LayoutService);
}
