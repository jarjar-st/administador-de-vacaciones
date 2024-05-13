"use client"

import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FaLock, FaUmbrellaBeach, FaToolbox, FaFolderOpen, FaBox, FaVideo } from "react-icons/fa6";
import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


export const MenuItems = () => {
    const { collapsed } = useSidebar((state) => state);
    const { onExpand} = useSidebar((state) => state);
    return (
        <>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger onClick={() => {
                        if (collapsed) {
                            onExpand()
                        }
                    }}><span className=" pl-3 mr-[-20px]"><FaLock /></span><span className={cn(" font-normal", collapsed ? "hidden" : "block")}>Seguridad</span></AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                    <AccordionContent>
                        <Button>Algo</Button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger><span className=" pl-3 mr-[-20px]"><FaVideo /></span><span className={cn(" font-normal", collapsed ? "hidden" : "block")}>Reserva de Video</span></AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                    <AccordionContent>
                        <Button>Algo</Button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger><span className=" pl-3 mr-[-20px]"><FaBox /></span><span className={cn(" font-normal", collapsed ? "hidden" : "block")}>Inventario</span></AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                    <AccordionContent>
                        <Button>Algo</Button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger><span className=" pl-3 mr-[-20px]"><FaUmbrellaBeach /></span><span className={cn(" font-normal", collapsed ? "hidden" : "block")}>Vacaciones</span></AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                    <AccordionContent>
                        <Button>Algo</Button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger><span className=" pl-3 mr-[-20px]"><FaToolbox /></span><span className={cn(" font-normal", collapsed ? "hidden" : "block")}>Mantenimiento</span></AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                    <AccordionContent>
                        <Button>Algo</Button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger><span className=" pl-3 mr-[-20px]"><FaFolderOpen /></span><span className={cn(" font-normal", collapsed ? "hidden" : "block")}>Administracion</span></AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                    <AccordionContent>
                        <Button>Algo</Button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </>
    )
}
