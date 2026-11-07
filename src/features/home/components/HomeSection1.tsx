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
        <section className={`pt-[3.2rem] grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] lg:grid-rows-[1fr_auto] lg:gap-x-12`}>
            <div className={`lg:col-start-1 lg:row-start-1`}>
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

              <SearchBar className={`mt-4 rounded-[2px] lg:w-[30vw]`}/>

              <p className={`mt-8 max-w-[20vw] font-bold text-[2.6rem] leading-none`}>NEW COLLECTION</p>
              <p className={`max-w-[6rem] text-sm mt-1.5 font-thin text-wrap`}>Summer 2026</p>
            </div>

            <div className={`mt-8 flex justify-center lg:mt-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:items-center`}>
                <HomeCarousel/>
            </div>

            <Button variant={`outline`} className={`mt-6 px-5 py-3 flex gap-3 rounded-[4px] lg:col-start-1 lg:row-start-2 lg:mt-20 lg:w-[18rem] lg:flex lg:justify-between`}>
                <span className={`text-sm`}>Go To Shop</span>
                <RightArrowLong />
            </Button>
        </section>
    )
}