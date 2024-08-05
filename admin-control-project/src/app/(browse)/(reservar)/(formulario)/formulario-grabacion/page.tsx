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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Backend_URL } from '@/lib/constants';

interface EstadoSolicitudGrabacion {
    Cod_Estado_Solicitud_Grabacion: number;
    Descripcion: string;
}

interface Estudio {
    Cod_Estudio: number;
    Descripcion: string;
}

interface TipoGrabacion {
    Cod_Tipo_Grabacion: number;
    Descripcion: string;
}

const grabacionSchema = z.object({
    Titulo: z.string()
        .min(1, "Título es requerido")
        .max(100, "Máximo 100 caracteres"),
    Descripcion: z.string()
        .min(1, "Descripción es requerida")
        .max(500, "Máximo 500 caracteres"),
    Fecha_Grabacion: z.string().optional(),
    Cod_Estado_Solicitud_Grabacion: z.number().min(1, "Código de Estado es requerido"),
    Cod_Estudio: z.number().min(1, "Código de Estudio es requerido"),
    Cod_Tipo_Grabacion: z.number().min(1, "Código de Tipo de Grabación es requerido"),
});

const FormGrabacion = () => {
    const { data: session } = useSession();
    const router = useRouter();
    
    const form = useForm<z.infer<typeof grabacionSchema>>({
        resolver: zodResolver(grabacionSchema),
        defaultValues: {
            Titulo: "",
            Descripcion: "",
            Fecha_Grabacion: "",
            Cod_Estado_Solicitud_Grabacion: 0,
            Cod_Estudio: 0,
            Cod_Tipo_Grabacion: 0,
        }
    });

    const [estados, setEstados] = useState<EstadoSolicitudGrabacion[]>([]);
    const [estudios, setEstudios] = useState<Estudio[]>([]);
    const [tipos, setTipos] = useState<TipoGrabacion[]>([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [estadosRes, estudiosRes, tiposRes] = await Promise.all([
                    fetch(`${Backend_URL}/solicitudes/estados`, {
                        headers: { 'Authorization': `Bearer ${session?.backendTokens.accessToken}` },
                    }),
                    fetch(`${Backend_URL}/solicitudes/estudios`, {
                        headers: { 'Authorization': `Bearer ${session?.backendTokens.accessToken}` },
                    }),
                    fetch(`${Backend_URL}/solicitudes/tipos`, {
                        headers: { 'Authorization': `Bearer ${session?.backendTokens.accessToken}` },
                    }),
                ]);

                if (estadosRes.ok) setEstados(await estadosRes.json());
                if (estudiosRes.ok) setEstudios(await estudiosRes.json());
                if (tiposRes.ok) setTipos(await tiposRes.json());
            } catch (error) {
                console.error('Error fetching options:', error);
                toast.error('Error al cargar las opciones de select');
            }
        };

        fetchOptions();
    }, [session?.backendTokens.accessToken]);

    const onSubmit = async (values: z.infer<typeof grabacionSchema>) => {
        const fechaGrabacionRaw = values.Fecha_Grabacion;
        if (fechaGrabacionRaw) {
            values.Fecha_Grabacion = new Date(fechaGrabacionRaw).toISOString();
        }

        try {
            const url = `${Backend_URL}/solicitudes/crear-solicitud`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.backendTokens.accessToken}`,
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Error creando solicitud:', errorResponse);
                toast.error(`Error: ${errorResponse.message}`);
            } else {
                toast.success('Solicitud creada con éxito!');
                router.push("/"); // Cambia a la ruta que necesites después de la creación
            }
        } catch (error) {
            toast.error('Error al crear la solicitud');
        }
    };

    return (
        <div className="flex justify-center h-[450px] overflow-y-auto custom-scrollbar-form">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 w-full max-w-lg">
                    <FormField
                        control={form.control}
                        name="Titulo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Título</FormLabel>
                                <FormControl>
                                    <Input placeholder="Título" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Descripcion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descripción</FormLabel>
                                <FormControl>
                                    <textarea placeholder="Descripción" {...field} className="w-full" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Fecha_Grabacion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha de Grabación</FormLabel>
                                <FormControl>
                                    <Input type="date" placeholder="Fecha de Grabación" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Cod_Estado_Solicitud_Grabacion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estado de la Solicitud</FormLabel>
                                <FormControl>
                                    <select
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                        value={field.value}
                                        className="w-full"
                                    >
                                        {estados.map((estado) => (
                                            <option key={estado.Cod_Estado_Solicitud_Grabacion} value={estado.Cod_Estado_Solicitud_Grabacion}>{estado.Descripcion}</option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Cod_Estudio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estudio</FormLabel>
                                <FormControl>
                                    <select
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                        value={field.value}
                                        className="w-full"
                                    >
                                        {estudios.map((estudio) => (
                                            <option key={estudio.Cod_Estudio} value={estudio.Cod_Estudio}>{estudio.Descripcion}</option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Cod_Tipo_Grabacion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo de Grabación</FormLabel>
                                <FormControl>
                                    <select
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                        value={field.value}
                                        className="w-full"
                                    >
                                        {tipos.map((tipo) => (
                                            <option key={tipo.Cod_Tipo_Grabacion} value={tipo.Cod_Tipo_Grabacion}>{tipo.Descripcion}</option>
                                        ))}
                                    </select>
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

export default FormGrabacion;
