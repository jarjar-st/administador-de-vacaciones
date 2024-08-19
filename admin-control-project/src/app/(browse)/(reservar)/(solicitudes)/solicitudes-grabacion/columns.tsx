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
  {
    accessorKey: "Usuario",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-primary"
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "Nombre_Sala",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-primary"
        >
          Sala
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "Fecha_Reserva",
    header: () => {
      return (
        <div className="text-primary">
          Fecha
        </div>
      );
    },
    cell: ({ row }) => {
      const fechaString = row.original.Fecha_Reserva.split('T')[0];
      const fechaReserva = new Date(fechaString);
  
      // const opciones = { month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;
      // const fechaFormateada = fechaReserva.toLocaleDateString('es-ES', opciones);
      // const year = fechaReserva.getUTCFullYear();
      // const month = String(fechaReserva.getUTCMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
      // const day = String(fechaReserva.getUTCDate()).padStart(2, '0');
      // const fechaFormateadados = `${year}-${month}-${day}`;
  
      return (
        <div>
          {fechaString}
        </div>
      );
    }
  },
  {
    accessorKey: "Inventario",
    header: () => {
      return (
        <div className="text-primary">
          Equipo
        </div>
      )
    },
    cell: ({ row }) => {
      return row.original.Inventario.map((item, index) => {
        return (
          <div key={index} className="flex flex-row items-center">
            <div className=" w-32"> {/* Ajusta el ancho según sea necesario */}
              {item.Nombre_Item}
            </div>
            <div className="flex-1">
              {item.CantidadSolicitada}
            </div>
          </div>
        )
      })
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
    accessorKey: "Estado_Reserva",
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
      const estado = row.original.Estado_Reserva;

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
  {
    id: "actions",
    cell: ({ row }) => {
      const solicitud = row.original;
      const { data: session } = useSession();

      const updateEstadoReserva = async (nuevoEstado: string) => {
        const response = await fetch(`${Backend_URL}/reservas/${solicitud.Cod_Reserva}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.backendTokens.accessToken}`,
          },
          body: JSON.stringify({
            Estado_Reserva: nuevoEstado
          })
        });

        if (!response.ok) {
          console.error('Error al actualizar el estado de la reserva:', response.statusText);
          return;
        }
        location.reload();
      };

      return (
        <Auth roles={['admin']}>
          <div className="flex justify-center items-center mt-3">
            {solicitud.Estado_Reserva === "Pendiente" && (
              <div className=" flex flex-row gap-4">
                <Button variant="default" className=" bg-green-500" onClick={async () => await updateEstadoReserva("Aceptado")}>
                  <Check />
                </Button>
                <Button variant="destructive" className="" onClick={async () => await updateEstadoReserva("Rechazado")}>
                  <Ban />
                </Button>
              </div>
            )}
            {solicitud.Estado_Reserva === "Aceptado" && (
              <Button variant="destructive" onClick={async () => await updateEstadoReserva("Rechazado")}>
                {/* Rechazar */}
                <Ban />
              </Button>
            )}
            {solicitud.Estado_Reserva === "Rechazado" && (
              <Button variant="default" className=" bg-green-500" onClick={async () => await updateEstadoReserva("Aceptado")}>
                {/* Aprobar */}
                <Check />
              </Button>
            )}
          </div>
        </Auth>
      )
    },
  },
]