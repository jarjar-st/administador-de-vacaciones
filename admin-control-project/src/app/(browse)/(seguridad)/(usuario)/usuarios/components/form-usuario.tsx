"use client";
import React, { useState } from 'react';
import { Backend_URL } from "@/lib/constants";
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

const FormUsuario = () => {
    const [loading, setLoading] = useState(false);
    const { data: session, status } = useSession();

    const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        // Inicializa los arrays
        const telefonos = [];
        const correosElectronicos = [];

        // Recoge todos los teléfonos
        let i = 0;
        while (formData.get(`telefonos[${i}].telefono`)) {
            telefonos.push({ telefono: formData.get(`telefonos[${i}].telefono`) });
            i++;
        }

        // Recoge todos los correos electrónicos
        i = 0; // Reinicia el contador para correos electrónicos
        while (formData.get(`correosElectronicos[${i}].correo`)) {
            correosElectronicos.push({ correo: formData.get(`correosElectronicos[${i}].correo`) });
            i++;
        }

        // Transform formData to match the required structure
        const newUser = {
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido'),
            identidad: formData.get('identidad'),
            fechaNacimiento: formData.get('fechaNacimiento'),
            genero: formData.get('genero'),
            estadoCivil: formData.get('estadoCivil'),
            direccion: formData.get('direccion'),
            telefonos: telefonos,
            correosElectronicos: correosElectronicos,
            empleado: {
                codDepartamento: Number(formData.get('empleado.codDepartamento')),
                codCargo: Number(formData.get('empleado.codCargo')),
                fechaContrato: formData.get('empleado.fechaContrato')
            },
            usuario: {
                contrasena: formData.get('usuario.contrasena'),
                codRol: Number(formData.get('usuario.codRol')), // Convert to number
                codEstadoUsuario: Number(formData.get('usuario.codEstadoUsuario')), // Convert to number
                intentosFallidos: 0,
                creadoPor: 'admin',
                modificadoPor: 'admin'
            }
        };

        const fechaNacimientoRaw = formData.get('fechaNacimiento');
        if (fechaNacimientoRaw) {
            // Convertir fechaNacimiento a formato ISO-8601
            const fechaNacimientoISO = new Date(String(fechaNacimientoRaw)).toISOString();
            // Actualizar newUser con la fecha en formato ISO-8601
            newUser.fechaNacimiento = fechaNacimientoISO;
        }

        const fechaContratoRaw = formData.get('empleado.fechaContrato');
        if (fechaContratoRaw) {
            // Convertir fechaContrato a formato ISO-8601
            const fechaContratoISO = new Date(String(fechaContratoRaw)).toISOString();
            // Actualizar newUser con la fecha en formato ISO-8601
            newUser.empleado.fechaContrato = fechaContratoISO;
        }

        console.log(newUser);
        console.log('TOKEEEEEN', session?.backendTokens.accessToken);

        try {
            const response = await fetch(`${Backend_URL}/usuarios/registrar-usuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.backendTokens.accessToken}`,
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) { 
                const errorResponse = await response.json(); 
                toast.error(`Error: ${errorResponse.message}`);
            } else {
                toast.success('Usuario registrado con exito!')
            }
        } catch (error) {
            toast.error('Error al registrar el usuario');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center">
            <form onSubmit={handleAddUser} className="grid grid-cols-2 gap-4 w-full max-w-lg">
                <div>
                    <label htmlFor="nombre" className="block">Nombre</label>
                    <input type="text" id="nombre" name="nombre" placeholder="Nombre" required className="w-full" />
                </div>
                <div>
                    <label htmlFor="apellido" className="block">Apellido</label>
                    <input type="text" id="apellido" name="apellido" placeholder="Apellido" required className="w-full" />
                </div>
                <div>
                    <label htmlFor="identidad" className="block">Identidad</label>
                    <input type="text" id="identidad" name="identidad" placeholder="Identidad" required className="w-full" />
                </div>
                <div>
                    <label htmlFor="fechaNacimiento" className="block">Fecha de Nacimiento</label>
                    <input type="date" id="fechaNacimiento" name="fechaNacimiento" placeholder="Fecha de Nacimiento" className="w-full" />
                </div>
                <div>
                    <label htmlFor="genero" className="block">Género</label>
                    <select id="genero" name="genero" required className="w-full">
                        <option value="" disabled selected>Seleccione Género</option>
                        <option value="femenino">Femenino</option>
                        <option value="masculino">Masculino</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="estadoCivil" className="block">Estado Civil</label>
                    <select id="estadoCivil" name="estadoCivil" required className="w-full" >
                        <option value="" disabled selected>Seleccione Estado Civil</option>
                        <option value="soltero">Soltero</option>
                        <option value="casado">Casado</option>
                        <option value="divorciado">Divorciado</option>
                        <option value="viudo">Viudo</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="direccion" className="block">Dirección</label>
                    <textarea id="direccion" name="direccion" placeholder="Dirección" required className="w-full" />
                </div>
                <div>
                    <label htmlFor="telefono" className="block">Teléfono</label>
                    <input type="text" id="telefono" name="telefonos[0].telefono" placeholder="Teléfono" required className="w-full" />
                </div>
                <div>
                    <label htmlFor="correo" className="block">Correo Electrónico</label>
                    <input type="email" id="correo" name="correosElectronicos[0].correo" placeholder="Correo Electrónico" required className="w-full" />
                </div>
                <div>
                    <label htmlFor="codDepartamento" className="block">Código de Departamento</label>
                    <input type="number" id="codDepartamento" name="empleado.codDepartamento" placeholder="Código de Departamento" required className="w-full" />
                </div>
                <div>
                    <label htmlFor="codCargo" className="block">Código de Cargo</label>
                    <input type="number" id="codCargo" name="empleado.codCargo" placeholder="Código de Cargo" required className="w-full" />
                </div>
                <div>
                    <label htmlFor="fechaContrato" className="block">Fecha de Contrato</label>
                    <input type="date" id="fechaContrato" name="empleado.fechaContrato" placeholder="Fecha de Contrato" required className="w-full" />
                </div>
                <div>
                    <label htmlFor="contrasena" className="block">Contraseña</label>
                    <input type="password" id="contrasena" name="usuario.contrasena" placeholder="Contraseña" required className="w-full" />
                </div>
                <div>
                    <label htmlFor="codRol" className="block">Código de Rol</label>
                    <input type="number" id="codRol" name="usuario.codRol" placeholder="Código de Rol" required className="w-full" />
                </div>
                <div>
                    <label htmlFor="codEstadoUsuario" className="block">Código de Estado de Usuario</label>
                    <input type="number" id="codEstadoUsuario" name="usuario.codEstadoUsuario" placeholder="Código de Estado de Usuario" required className="w-full" />
                </div>
                <div className="col-span-2 flex justify-center mt-4">
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Procesando...' : 'Agregar'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default FormUsuario;