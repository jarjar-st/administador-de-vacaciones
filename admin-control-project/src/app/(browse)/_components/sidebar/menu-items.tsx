"use client"

import React, { useState } from 'react'
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
import Link from 'next/link';
import Auth from '@/components/Auth';


export const MenuItems = () => {
    const { collapsed } = useSidebar((state) => state);
    const { onExpand } = useSidebar((state) => state);
    const [clickedButtonId, setClickedButtonId] = useState(null);

    const handleButtonClick = (buttonId: any) => {
        setClickedButtonId(clickedButtonId === buttonId ? null : buttonId); // Toggle del estado
    }

    return (
        <>
            <Auth permissions={["ver seguridad"]}>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger onClick={() => {
                            if (collapsed) {
                                onExpand()
                            }
                        }}><span className=" pl-3 mr-[-20px]"><FaLock /></span><span className={cn(" font-normal", collapsed ? "hidden" : "block")}>Seguridad</span></AccordionTrigger>


                        <AccordionContent>
                            <Button
                                variant={`${clickedButtonId === 'seguridad-usuarios' ? 'default' : 'link'}`}
                                className={`w-full rounded-none`}
                                onClick={() => handleButtonClick('seguridad-usuarios')}
                            >
                                <Link href={"/usuarios"}>
                                    Usuario
                                </Link>
                            </Button>
                        </AccordionContent>


                        <AccordionContent>
                            <Button
                                variant={`${clickedButtonId === 'seguridad-rol' ? 'default' : 'link'}`}
                                className={`w-full rounded-none`}
                                onClick={() => handleButtonClick('seguridad-rol')}
                            >
                                <Link href={"/rol"}>
                                    Rol
                                </Link>
                            </Button>
                        </AccordionContent>


                    </AccordionItem>
                </Accordion>
            </Auth>
            <Auth permissions={["ver reserva sala"]}>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger><span className=" pl-3 mr-[-20px]"><FaVideo /></span><span className={cn(" font-normal", collapsed ? "hidden" : "block")}>Reserva de Video</span></AccordionTrigger>

                        <AccordionContent>
                            <Button
                                variant={`${clickedButtonId === 'reserva-sala' ? 'default' : 'link'}`}
                                className={`w-full rounded-none`}
                                onClick={() => handleButtonClick('reserva-sala')}
                            >
                                <Link href={"/formulario-grabacion"}>
                                    Reservar Sala
                                </Link>
                            </Button>
                        </AccordionContent>
                        <AccordionContent>
                            <Button
                                variant={`${clickedButtonId === 'solicitud-sala' ? 'default' : 'link'}`}
                                className={`w-full rounded-none`}
                                onClick={() => handleButtonClick('solicitud-sala')}
                            >
                                <Link href={"/solicitudes-grabacion"}>
                                    solicitudes
                                </Link>
                            </Button>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Auth>
            <Auth permissions={["ver inventario"]}>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger><span className=" pl-3 mr-[-20px]"><FaBox /></span><span className={cn(" font-normal", collapsed ? "hidden" : "block")}>Inventario</span></AccordionTrigger>
                        <AccordionContent>
                            <Button
                                variant={`${clickedButtonId === 'inventario-registro' ? 'default' : 'link'}`}
                                className={`w-full rounded-none`}
                                onClick={() => handleButtonClick('inventario-registro')}
                            >
                                <Link href={"/formulario-inventario"}>
                                    Registrar equipo
                                </Link>
                            </Button>
                        </AccordionContent>

                    </AccordionItem>
                </Accordion>
            </Auth>
            <Auth permissions={["ver vacaciones"]}>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger><span className=" pl-3 mr-[-20px]"><FaUmbrellaBeach /></span><span className={cn(" font-normal", collapsed ? "hidden" : "block")}>Vacaciones</span></AccordionTrigger>
                        <AccordionContent>
                            <Button
                                variant={`${clickedButtonId === 'formulario-vacaciones' ? 'default' : 'link'}`}
                                className={`w-full rounded-none`}
                                onClick={() => handleButtonClick('formulario-vacaciones')}
                            >
                                <Link href={"/formulario-vacaciones"}>
                                    Solicitar Vacaciones
                                </Link>
                            </Button>
                        </AccordionContent>
                        <AccordionContent>
                            <Button
                                variant={`${clickedButtonId === 'solicitudes-vacaciones' ? 'default' : 'link'}`}
                                className={`w-full rounded-none`}
                                onClick={() => handleButtonClick('solicitudes-vacaciones')}
                            >
                                <Link href={"/solicitudes-vacaciones"}>
                                    Solicitudes de Vacaciones
                                </Link>
                            </Button>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Auth>
            <Auth permissions={["ver mantenimiento"]}>
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
            </Auth>
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
