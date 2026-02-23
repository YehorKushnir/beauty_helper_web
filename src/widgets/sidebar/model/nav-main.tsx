import { LayoutDashboard, Users } from 'lucide-react'

export const getNavMain = (clientsPageParams: string) => {
  return [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: <LayoutDashboard />
    },
    {
      title: 'Clients',
      url: `/clients?${clientsPageParams}`,
      icon: <Users />
    }
  ]
}
