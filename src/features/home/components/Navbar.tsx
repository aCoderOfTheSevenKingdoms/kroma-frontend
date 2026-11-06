import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Link, useNavigate } from "react-router"
import { useSidebar } from "@/components/ui/sidebar"
import { HamburgerIcon } from "./HamburgerIcon"
import { navLinks } from "./nav-links"
import { Button } from "@/components/ui/button"

export const Navbar = () => {
  const { toggleSidebar } = useSidebar()
  const navigate = useNavigate();

  return (
    <header className="relative flex w-full items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center">
      <div className="flex items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Open menu"
          className="inline-flex size-9 items-center justify-center rounded-md transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <HamburgerIcon className="h-4 w-5" />
        </button>
        <Link to="/home" className="text-lg font-bold">
          Kroma.
        </Link>
      </div>

      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList className="justify-start">
          {navLinks.map((item) => (
            <NavigationMenuItem key={item.href}>
              <Button
                type="button"
                variant={"link"}
                className={`cursor-pointer`}
                onClick={() => navigate(item.href)}
              >
                {item.title}
              </Button>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <Link
        to="/home"
        className="hidden text-center text-xl font-bold lg:block lg:text-2xl"
      >
        Kroma.
      </Link>

      <div className="hidden lg:block" />
    </header>
  )
}
