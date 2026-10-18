export interface NotificationItem {
  id: string
  name: string
  avatar: string
  action: string
  project: string
  time: string
  status: 'online' | 'offline' | 'busy'
}
