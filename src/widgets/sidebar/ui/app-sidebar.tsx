import { GalleryVerticalEnd } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/shared/ui/shad-cn/sidebar'
import SidebarUser from '@/widgets/sidebar/ui/sidebar-user'
import { ComponentProps, Suspense } from 'react'
import { getServerUser } from '@/entities/user/api/get-server-user'
import NavMenu from '@/widgets/sidebar/ui/nav-menu'

export async function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const user = getServerUser()
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Documentation</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <NavMenu />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={'...'}>
          <SidebarUser userPromise={user} />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  )
}
