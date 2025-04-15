
import { MessageSquare, BellDot, Settings } from 'lucide-react';

export interface NavItem {
  path: string;
  label: string;
  icon: any; // Using any here as LucideIcon type causes circular dependency issues
}

export const sidebarNavItems: NavItem[] = [
  {
    path: '/admin',
    label: 'Dashboard',
    icon: MessageSquare
  },
  {
    path: '/admin/tickets',
    label: 'Support Tickets',
    icon: MessageSquare
  },
  {
    path: '/admin/announcements',
    label: 'Announcements',
    icon: BellDot
  },
  {
    path: '/admin/settings',
    label: 'Settings',
    icon: Settings
  }
];
