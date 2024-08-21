"use client"
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Backend_URL } from '@/lib/constants';

interface SolicitudVacaciones {
  Cod_Vacacion: number;
  Empleado: {
    Persona: {
      Nombre: string;
      Apellido: string;
    };
  };
  Fecha_Solicitud: string;
  Fecha_Inicio: string;
  Fecha_Fin: string;
  Dias_Solicitados: number;
  Estado_Solicitud: string;
}

export function RecentSolicitudesVacaciones() {
  const [solicitudes, setSolicitudes] = useState<SolicitudVacaciones[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${Backend_URL}/vacaciones`);
      const data = await response.json();
      setSolicitudes(data);
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {solicitudes.map((solicitud) => (
        <div key={solicitud.Cod_Vacacion} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {solicitud.Empleado.Persona.Nombre[0]}
              {solicitud.Empleado.Persona.Apellido[0]}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {solicitud.Empleado.Persona.Nombre} {solicitud.Empleado.Persona.Apellido}
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date(solicitud.Fecha_Solicitud).toLocaleDateString()}
            </p>
          </div>
          <div className="ml-auto font-medium">Días solicitados: {solicitud.Dias_Solicitados}</div>
        </div>
      ))}
    </div>
  );
}
