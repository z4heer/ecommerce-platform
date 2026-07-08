import { NavigationItem } from '../shared/models/navigation-item.model';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: '/dashboard',
    enabled: true,
  },
  {
    label: 'Products',
    icon: 'inventory_2',
    route: '/products',
    enabled: true,
  },
  {
    label: 'Orders',
    icon: 'shopping_cart',
    route: '/orders',
    enabled: true,
  },
  {
    label: 'Cart',
    icon: 'shopping_bag',
    route: '/cart',
    enabled: true,
  },
  {
    label: 'Customers',
    icon: 'groups',
    route: '/customers',
    enabled: false,
  },
  {
    label: 'Reports',
    icon: 'analytics',
    route: '/reports',
    enabled: false,
  },
  {
    label: 'Administration',
    icon: 'admin_panel_settings',
    route: '/admin',
    enabled: false,
  },
];
