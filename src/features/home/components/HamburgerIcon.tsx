import type { SVGProps } from "react";

export const HamburgerIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M26.75 0.75L0.75 0.75" strokeWidth="1.5" strokeLinecap="round" stroke="currentColor"/>
            <path d="M18.75 8.75L0.75 8.75" strokeWidth="1.5" strokeLinecap="round" stroke="currentColor"/>
            <path d="M13.75 16.75H0.75" strokeWidth="1.5" strokeLinecap="round" stroke="currentColor"/>
        </svg>
    )
}
