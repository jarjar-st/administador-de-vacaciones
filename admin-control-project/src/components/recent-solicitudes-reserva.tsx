"use client"
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Backend_URL } from '@/lib/constants';

interface SolicitudReserva {
    Cod_Reserva: number;
    Cod_Usuario: number;
    Usuario: string;
    Cod_Sala: number;
    Nombre_Sala: string;
    Fecha_Reserva: string;
    Hora_Inicio: string;
    Hora_Fin: string;
    Estado_Reserva: string;
    Inventario: {
        Nombre_Item: string;
        CantidadSolicitada: number;
    }
}

export function RecentSolicitudesReservas() {
  const [solicitudes, setSolicitudes] = useState<SolicitudReserva[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${Backend_URL}/reservas`);
      const data = await response.json();
      setSolicitudes(data);
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {solicitudes.map((solicitud) => (
        <div key={solicitud.Cod_Reserva} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {solicitud.Usuario[0]}
              {/* {solicitud.Empleado.Persona.Apellido[0]} */}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {solicitud.Usuario}
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date(solicitud.Fecha_Reserva).toLocaleDateString()}
            </p>
          </div>
          <div className="ml-auto font-medium">{solicitud.Nombre_Sala}</div>
        </div>
      ))}
    </div>
  );
}
