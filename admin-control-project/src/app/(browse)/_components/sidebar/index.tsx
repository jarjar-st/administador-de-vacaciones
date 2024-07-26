import { Button } from "@/components/ui/button";
import { Toggle } from "./toggle";
import Wrapper from "./wrapper";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FaLock } from "react-icons/fa6";
import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { MenuItems } from "./menu-items";
import { ModeToggle } from "@/components/toggle-dark";



export const Sidebar = async () => {



    return (
        <Wrapper>
            <div>
                <ModeToggle />
            </div>
            <Toggle />
            <div className="space-y-4 pt-4 lg:pt-0 ">
                <MenuItems />
            </div>


        </Wrapper>
    );
};

// export const SidebarSkeleton = () => {
//   return (
//     <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
//       <ToggleSkeleton/>
//       <FollowingSkeleton />
//       <RecommendedSkeleton />
//     </aside>
//   );
// };