import {
  BoxIcon,
  CalendarIcon,
  LayoutGridIcon,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PluginIcon,
  TableIcon,
  UserCircleIcon,
} from '@/icons/layout'
import type { NavItem } from './types'

export const navItems: NavItem[] = [
  {
    icon: LayoutGridIcon,
    name: 'Dashboard',
    subItems: [{ name: 'Ecommerce', path: '/' }],
  },
  {
    icon: CalendarIcon,
    name: 'Calendar',
    path: '/calendar',
  },
  {
    icon: UserCircleIcon,
    name: 'User Profile',
    path: '/profile',
  },
  {
    icon: ListIcon,
    name: 'Forms',
    subItems: [{ name: 'Form Elements', path: '/form-elements' }],
  },
  {
    icon: TableIcon,
    name: 'Tables',
    subItems: [{ name: 'Basic Tables', path: '/basic-tables' }],
  },
  {
    icon: PageIcon,
    name: 'Pages',
    subItems: [
      { name: 'Blank Page', path: '/blank' },
      { name: '404 Error', path: '/error-404' },
    ],
  },
]

export const othersItems: NavItem[] = [
  {
    icon: PieChartIcon,
    name: 'Charts',
    subItems: [
      { name: 'Line Chart', path: '/line-chart' },
      { name: 'Bar Chart', path: '/bar-chart' },
    ],
  },
  {
    icon: BoxIcon,
    name: 'UI Elements',
    subItems: [
      { name: 'Alerts', path: '/alerts' },
      { name: 'Avatar', path: '/avatars' },
      { name: 'Badge', path: '/badge' },
      { name: 'Buttons', path: '/buttons' },
      { name: 'Images', path: '/images' },
      { name: 'Videos', path: '/videos' },
    ],
  },
  {
    icon: PluginIcon,
    name: 'Authentication',
    subItems: [
      { name: 'Sign In', path: '/signin' },
      { name: 'Sign Up', path: '/signup' },
    ],
  },
]
