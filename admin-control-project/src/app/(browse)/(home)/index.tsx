"use client";
import { useState, useEffect } from 'react';
// import { DataTable } from "./data-table";
import { Backend_URL } from '@/lib/constants';
// import { Solicitud, columns } from './columns';
import { useSession } from "next-auth/react";
import { AreaGraph } from '@/components/charts/area-graph';
import { BarGraph } from '@/components/charts/bar-graph';
import { PieGraph } from '@/components/charts/pie-graph';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
// import PageContainer from '@/components/layout/page-container';
// import { RecentSales } from '@/components/recent-sales';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RecentSolicitudesVacaciones } from '@/components/recent-solicitudes-vacaciones';
import { RecentSolicitudesReservas } from '@/components/recent-solicitudes-reserva';
import Auth from '@/components/Auth';

export type SolicitudReserva =
    {
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
        }[];
    }

export type SolicitudVacaciones =
    {
        Cod_Vacacion: number;
        Cod_Empleado: number;
        Fecha_Solicitud: string;
        Fecha_Inicio: string;
        Fecha_Fin: string;
        Dias_Solicitados: number;
        Estado_Solicitud: string;
        Empleado: {
            Cod_Empleado: number;
            Cod_Persona: number;
            Cod_Departamento: number;
            Cod_Cargo: number;
            Fecha_Contrato: string;
            Dias_Vacaciones_Acumulados: number;
            Persona: {
                Cod_Persona: number;
                Nombre: string;
                Apellido: string;
                Identidad: string;
                Fecha_Nacimiento: string;
                Edad: number;
                Genero: string;
                Estado_Civil: string;
                Direccion: string;
                Telefono: string;
            };
        };
    }

export type Usuarios =
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

export type data = {
    reservas: SolicitudReserva[];
    vacaciones: SolicitudVacaciones[];
    usuarios: Usuarios[];
}


async function getData(role: string, userId: number): Promise<data> {
    try {
        // Obtener reservas
        const reservasResponse = await fetch(`${Backend_URL}/reservas`);
        if (!reservasResponse.ok) {
            throw new Error(`Error al obtener reservas: ${reservasResponse.status} ${reservasResponse.statusText}`);
        }
        let reservas: SolicitudReserva[] = await reservasResponse.json();
        console.log('Reservas:', reservas);

        // Obtener solicitudes de vacaciones
        const vacacionesResponse = await fetch(`${Backend_URL}/vacaciones`);
        if (!vacacionesResponse.ok) {
            throw new Error(`Error al obtener vacaciones: ${vacacionesResponse.status} ${vacacionesResponse.statusText}`);
        }
        let vacaciones: SolicitudVacaciones[] = await vacacionesResponse.json();

        // Obtener usuarios
        const usuariosResponse = await fetch(`${Backend_URL}/usuarios`);
        if (!usuariosResponse.ok) {
            throw new Error(`Error al obtener usuarios: ${usuariosResponse.status} ${usuariosResponse.statusText}`);
        }
        let usuarios: Usuarios[] = await usuariosResponse.json();

        // Combinar ambos datos
        let data = {
            reservas: reservas,
            vacaciones: vacaciones,
            usuarios: usuarios
        };

        // Filtrar las solicitudes según el rol del usuario
        // if (role !== 'admin') {
        //     data = data.filter(solicitud => solicitud.Cod_Usuario === userId);
        // }

        console.log('Datos combinados:', data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return { reservas: [], vacaciones: [], usuarios: [] };
    }
}

export default function HomeDashboard() {
    const { data: session } = useSession();
    const [dataReservas, setDataReserva] = useState<SolicitudReserva[]>([]);
    const [dataVacaciones, setDataVacaciones] = useState<SolicitudVacaciones[]>([]);
    const [dataUsuarios, setDataUsuarios] = useState<Usuarios[]>([]);

    const loadData = async () => {
        if (session) {
            const newData = await getData(session.user.Rol.Rol, session.user.Cod_Usuario);
            setDataReserva(newData.reservas);
            setDataVacaciones(newData.vacaciones);
            setDataUsuarios(newData.usuarios);
        }

        console.log('ESTOS SON LOS DATOS DE RESERVAS', dataReservas);
        console.log('ESTOS SON LOS DATOS DE VACACIONES', dataVacaciones);
        console.log('ESTOS SON LOS DATOS DE VACACIONES', dataUsuarios);
    }

    useEffect(() => {
        loadData();
    }, [session]);

    return (
        // <PageContainer scrollable={true}>
        <div className='mt-10 mx-6'>
            <div className="space-y-2">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Hola, Bienvenido 👋
                    </h2>
                    <div className="hidden items-center space-x-2 md:flex">
                        {/* <CalendarDateRangePicker /> */}
                        {/* <Button>Download</Button> */}
                    </div>
                </div>
                <Auth permissions={["manejar vacaciones"]}>
                    <Tabs defaultValue="overview" className="space-y-4">
                        {/* <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics" disabled>
                  Analytics
                </TabsTrigger>
              </TabsList> */}
                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {/* <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Revenue
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$45,231.89</div>
                      <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                      </p>
                    </CardContent>
                  </Card> */}
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Usuarios
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{dataUsuarios.length}</div>
                                        {/* <p className="text-xs text-muted-foreground">
                        +180.1% from last month
                      </p> */}
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Reservas
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M23 7l-7 5 7 5V7z" />
                                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{dataReservas.length}</div>
                                        {/* <p className="text-xs text-muted-foreground">
                        +180.1% from last month
                      </p> */}
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Vacaciones</CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M2 22h20M12 2a7 7 0 0 1 0 14M12 2a7 7 0 0 0 0 14M12 2v14M12 2L9.5 5.5M12 2l2.5 3.5M2 22l4-4M22 22l-4-4" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{dataVacaciones.length}</div>
                                        {/* <p className="text-xs text-muted-foreground">
                                        +19% from last month
                                    </p> */}
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Usuarios Activos
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{dataUsuarios.length}</div>
                                        {/* <p className="text-xs text-muted-foreground">
                                        +201 since last hour
                                    </p> */}
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-8">
                                {/* <div className="col-span-4">
                                <BarGraph />
                            </div> */}
                                <Card className="col-span-4 md:col-span-4">
                                    <CardHeader>
                                        <CardTitle>Solicitudes de Vacaciones</CardTitle>
                                        <CardDescription>
                                            Se han solicitado {dataVacaciones.length} vacaciones
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <RecentSolicitudesVacaciones />
                                    </CardContent>
                                </Card>
                                <Card className="col-span-4 md:col-span-4">
                                    <CardHeader>
                                        <CardTitle>Solicitudes de Sala</CardTitle>
                                        <CardDescription>
                                            Se han solicitado {dataReservas.length} salas
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <RecentSolicitudesReservas />
                                    </CardContent>
                                </Card>
                                {/* <div className="col-span-4">
                                <AreaGraph />
                            </div>
                            <div className="col-span-4 md:col-span-3">
                                <PieGraph />
                            </div> */}
                            </div>
                        </TabsContent>
                    </Tabs>
                </Auth>
            </div>
        </div>

        // </PageContainer>
    );
}
