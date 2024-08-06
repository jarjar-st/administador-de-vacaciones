"use client"
import { useState, useEffect } from 'react';
import { DataTable } from "./data-table"
import { Backend_URL } from '@/lib/constants';
import { Solicitud, columns } from './columns';
import { useSession } from "next-auth/react";

async function getData(role: string, userId: number): Promise<Solicitud[]> {
    try {
        const response = await fetch(`${Backend_URL}/reservas`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        let data: Solicitud[] = await response.json();
        console.log('ESTOS SON LOS DATOS asdasdasdasds', data);

        // Filtrar las solicitudes según el rol del usuario
        if (role !== 'admin') {
            data = data.filter(solicitud => solicitud.Cod_Usuario === userId);
        }

        console.log('ESTOS SON LAS SOLICITUDES', data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return []; // Retorna un arreglo vacío o maneja el error como prefieras
    }
}

export default function TablaSolicitudes() {
    const { data: session } = useSession();
    const [data, setData] = useState<Solicitud[]>([]);
    
    const loadData = async () => {
        if (session) {
            const newData = await getData(session.user.Rol.Rol, session.user.Cod_Usuario);
            setData(newData);
        }
    }

    console.log('ESTOS SON LOS DATOS', data);

    useEffect(() => {
        loadData();
    }, [session]);

    return (
        <DataTable columns={columns} data={data} />
    )
}
