"use client";

import { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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

interface Departamento {
    Cod_Departamento: number;
    Departamento: string;
    id: number;
    nombre: string;
}

interface Cargo {
    Cod_Cargo: number;
    Cargo: string;
    id: number;
    nombre: string;
}

interface Rol {
    Cod_Rol: number;
    Rol: string;
    id: number;
    nombre: string;
}

const userSchema = z.object({
    Nombre: z.string()
        .min(1, "Nombre es requerido")
        .regex(/^[a-zA-Z\s]*$/, "Solo se permiten letras")
        .max(50, "Máximo 50 caracteres"),
    Apellido: z.string()
        .min(1, "Apellido es requerido")
        .regex(/^[a-zA-Z\s]*$/, "Solo se permiten letras")
        .max(50, "Máximo 50 caracteres"),
    Identidad: z.string()
        .min(1, "Identidad es requerida")
        .regex(/^[0-9]*$/, "Solo se permiten números")
        .max(13, "Máximo 13 caracteres"),
    Fecha_Nacimiento: z.string().optional(),
    Genero: z.string().min(1, "Género es requerido"),
    Estado_Civil: z.string().min(1, "Estado civil es requerido"),
    Direccion: z.string().min(1, "Dirección es requerida").max(100, "Máximo 100 caracteres"),
    Telefono: z.string()
        .min(1, "Teléfono es requerido")
        .regex(/^[0-9]*$/, "Solo se permiten números")
        .max(8, "Máximo 8 caracteres"),
    Cod_Departamento: z.number().min(1, "Código de Departamento es requerido"),
    Cod_Cargo: z.number().min(1, "Código de Cargo es requerido"),
    Fecha_Contrato: z.string().optional(),
    CorreoElectronico: z.string().email("Correo electrónico inválido"),
    Contrasena: z.string().min(1, "Contraseña es requerida"),
    Cod_Rol: z.number().min(1, "Código de Rol es requerido"),
    Cod_EstadoUsuario: z.number().min(1, "Código de Estado de Usuario es requerido"),
});

interface FormularioUsuarioProps {
    usuario?:
    {
        Cod_Persona: number,
        Nombre: string,
        Apellido: string,
        Identidad: string,
        Fecha_Nacimiento: string,
        Edad: number,
        Genero: string,
        Estado_Civil: string,
        Direccion: string,
        Telefono: string,
        Cod_Empleado: number,
        Cod_Departamento: number,
        Cod_Cargo: number,
        Fecha_Contrato: string,
        Departamento: string,
        Cargo: string,
        Cod_Usuario: number,
        Cod_EstadoUsuario: number,
        CorreoElectronico: string,
        Contrasena: string,
        Cod_Rol: number,
        Intentos_Fallidos: string,
        Fecha_Creacion: string,
        Creado_Por: string,
        Fecha_Modificacion: string,
        Modificado_Por: string,
        Rol: string,
        EstadoUsuario: {
            Cod_EstadoUsuario: number,
            Descripcion: string
        },
        Descripcion: string
    }
    onSuccess?: () => void;
}

const FormUsuario = ({ usuario, onSuccess }: FormularioUsuarioProps) => {
    const { data: session } = useSession();
    const router = useRouter();
    console.log("ESTE ES EL USUARIOOOOOasdasdas", usuario);
    const usuarioDefault = {
        ...usuario,
        Fecha_Nacimiento: usuario?.Fecha_Nacimiento.toString().split('T')[0],
        Fecha_Contrato: usuario?.Fecha_Contrato.toString().split('T')[0]

    }
    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: usuarioDefault ?? {
            Nombre: "",
            Apellido: "",
            Identidad: "",
            Fecha_Nacimiento: "",
            Genero: "",
            Estado_Civil: "",
            Direccion: "",
            Telefono: "",
            Cod_Departamento: 0,
            Cod_Cargo: 0,
            Fecha_Contrato: "",
            Cod_EstadoUsuario: 0,
            CorreoElectronico: "",
            Contrasena: "",
            Cod_Rol: 0,
        }
    });

    // useEffect(() => {
    //     if (usuario) {
    //         form.reset({
    //             ...usuario,
    //             Nombre: usuario.Nombre,
    //             Apellido: usuario.Apellido,
    //             Identidad: usuario.Identidad,
    //             Telefonos: [
    //                 ...usuario.Telefonos.map((telefono) => ({ Telefono: telefono.Telefono.toString() })),

    //             ],
    //             Fecha_Nacimiento: usuario.Fecha_Nacimiento ? usuario.Fecha_Nacimiento.split('T')[0] : "",
    //             Empleados: {
    //                 ...usuario.Empleados,
    //                 Fecha_Contrato: usuario.Empleados.Fecha_Contrato ? usuario.Empleados.Fecha_Contrato.split('T')[0] : usuario.Empleados[0].Fecha_Contrato.split('T')[0],
    //                 Cod_Departamento: usuario.Empleados[0].Cod_Departamento,
    //                 Cod_Cargo: usuario.Empleados[0].Cod_Cargo,
    //             },
    //             Usuarios: {
    //                 ...usuario.Usuarios,
    //                 Contrasena: usuario.Usuarios[0].Contrasena,
    //                 Cod_Rol: usuario.Usuarios[0].Cod_Rol,
    //                 Cod_EstadoUsuario: usuario.Usuarios[0].Cod_EstadoUsuario,

    //             }
    //         });
    //     }
    // }, [usuario, form]);

    // const { fields: telefonosFields, append: appendTelefono } = useFieldArray({
    //     control: form.control,
    //     name: "Telefonos"
    // });

    // const { fields: correosFields, append: appendCorreo } = useFieldArray({
    //     control: form.control,
    //     name: "CorreoElectronico"
    // });

    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
    const [cargos, setCargos] = useState<Cargo[]>([]);
    const [roles, setRoles] = useState<Rol[]>([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [departamentosRes, cargosRes, rolesRes] = await Promise.all([
                    fetch(`${Backend_URL}/usuarios/departamentos`, {
                        headers: { 'Authorization': `Bearer ${session?.backendTokens.accessToken}` },
                    }),
                    fetch(`${Backend_URL}/usuarios/cargos`, {
                        headers: { 'Authorization': `Bearer ${session?.backendTokens.accessToken}` },
                    }),
                    fetch(`${Backend_URL}/usuarios/roles`, {
                        headers: { 'Authorization': `Bearer ${session?.backendTokens.accessToken}` },
                    }),
                ]);

                if (departamentosRes.ok) setDepartamentos(await departamentosRes.json());
                if (cargosRes.ok) setCargos(await cargosRes.json());
                if (rolesRes.ok) setRoles(await rolesRes.json());
            } catch (error) {
                console.error('Error fetching options:', error);
                toast.error('Error al cargar las opciones de select');
            }
        };

        fetchOptions();
    }, [session?.backendTokens.accessToken])

    const onSubmit = async (values: z.infer<typeof userSchema>) => {
        const fechaNacimientoRaw = values.Fecha_Nacimiento;
        if (fechaNacimientoRaw) {
            values.Fecha_Nacimiento = new Date(fechaNacimientoRaw).toISOString();
        }

        const fechaContratoRaw = values.Fecha_Contrato;
        if (fechaContratoRaw) {
            values.Fecha_Contrato = new Date(fechaContratoRaw).toISOString();
        }

        // Agregar Fecha_Creacion y Fecha_Modificacion
        const currentDateISO = new Date().toISOString();
        const Fecha_Creacion = currentDateISO;
        const Fecha_Modificacion = currentDateISO;

        try {
            const url = usuario ? `${Backend_URL}/usuarios/${usuario.Cod_Persona}` : `${Backend_URL}/usuarios/registrar-usuario`;
            const method = usuario ? 'PUT' : 'POST';
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.backendTokens.accessToken}`,
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Error registrando usuario:', errorResponse);
                toast.error(`Error: ${errorResponse.message}`);
            } else {
                toast.success('Usuario registrado con éxito!');
                router.push("/");
            }
        } catch (error) {
            toast.error('Error al registrar el usuario');
        }
    };
    return (
        <div className="flex justify-center h-[450px] overflow-y-auto custom-scrollbar-form">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 w-full max-w-lg">
                    <FormField
                        control={form.control}
                        name="Nombre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre" {...field}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const filteredValue = value.replace(/[^a-zA-Z]/g, '');
                                            field.onChange(filteredValue);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Apellido"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apellido</FormLabel>
                                <FormControl>
                                    <Input placeholder="Apellido" {...field}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const filteredValue = value.replace(/[^a-zA-Z]/g, '');
                                            field.onChange(filteredValue);
                                        }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Identidad"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Identidad</FormLabel>
                                <FormControl>
                                    <Input placeholder="Identidad" {...field} maxLength={13} minLength={13} onChange={(e) => {
                                        const value = e.target.value;
                                        const filteredValue = value.replace(/[a-zA-Z]/g, '');
                                        field.onChange(filteredValue);
                                    }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Fecha_Nacimiento"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha de Nacimiento</FormLabel>
                                <FormControl>
                                    <Input type="date" placeholder="Fecha de Nacimiento" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Genero"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Género</FormLabel>
                                <FormControl>
                                    <select {...field} className="w-full">
                                        <option value="" disabled selected>Seleccione Género</option>
                                        <option value="femenino">Femenino</option>
                                        <option value="masculino">Masculino</option>
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Estado_Civil"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estado Civil</FormLabel>
                                <FormControl>
                                    <select {...field} className="w-full">
                                        <option value="" disabled selected>Seleccione Estado Civil</option>
                                        <option value="soltero">Soltero</option>
                                        <option value="casado">Casado</option>
                                        <option value="divorciado">Divorciado</option>
                                        <option value="viudo">Viudo</option>
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Direccion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dirección</FormLabel>
                                <FormControl>
                                    <textarea placeholder="Dirección" {...field} className="w-full" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="Telefono"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Teléfono</FormLabel>
                                <FormControl>
                                    <Input placeholder="Teléfono" {...field} maxLength={8} minLength={8}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const filteredValue = value.replace(/[a-zA-Z]/g, '');
                                            field.onChange(filteredValue);
                                        }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="CorreoElectronico"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Correo Electrónico</FormLabel>
                                <FormControl>
                                    <Input placeholder="Correo Electrónico" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Cod_Departamento"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Departamento</FormLabel>
                                <FormControl>
                                    <select
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                        value={field.value}
                                        className="w-full"
                                    >
                                        {/* <option value="" disabled >Seleccione Departamento</option> */}
                                        {departamentos.map((dep) => (
                                            <option key={dep.Cod_Departamento} value={dep.Cod_Departamento}>{dep.Departamento}</option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Cod_Cargo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cargo</FormLabel>
                                <FormControl>
                                    <select
                                        {...field}
                                        className="w-full"
                                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                        value={field.value}
                                    >
                                        {/* <option value="" disabled >Seleccione Cargo</option> */}
                                        {cargos.map((cargo) => (
                                            <option key={cargo.Cod_Cargo} value={cargo.Cod_Cargo}>{cargo.Cargo}</option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Fecha_Contrato"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha de Contrato</FormLabel>
                                <FormControl>
                                    <Input type="date" placeholder="Fecha de Contrato" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Contrasena"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Contraseña" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Cod_Rol"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rol</FormLabel>
                                <FormControl>
                                    <select {...field} className="w-full"
                                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                        value={field.value}
                                    >
                                        {/* <option value="" disabled>Seleccione Rol</option> */}
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
                        name="Cod_EstadoUsuario"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Código de Estado de Usuario</FormLabel>
                                <FormControl>
                                    <select {...field} className='w-full'
                                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                        value={field.value}
                                    >
                                        {/* <option value="" disabled >Estado de Usuario</option> */}
                                        <option value="1" selected>Activo</option>
                                        <option value="2">Inactivo</option>
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="col-span-2 flex justify-end">
                        <Button type="submit">Registrar Usuario</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default FormUsuario;
