import { Link, useLocation } from "react-router"
import { XIcon } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { navLinks } from "./nav-links"
import { useAuth } from "@/features/auth/hook/useAuth"

export const AppSidebar = () => {
  const { setOpenMobile } = useSidebar()
  const location = useLocation()
  const {handleLogout} = useAuth();

  const closeSidebar = () => setOpenMobile(false)

  return (
    <Sidebar collapsible="offcanvas" side="left">
      <SidebarHeader className="flex-row items-center justify-between border-b p-4">
        <Link
          to="/home"
          onClick={closeSidebar}
          className="text-lg font-bold"
        >
          Kroma.
        </Link>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={closeSidebar}
          aria-label="Close menu"
        >
          <XIcon />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={location.pathname === item.href}
                    size="lg"
                    render={
                      <Link to={item.href} onClick={closeSidebar} />
                    }
                  >
                    {item.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button 
          className={`text-red-500 w-full bg-secondary-bg-color hover:bg-[#c4bebe]`}
          onClick={handleLogout}
        >
          Logout 
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
