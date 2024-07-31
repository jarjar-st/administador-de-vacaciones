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
      return row.original.Cod_Rol
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
        <div className="flex justify-center items-center  mt-3">
        <Button variant="ghost" className="text-primary">
            <Dialog>
                <DialogTrigger asChild>
                    <Pencil></Pencil>
                </DialogTrigger>
                <DialogContent className="z-[90]">
                    <DialogHeader className="text-center justify-center items-center w-full h-10">
                        <DialogTitle>
                            Datos Del Usuario
                        </DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <FormUsuario usuario={usuario} />
                </DialogContent>
            </Dialog>
        </Button>
    </div>
      )
    },
  },
]