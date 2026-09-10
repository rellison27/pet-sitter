"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CalendarDays, ClipboardList } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AppSidebar() {
  const pathName = usePathname();

  return (
    <Sidebar side="left" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<a href="/" />}
                isActive={pathName === "/"}
                className=" h-11 px-3 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:font-medium"
              >
                <CalendarDays className="size-5" />

                <span className="text-base">Book Now</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<a href="/admin" />}
                isActive={pathName === "/admin"}
                className="h-11 px-3 data-[active=true]:bg-primary
    data-[active=true]:text-primary-foreground
    data-[active=true]:font-medium"
              >
                <ClipboardList className="size-5" />
                <span className="text-base">Past Bookings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
