'use client'

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/shad-cn/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useClientStore } from '@/entities/client/model/client-store'
import { getClientsPageParams } from '@/widgets/sidebar/model/get-clients-page-params'
import { getNavMain } from '@/widgets/sidebar/model/nav-main'
import { useEffect, useMemo, useState } from 'react'
import { useServiceStore } from '@/entities/service/model/service-store'

export default function NavMenu() {
	const pathname = usePathname()
	const {
		page: clientPage,
		limit: clientLimit,
		search: clientSearch,
		status: clientStatus
	} = useClientStore()
	const {
		page: servicePage,
		limit: serviceLimit,
		search: serviceSearch,
		status: serviceStatus
	} = useServiceStore()

	const clientsPageParams = useMemo(
		() =>
			getClientsPageParams({
				page: clientPage,
				limit: clientLimit,
				search: clientSearch,
				status: clientStatus
			}),
		[clientPage, clientLimit, clientSearch, clientStatus]
	)

	const servicesPageParams = useMemo(
		() =>
			getClientsPageParams({
				page: servicePage,
				limit: serviceLimit,
				search: serviceSearch,
				status: serviceStatus
			}),
		[servicePage, serviceLimit, serviceSearch, serviceStatus]
	)
	console.log(clientsPageParams, servicesPageParams)
	return (
		<SidebarMenu>
			{getNavMain({ clientsPageParams, servicesPageParams }).map((item) => (
				<SidebarMenuItem key={item.title}>
					<SidebarMenuButton asChild>
						<Link
							href={item.url}
							data-active={item.url.includes(pathname)}
							prefetch={true}>
							{item.icon}
							{item.title}
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	)
}
