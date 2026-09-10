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
        <SidebarGroup className="">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<a href="/" />}
                isActive={pathName === "/"}
                className=" data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:font-medium"
              >
                <ClipboardList className="size-10" />
                <span className="text-2xl">Book Now</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<a href="/admin" />}
                isActive={pathName === "/admin"}
                className="data-[active=true]:bg-primary
    data-[active=true]:text-primary-foreground
    data-[active=true]:font-medium"
              >
                <CalendarDays className="size-5" />
                <span>Past Bookings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
