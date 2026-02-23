'use client'

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/shad-cn/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useClientStore } from '@/entities/client/model/client-store'
import { getClientsPageParams } from '@/widgets/sidebar/model/get-clients-page-params'
import { getNavMain } from '@/widgets/sidebar/model/nav-main'

export default function NavMenu() {
  const pathname = usePathname()
  const page = useClientStore((state) => state.page)
  const limit = useClientStore((state) => state.limit)
  const search = useClientStore((state) => state.search)
  const status = useClientStore((state) => state.status)

  const clientsPagesParams = getClientsPageParams({ page, limit, search, status })

  return (
    <SidebarMenu>
      {getNavMain(clientsPagesParams).map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link href={item.url} data-active={item.url.includes(pathname)} prefetch={true}>
              {item.icon}
              {item.title}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
