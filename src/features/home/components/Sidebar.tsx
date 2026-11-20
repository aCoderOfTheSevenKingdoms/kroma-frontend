import { Link, useLocation } from "react-router"
import { XIcon } from "lucide-react"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/app.store"
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
import { useNavLinks } from "./nav-links"
import { useAuth } from "@/features/auth/hook/useAuth"

export const AppSidebar = () => {
  const { setOpenMobile } = useSidebar()
  const location = useLocation()
  const { handleLogout } = useAuth()
  const navLinks = useNavLinks()
  const user = useSelector((state: RootState) => state.auth.user)

  const homeHref = user ? "/home" : "/products"

  const closeSidebar = () => setOpenMobile(false)

  return (
    <Sidebar collapsible="offcanvas" side="left">
      <SidebarHeader className="flex-row items-center justify-between border-b p-4">
        <Link
          to={homeHref}
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
        {user ? (
          <Button
            className={`w-full bg-secondary-bg-color text-red-500 hover:bg-[#c4bebe]`}
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <div className="flex w-full flex-col gap-2">
            <Button
              className="w-full"
              render={<Link to="/login" onClick={closeSidebar} />}
            >
              Login
            </Button>
            <Button
              variant="outline"
              className="w-full"
              render={<Link to="/register" onClick={closeSidebar} />}
            >
              Register
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
