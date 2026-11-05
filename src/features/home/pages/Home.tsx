import { SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "../components/Navbar";
import { HomeSidebar } from "../components/Sidebar";

const Home = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-svh w-full flex-1 flex-col bg-background p-[0.6rem] md:p-[1rem] lg:p-[1.8rem]">
        <Navbar />
      </div>
      <div className="lg:hidden">
        <HomeSidebar />
      </div>
    </SidebarProvider>
  )
}

export default Home
