"use client"

// import { useSidebar } from '@/store/use-sidebar';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
// import { ToggleSkeleton } from './toggle';
import { useSidebar } from '@/store/use-sidebar';
// import { RecommendedSkeleton } from './recommended';
// import { FollowingSkeleton } from './following';

interface WrapperProps {
    children: React.ReactNode;
};

function Wrapper({
    children,
}: WrapperProps) {

    const [isClient, setIsClient] = useState(false);

    const { collapsed } = useSidebar((state) => state)

    useEffect(() => {
        setIsClient(true)
    }, []);

    if (!isClient) {
        return (
            <>
                <aside
                    className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50 overflow-auto custom-scrollbar"
                >

                </aside>

                <style jsx>{`
                /* Personaliza el ancho de la barra de desplazamiento */
                .custom-scrollbar::-webkit-scrollbar {
                  width: 10px;
                }

                /* Personaliza el fondo de la barra de desplazamiento */
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: #f1f1f1;
                }

                /* Personaliza el aspecto del pulgar de la barra de desplazamiento */
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: #888;
                }

                /* Cambia el color del pulgar de la barra de desplazamiento al pasar el ratón */
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: #555;
                }
            `}</style>

            </>
        )
    }

    return (
        <>
            <aside
                className={cn(
                    "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50 overflow-auto custom-scrollbar",
                    collapsed && "w-[70px]")}
            >
                {children}
            </aside>
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                  display: none;
                }

            `}</style>

        </>

    )
}

export default Wrapper