import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/shared/ui/shad-cn/sidebar";
import {AppSidebar} from "@/widgets/sidebar/ui/app-sidebar";
import {Separator} from "@/shared/ui/shad-cn/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/shared/ui/shad-cn/breadcrumb";
import {ToggleThemeButton} from "@/shared/ui/toggle-theme-button";
import {CSSProperties, ReactNode} from "react";

interface Props {
    children: ReactNode
}

export default function Layout({children}: Props) {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "19rem",
                } as CSSProperties
            }
        >
            <AppSidebar/>
            <SidebarInset className="">
                <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1"/>
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Building Your Application
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block"/>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex-1"/>
                    <ToggleThemeButton/>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}