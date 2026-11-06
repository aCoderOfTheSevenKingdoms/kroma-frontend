import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { SearchBar } from "./SearchBar";
import { HomeCarousel } from "./HomeCarousel";
import { RightArrowLong } from "./RightArrowLong";

const navLinks = [
        {title: "men", href: "/collections/men"},
        {title: "women", href: "/collections/women"},
        {title: "kids", href: "/collections/kids"}
];

export const HomeSection1 = () => {

   const navigate = useNavigate();

    return (
        <section className={`pt-[3.2rem]`}>
            <div className={`flex flex-col gap-0.5`}>
              {navLinks.map((item) => {
                return (<Button
                  key={item.href}
                  type="button"
                  variant={`link`}
                  className={`max-w-[8rem] px-0 h-min justify-start`}
                  onClick={() => navigate(item.href)}
                > 
                   {item.title.toUpperCase()} 
                </Button>) 
              })}
            </div>

            <SearchBar className={`mt-4`}/>

            <p className={`mt-8 font-bold text-[2.6rem] leading-none`}>NEW COLLECTION</p>
            <p className={`max-w-[6rem] text-sm mt-1.5 font-thin text-wrap`}>Summer 2026</p>

            <div className={`mt-8 flex justify-center lg:hidden`}>
                <HomeCarousel/>
            </div>

            <Button variant={`outline`} className={`mt-4 px-5 py-3 flex gap-3`}>
                <span className={`text-sm`}>Go To Shop</span>
                <RightArrowLong className={``} />
            </Button>
        </section>
    )
}