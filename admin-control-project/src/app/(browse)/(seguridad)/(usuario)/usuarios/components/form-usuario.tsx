"use client"
import React from 'react';
import { Backend_URL } from "@/lib/constants";

const FormUsuario = () => {
    const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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

        const response = await fetch(`${Backend_URL}/usuarios/registrar-usuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        if (!response.ok) { // Verifica si el estado de la respuesta no es exitoso
            const errorResponse = await response.json(); // Convierte la respuesta en JSON
            console.log(`Error: ${errorResponse.message}, Status Code: ${errorResponse.statusCode}`);
        } else {
            console.log('Usuario registrado con éxito');
            // Aquí puedes manejar la respuesta exitosa, por ejemplo, redirigir al usuario o mostrar un mensaje de éxito
        }
        console.log(response);
    };

    return (
        <div>
            <form onSubmit={handleAddUser}>
                <input type="text" name="nombre" placeholder="Nombre" required />
                <input type="text" name="apellido" placeholder="Apellido" required />
                <input type="text" name="identidad" placeholder="Identidad" required />
                <input type="date" name="fechaNacimiento" placeholder="Fecha de Nacimiento" />
                <input type="text" name="genero" placeholder="Género" required />
                <input type="text" name="estadoCivil" placeholder="Estado Civil" required />
                <input type="text" name="direccion" placeholder="Dirección" required />
                <input type="text" name="telefonos[0].telefono" placeholder="Teléfono" required />
                <input type="email" name="correosElectronicos[0].correo" placeholder="Correo Electrónico" required />
                <input type="number" name="empleado.codDepartamento" placeholder="Código de Departamento" required />
                <input type="number" name="empleado.codCargo" placeholder="Código de Cargo" required />
                <input type="date" name="empleado.fechaContrato" placeholder="Fecha de Contrato" required />
                <input type="password" name="usuario.contrasena" placeholder="Contraseña" required />
                <input type="number" name="usuario.codRol" placeholder="Código de Rol" required />
                <input type="number" name="usuario.codEstadoUsuario" placeholder="Código de Estado de Usuario" required />
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
}

export default FormUsuario;
