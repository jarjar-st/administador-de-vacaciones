// admin-control-project/src/app/(browse)/(reservar)/(formulario)/formulario-grabacion/page.tsx

"use client";

import { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Backend_URL } from '@/lib/constants';
import Auth from '@/components/Auth';

interface Sala {
    Cod_Sala: number;
    Nombre_Sala: string;
}

interface Inventario {
    Cod_Inventario: number;
    Nombre_Item: string;
    Cantidad: number;
}

const reservaSchema = z.object({
    Cod_Sala: z.number().min(1, "Sala es requerida"),
    Fecha_Reserva: z.string().optional(),
    Hora_Inicio: z.string().optional(),
    Hora_Fin: z.string().optional(),
    Inventario: z.array(z.object({
        Cod_Inventario: z.number(),
        CantidadSolicitada: z.number().min(1, "Cantidad es requerida")
    })).optional(),

});

const FormReserva = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const form = useForm<z.infer<typeof reservaSchema>>({
        resolver: zodResolver(reservaSchema),
        defaultValues: {
            Cod_Sala: 0,
            Fecha_Reserva: "",
            Hora_Inicio: "",
            Hora_Fin: "",
            Inventario: []
        }
    });

    const [salas, setSalas] = useState<Sala[]>([]);
    const [inventario, setInventario] = useState<Inventario[]>([]);

    useEffect(() => {
        const fetchSalas = async () => {
            try {
                const response = await fetch(`${Backend_URL}/reservas/salas`, {
                    headers: { 'Authorization': `Bearer ${session?.backendTokens.accessToken}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('response data', data);
                    setSalas(data);
                }
            } catch (error) {
                console.error('Error fetching salas:', error);
                toast.error('Error al cargar las salas');
            }
        };

        const fetchInventario = async () => {
            try {
                const response = await fetch(`${Backend_URL}/reservas/inventario`, {
                    headers: { 'Authorization': `Bearer ${session?.backendTokens.accessToken}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('response data', data);
                    setInventario(data);
                }
            } catch (error) {
                console.error('Error fetching inventario:', error);
                toast.error('Error al cargar el inventario');
            }
        };

        fetchSalas();
        fetchInventario();
    }, [session?.backendTokens.accessToken]);

    const onSubmit = async (values: z.infer<typeof reservaSchema>) => {
        const fechaReservaRaw = values.Fecha_Reserva;
        const horaInicioRaw = values.Hora_Inicio;
        const horaFinRaw = values.Hora_Fin;

        if (fechaReservaRaw) {
            values.Fecha_Reserva = new Date(fechaReservaRaw).toISOString();
        }

        if (horaInicioRaw) {
            values.Hora_Inicio = new Date(`${fechaReservaRaw}T${horaInicioRaw}`).toISOString();
        }

        if (horaFinRaw) {
            values.Hora_Fin = new Date(`${fechaReservaRaw}T${horaFinRaw}`).toISOString();
        }

        try {
            const url = `${Backend_URL}/reservas`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.backendTokens.accessToken}`,
                },
                body: JSON.stringify({
                    ...values,
                    Cod_Usuario: session?.user?.Cod_Usuario,
                }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Error creando reserva:', errorResponse);
                toast.error(`Error: ${errorResponse.message}`);
            } else {
                toast.success('Reserva creada con éxito!');
                router.push("/"); // Cambia a la ruta que necesites después de la creación
            }
        } catch (error) {
            toast.error('Error al crear la reserva');
        }
    };

    return (
        <Auth permissions={["ver reserva sala"]}>
            <div className="flex flex-col justify-center gap-28 h-[100vh] items-center overflow-y-auto custom-scrollbar-form">
                <h1 className=' text-5xl font-bold'>Registro de Grabación</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 w-full max-w-lg">
                        <FormField
                            control={form.control}
                            name="Cod_Sala"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sala</FormLabel>
                                    <FormControl>
                                        <select
                                            {...field}
                                            onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                            value={field.value}
                                            className="w-full"
                                        >
                                            <option value={0}>Seleccione una sala</option>
                                            {salas.map((sala) => (
                                                <option key={sala.Cod_Sala} value={sala.Cod_Sala}>{sala.Nombre_Sala}</option>
                                            ))}
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="Fecha_Reserva"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fecha de Reserva</FormLabel>
                                    <FormControl>
                                        <Input type="date" placeholder="Fecha de Reserva" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Hora_Inicio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hora de Inicio</FormLabel>
                                    <FormControl>
                                        <Input type="time" placeholder="Hora de Inicio" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Hora_Fin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hora de Fin</FormLabel>
                                    <FormControl>
                                        <Input type="time" placeholder="Hora de Fin" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Inventario"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Inventario</FormLabel>
                                    <FormControl>
                                        <div>
                                            {inventario.map((item) => {
                                                const selectedItem = (field.value ?? []).find(
                                                    (inv) => inv.Cod_Inventario === item.Cod_Inventario
                                                );
                                                return (
                                                    <div key={item.Cod_Inventario} className="flex items-center mb-2">
                                                        <input
                                                            type="checkbox"
                                                            value={item.Cod_Inventario}
                                                            checked={!!selectedItem}
                                                            onChange={(e) => {
                                                                const checked = e.target.checked;
                                                                const codInventario = parseInt(e.target.value, 10);
                                                                if (checked) {
                                                                    field.onChange([
                                                                        ...(field.value ?? []),
                                                                        { Cod_Inventario: codInventario, CantidadSolicitada: 1 }
                                                                    ]);
                                                                } else {
                                                                    field.onChange(
                                                                        (field.value ?? []).filter(
                                                                            (inv) => inv.Cod_Inventario !== codInventario
                                                                        )
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                        <span className="ml-2">{item.Nombre_Item}</span>
                                                        {selectedItem && (
                                                            <input
                                                                type="number"

                                                                min="1"
                                                                max={item.Cantidad}
                                                                value={selectedItem.CantidadSolicitada}
                                                                onChange={(e) => {
                                                                    const cantidad = parseInt(e.target.value, 10);
                                                                    field.onChange(
                                                                        (field.value ?? []).map((inv) =>
                                                                            inv.Cod_Inventario === item.Cod_Inventario
                                                                                ? { ...inv, CantidadSolicitada: cantidad }
                                                                                : inv
                                                                        )
                                                                    );
                                                                }}
                                                                className="ml-8 w-16 bottom-4"
                                                            />
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="col-span-2 flex justify-end">
                            <Button type="submit">Crear Reserva</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Auth>
    );
};

export default FormReserva;