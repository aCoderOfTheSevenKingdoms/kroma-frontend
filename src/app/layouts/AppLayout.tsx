import { Outlet } from "react-router"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Navbar } from "@/features/home/components/Navbar"
import { AppSidebar } from "@/features/home/components/Sidebar"

const AppLayout = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-svh w-full flex-1 flex-col bg-background p-[0.6rem] md:p-[1rem] lg:p-[1.8rem]">
        <Navbar />
        <main className="flex-1 px-[0.5rem]">
          <Outlet />
        </main>
      </div>
      <div className="lg:hidden">
        <AppSidebar />
      </div>
    </SidebarProvider>
  )
}

export default AppLayout
