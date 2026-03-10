import { CalendarDays, LayoutDashboard, Scissors, Users } from 'lucide-react'

interface Props {
	clientsPageParams: string
	servicesPageParams: string
}

export const getNavMain = ({ clientsPageParams, servicesPageParams }: Props) => {
	return [
		{
			title: 'Dashboard',
			url: '/dashboard',
			icon: <LayoutDashboard />
		},
		{
			title: 'Appointments',
			url: `/appointments`,
			icon: <CalendarDays />
		},
		{
			title: 'Services',
			url: `/services?${servicesPageParams}`,
			icon: <Scissors />
		},
		{
			title: 'Clients',
			url: `/clients?${clientsPageParams}`,
			icon: <Users />
		}
	]
}
