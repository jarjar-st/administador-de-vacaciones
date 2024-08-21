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

interface Rol {
    Cod_Rol: number;
    Rol: string;
    Descripcion: string;
}

interface Permiso {
    Cod_Permiso: number;
    Descripcion: string;
    Nombre_Permiso: string;
}

const asignarPermisosSchema = z.object({
    rolId: z.number().min(1, "Rol es requerido"),
    permisos: z.array(z.number()).min(1, "Debe seleccionar al menos un permiso")
});

const FormAsignarPermisos = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const form = useForm<z.infer<typeof asignarPermisosSchema>>({
        resolver: zodResolver(asignarPermisosSchema),
        defaultValues: {
            rolId: 0,
            permisos: []
        }
    });

    const [roles, setRoles] = useState<Rol[]>([]);
    const [permisos, setPermisos] = useState<Permiso[]>([]);
    const [rolPermisos, setRolPermisos] = useState<number[]>([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch(`${Backend_URL}/roles`, {
                    headers: { 'Authorization': `Bearer ${session?.backendTokens.accessToken}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setRoles(data);
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
                toast.error('Error al cargar los roles');
            }
        };

        const fetchPermisos = async () => {
            try {
                const response = await fetch(`${Backend_URL}/roles/permissions`, {
                    headers: { 'Authorization': `Bearer ${session?.backendTokens.accessToken}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setPermisos(data);
                }
            } catch (error) {
                console.error('Error fetching permisos:', error);
                toast.error('Error al cargar los permisos');
            }
        };

        fetchRoles();
        fetchPermisos();
    }, [session?.backendTokens.accessToken]);

    useEffect(() => {
        const fetchRolPermisos = async () => {
            if (form.watch('rolId') !== 0) {
                try {
                    const response = await fetch(`${Backend_URL}/roles/${form.watch('rolId')}/permissions`, {
                        headers: { 'Authorization': `Bearer ${session?.backendTokens.accessToken}` },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setRolPermisos(data.map((permiso: Permiso) => permiso.Cod_Permiso));
                        form.setValue('permisos', data.map((permiso: Permiso) => permiso.Cod_Permiso));
                    }
                } catch (error) {
                    console.error('Error fetching role permissions:', error);
                    toast.error('Error al cargar los permisos del rol');
                }
            } else {
                setRolPermisos([]);
                form.setValue('permisos', []);
            }
        };

        fetchRolPermisos();
    }, [form.watch('rolId'), session?.backendTokens.accessToken]);

    const onSubmit = async (values: z.infer<typeof asignarPermisosSchema>) => {
        try {
            console.log('values:', values);
            const url = `${Backend_URL}/roles/assign-permission`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.backendTokens.accessToken}`,
                },
                body: JSON.stringify({
                    Cod_Rol: values.rolId,
                    Cod_Permisos: values.permisos
                }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Error asignando permisos:', errorResponse);
                toast.error(`Error: ${errorResponse.message}`);
            } else {
                toast.success('Permisos asignados con éxito!');
                router.push("/"); // Cambia a la ruta que necesites después de la asignación
            }
        } catch (error) {
            toast.error('Error al asignar permisos');
        }
    };

    return (
        <Auth permissions={["manejar roles"]}>
            <div className="flex flex-col justify-center gap-28 h-[100vh] items-center overflow-y-auto custom-scrollbar-form">
                <h1 className=' text-5xl font-bold'>Asignar Permisos a Roles</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 w-full max-w-lg">
                        <FormField
                            control={form.control}
                            name="rolId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rol</FormLabel>
                                    <FormControl>
                                        <select
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(parseInt(e.target.value, 10));
                                            }}
                                            value={field.value}
                                            className="w-full"
                                        >
                                            <option value={0}>Seleccione un rol</option>
                                            {roles.map((rol) => (
                                                <option key={rol.Cod_Rol} value={rol.Cod_Rol}>{rol.Rol}</option>
                                            ))}
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="permisos"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Permisos</FormLabel>
                                    <FormControl>
                                        <div>
                                            {permisos.map((permiso) => (
                                                <div key={permiso.Cod_Permiso} className="flex items-center mb-2">
                                                    <input
                                                        type="checkbox"
                                                        value={permiso.Cod_Permiso}
                                                        checked={field.value.includes(permiso.Cod_Permiso)}
                                                        onChange={(e) => {
                                                            const checked = e.target.checked;
                                                            const permisoId = parseInt(e.target.value, 10);
                                                            if (checked) {
                                                                field.onChange([...(field.value ?? []), permisoId]);
                                                            } else {
                                                                field.onChange(
                                                                    (field.value ?? []).filter(id => id !== permisoId)
                                                                );
                                                            }
                                                        }}
                                                    />
                                                    <span className="ml-2">{permiso.Nombre_Permiso}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="col-span-2 flex justify-end">
                            <Button type="submit">Asignar Permisos</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Auth>
    );
};

export default FormAsignarPermisos;
