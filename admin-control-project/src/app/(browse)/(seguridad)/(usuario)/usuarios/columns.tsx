"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
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
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import FormUsuario from "./components/form-usuario"
import FormUsuarioUpdate from "./components/form-test"


export type Usuarios = {
  Cod_Persona: number;
  Nombre: string;
  Apellido: string;
  Identidad: string;
  Fecha_Nacimiento: string;
  Genero: string;
  Estado_Civil: string;
  Direccion: string;
  Telefono: string;
  Empleado: {
    Cod_Departamento: number;
    Cod_Cargo: number;
    Fecha_Contrato: string;
  };
  Usuario: {
    CorreoElectronico: string;
    Contrasena: string;
    Cod_Rol: number;
    Cod_EstadoUsuario: number;
  }

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

export const columns: ColumnDef<Usuarios>[] = [

  {
    accessorKey: "Nombre",
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
    accessorKey: "Apellido",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-primary"
        >
          Apellido
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "Identidad",
    header: () => {
      return (
        <div
          className="text-primary"
        >
          Identidad
        </div>
      )
    },
  },
  {
    accessorKey: "Usuarios",
    header: () => {
      return (
        <div
          className="text-primary"
        >
          test
        </div>
      )
    },
    cell: ({ row }) => {
      // Accede a la propiedad "Usuarios" del objeto "row.original" (que representa la fila actual)
      // y mapea cada usuario a una cadena que contiene el "Cod_Usuario" y "Cod_Rol",
      // luego une estas cadenas con comas para mostrarlas en la celda.
      return row.original.Usuario.Cod_Rol
    },
  },
  {
    accessorKey: "Genero",
    header: () => {
      return (
        <div
          className="text-primary"
        >
          Genero
        </div>
      )
    },
  },
  {
    accessorKey: "Fecha_Nacimiento",
    header: () => {
      return (
        <div
          className="text-primary"
        >
          Edad
        </div>
      )
    },
    cell: ({ row }) => `${calculateAge(row.original.Fecha_Nacimiento)} años`,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const usuario = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-primary">
              {/* <span className="sr-only">Open menu</span> */}
              <Pencil></Pencil>
              {/* <MoreHorizontal className="h-4 w-4" /> */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(usuario.Identidad)}
            >
              Copiar Identidad del usuario
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Dialog  >
              <DialogTrigger className=" text-sm px-2 py-1.5">Editar Usuario</DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar Usuario</DialogTitle>
                  <DialogDescription>
                    <FormUsuarioUpdate usuario={usuario} onSuccess={() => location.reload()} />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <DropdownMenuItem className=" bg-red-400" onClick={async function onDelete() {
              // const response = await fetch(`http://localhost:3000/usuario/${usuario.id}`, {
              //     method: 'DELETE',
              // });

              // if (!response.ok) {
              //     console.error('Error al borrar el usuario:', response.statusText);
              //     return;
              // }
              // location.reload();
            }}>Borrar Usuario</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]