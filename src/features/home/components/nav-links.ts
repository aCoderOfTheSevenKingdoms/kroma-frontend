import type { RootState } from "@/app/app.store";
import type { User } from "@/features/auth/auth.types";
import { useSelector } from "react-redux";

export type NavLink = {
  title: string;
  href: string;
};

export function getNavLinks(user: User | null): NavLink[] {
  const isAuthenticatedSeller = user?.user_type === "seller";
  const links: NavLink[] = [];

  if (user) {
    links.push({
      title: "Home",
      href: "/home",
    });
  }

  links.push(
    {
      title: "Collections",
      href: "/collections",
    },
    {
      title: "Products",
      href: isAuthenticatedSeller ? "/products/seller" : "/products"
    }
  );

  return links;
}

export function useNavLinks(): NavLink[] {
  const user = useSelector((state: RootState) => state.auth.user);
  return getNavLinks(user);
}
