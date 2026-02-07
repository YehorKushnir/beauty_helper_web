import {GalleryVerticalEnd} from "lucide-react"

import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/shared/ui/shad-cn/sidebar"
import Link from "next/link";
import SidebarUser from "@/widgets/sidebar/ui/sidebar-user";
import {ComponentProps, Suspense} from "react";
import {getUser} from "@/entities/user/api/user";

const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
        },
        {
            title: "Login",
            url: "/login",
        },
        {
            title: "Sign Up",
            url: "/signup",
        },
        {
            title: "Otp",
            url: "/otp",
        },
    ],
}

export async function AppSidebar({...props}: ComponentProps<typeof Sidebar>) {
    const user = getUser()
    return (
        <Sidebar variant="floating" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div
                                    className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <GalleryVerticalEnd className="size-4"/>
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
                    <SidebarMenu>
                        {data.navMain.map((item, i) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link
                                        href={item.url}
                                        data-active={i === 0}
                                        prefetch={true}
                                    >
                                        {item.title}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Suspense fallback={'...'}>
                    <SidebarUser userPromise={user}/>
                </Suspense>
            </SidebarFooter>
        </Sidebar>
    )
}
