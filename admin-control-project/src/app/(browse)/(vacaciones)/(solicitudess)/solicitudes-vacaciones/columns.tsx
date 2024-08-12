"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowBigDownDashIcon, ArrowUpDown, Ban, Check, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Backend_URL } from "@/lib/constants"
import { useSession } from "next-auth/react"
import Auth from "@/components/Auth"

export type Solicitud =
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

const calculateAge = (birthDate: string) => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export const columns: ColumnDef<Solicitud>[] = [
  // {
  //   accessorKey: "Usuario",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         className="text-primary"
  //       >
  //         Nombre
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  {
    accessorKey: "Usuario",
    header: () => {
      return (
        <div className="text-primary">
          Fecha
        </div>
      );
    },
    cell: ({ row }) => {
  
      return (
        <div>
          {row.original.Empleado.Persona.Nombre}
        </div>
      );
    }
  },
  // {
  //   accessorKey: "Nombre_Sala",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         className="text-primary"
  //       >
  //         Sala
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  {
    accessorKey: "Fecha_Solicitud",
    header: () => {
      return (
        <div className="text-primary">
          Fecha
        </div>
      );
    },
    cell: ({ row }) => {
      const fechaReserva = new Date(row.original.Fecha_Solicitud);
  
      const opciones = { month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;
      const fechaFormateada = fechaReserva.toLocaleDateString('es-ES', opciones);
  
      return (
        <div>
          {fechaFormateada}
        </div>
      );
    }
  },
  {
    accessorKey: "Fecha_Inicio",
    header: () => {
      return (
        <div className="text-primary">
          Fecha
        </div>
      );
    },
    cell: ({ row }) => {
      const fechaReserva = new Date(row.original.Fecha_Inicio);
  
      const opciones = { month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;
      const fechaFormateada = fechaReserva.toLocaleDateString('es-ES', opciones);
  
      return (
        <div>
          {fechaFormateada}
        </div>
      );
    }
  },
  {
    accessorKey: "Fecha_Fin",
    header: () => {
      return (
        <div className="text-primary">
          Fecha
        </div>
      );
    },
    cell: ({ row }) => {
      const fechaReserva = new Date(row.original.Fecha_Fin);
  
      const opciones = { month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;
      const fechaFormateada = fechaReserva.toLocaleDateString('es-ES', opciones);
  
      return (
        <div>
          {fechaFormateada}
        </div>
      );
    }
  },
  {
    accessorKey: "Dias_Solicitados",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-primary"
        >
          Dias Solicitados
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  // {
  //   accessorKey: "Genero",
  //   header: () => {
  //     return (
  //       <div className="text-primary">
  //         Genero
  //       </div>
  //     )
  //   },
  // },
  {
    accessorKey: "Estado_Solicitud",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-primary"
        >
          Estado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const estado = row.original.Estado_Solicitud;

      const getEstadoStyle = (estado:string) => {
        switch (estado) {
          case "Aceptado":
            return "bg-green-400 ";
          case "Rechazado":
            return "bg-red-400 ";
          case "Pendiente":
            return "bg-yellow-400 ";
          default:
            return "";
        }
      };

      return (
        <div
          className={`flex justify-center items-center w-[50%] h-8 rounded-xl bg- text-black font-bold  ${getEstadoStyle(estado)}`}
        >
          {estado}
        </div>
      );
    }
  },
  // {
  //   accessorKey: "Fecha_Nacimiento",
  //   header: () => {
  //     return (
  //       <div className="text-primary">
  //         Edad
  //       </div>
  //     )
  //   },
  //   cell: ({ row }) => `${calculateAge(row.original.Fecha_Nacimiento)} años`,
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const solicitud = row.original;
  //     const { data: session } = useSession();

  //     const updateEstadoReserva = async (nuevoEstado: string) => {
  //       const response = await fetch(`${Backend_URL}/reservas/${solicitud.Cod_Reserva}`, {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${session?.backendTokens.accessToken}`,
  //         },
  //         body: JSON.stringify({
  //           Estado_Reserva: nuevoEstado
  //         })
  //       });

  //       if (!response.ok) {
  //         console.error('Error al actualizar el estado de la reserva:', response.statusText);
  //         return;
  //       }
  //       location.reload();
  //     };

  //     return (
  //       <Auth roles={['admin']}>
  //         <div className="flex justify-center items-center mt-3">
  //           {solicitud.Estado_Reserva === "Pendiente" && (
  //             <div className=" flex flex-row gap-4">
  //               <Button variant="default" className=" bg-green-500" onClick={async () => await updateEstadoReserva("Aceptado")}>
  //                 <Check />
  //               </Button>
  //               <Button variant="destructive" className="" onClick={async () => await updateEstadoReserva("Rechazado")}>
  //                 <Ban />
  //               </Button>
  //             </div>
  //           )}
  //           {solicitud.Estado_Reserva === "Aceptado" && (
  //             <Button variant="destructive" onClick={async () => await updateEstadoReserva("Rechazado")}>
  //               {/* Rechazar */}
  //               <Ban />
  //             </Button>
  //           )}
  //           {solicitud.Estado_Reserva === "Rechazado" && (
  //             <Button variant="default" className=" bg-green-500" onClick={async () => await updateEstadoReserva("Aceptado")}>
  //               {/* Aprobar */}
  //               <Check />
  //             </Button>
  //           )}
  //         </div>
  //       </Auth>
  //     )
  //   },
  // },
]