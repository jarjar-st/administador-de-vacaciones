"use client";

import { useEffect } from 'react';
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

const vacacionesSchema = z.object({
    Fecha_Inicio: z.string().min(1, "La fecha de inicio es requerida"),
    Fecha_Fin: z.string().min(1, "La fecha de fin es requerida"),
});

const FormVacaciones = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const form = useForm<z.infer<typeof vacacionesSchema>>({
        resolver: zodResolver(vacacionesSchema),
        defaultValues: {
            Fecha_Inicio: "",
            Fecha_Fin: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof vacacionesSchema>) => {
        const fechaInicioRaw = values.Fecha_Inicio;
        const fechaFinRaw = values.Fecha_Fin;

        if (fechaInicioRaw) {
            values.Fecha_Inicio = new Date(fechaInicioRaw).toISOString();
        }

        if (fechaFinRaw) {
            values.Fecha_Fin = new Date(fechaFinRaw).toISOString();
        }

        try {
            const url = `${Backend_URL}/vacaciones`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.backendTokens.accessToken}`,
                },
                body: JSON.stringify({
                    ...values,
                    // Fecha_Solicitud: new Date().toISOString(),
                    Cod_Empleado: session?.user?.Cod_Usuario,
                }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Error creando solicitud de vacaciones:', errorResponse);
                toast.error(`Error: ${errorResponse.message}`);
            } else {
                toast.success('Solicitud de vacaciones creada con éxito!');
                router.push("/"); // Cambia a la ruta que necesites después de la creación
            }
        } catch (error) {
            toast.error('Error al crear la solicitud de vacaciones');
        }
    };

    return (
        <div className="flex flex-col justify-center gap-28 h-[100vh] items-center overflow-y-auto custom-scrollbar-form">
            <h1 className='text-5xl font-bold'>Solicitud de Vacaciones</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 w-full max-w-lg">
                    <FormField
                        control={form.control}
                        name="Fecha_Inicio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha de Inicio</FormLabel>
                                <FormControl>
                                    <Input type="date" placeholder="Fecha de Inicio" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Fecha_Fin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha de Fin</FormLabel>
                                <FormControl>
                                    <Input type="date" placeholder="Fecha de Fin" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="col-span-2 flex justify-end">
                        <Button type="submit">Crear Solicitud</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default FormVacaciones;
