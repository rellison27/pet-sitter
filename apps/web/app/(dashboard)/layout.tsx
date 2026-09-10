import AppHeader from "@/components/layout/app-header";
import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import QueryProvider from "./_components/providers/providers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />

        <main className="w-full">
          <header className="flex h-16 items-center gap-3 border-b px-6">
            <SidebarTrigger />
            <AppHeader />
          </header>
          <QueryProvider>
            <ReactQueryDevtools />
            {children}
          </QueryProvider>
        </main>
      </SidebarProvider>
    </div>
  );
}
