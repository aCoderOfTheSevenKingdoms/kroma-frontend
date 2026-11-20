import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Link, useLocation } from "react-router"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/app.store"
import { useSidebar } from "@/components/ui/sidebar"
import { HamburgerIcon } from "./HamburgerIcon"
import { useNavLinks } from "./nav-links"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth/hook/useAuth"

export const Navbar = () => {
  const { toggleSidebar } = useSidebar()
  const location = useLocation()
  const { handleLogout } = useAuth()
  const navLinks = useNavLinks()
  const user = useSelector((state: RootState) => state.auth.user)

  const homeHref = user ? "/home" : "/products"

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between bg-background/95 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-x-8">
      <div className="flex items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Open menu"
          className="inline-flex size-9 items-center justify-center rounded-md transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <HamburgerIcon className="h-4 w-5" />
        </button>
        <Link to={homeHref} className="text-lg font-bold">
          Kroma.
        </Link>
      </div>

      <NavigationMenu className="hidden lg:flex lg:justify-self-start">
        <NavigationMenuList className="justify-start">
          {navLinks.map((item) => (
            <NavigationMenuItem key={item.href}>
              <Button
                variant="link"
                className={
                  isActive(item.href)
                    ? "underline underline-offset-4"
                    : "text-muted-foreground hover:text-foreground"
                }
                render={<Link to={item.href} />}
              >
                {item.title}
              </Button>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <Link
        to={homeHref}
        className="hidden text-center text-xl font-bold lg:block lg:text-2xl"
      >
        Kroma.
      </Link>

      {user ? (
        <Button
          variant="link"
          className="hidden lg:block lg:justify-self-end"
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : (
        <div className="hidden items-center gap-1 lg:flex lg:justify-self-end">
          <Button variant="link" render={<Link to="/login" />}>
            Login
          </Button>
          <Button size="sm" render={<Link to="/register" />}>
            Register
          </Button>
        </div>
      )}

      <div className="flex items-center lg:hidden">
        {!user && (
          <Button variant="link" size="sm" render={<Link to="/login" />}>
            Login
          </Button>
        )}
        {user && (
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </header>
  )
}
