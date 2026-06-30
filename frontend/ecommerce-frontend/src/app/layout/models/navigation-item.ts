export interface NavigationItem {

    label: string;

    icon: string;

    route: string;

    enabled: boolean;

    badge?: string;

    requiredRole?: string;

    children?: NavigationItem[];

}