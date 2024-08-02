"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowBigDownDashIcon, ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
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
import FormUsuario from "./components/form-usuario"
import { Backend_URL } from "@/lib/constants"
import { useSession } from "next-auth/react"

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
        <div className="text-primary">
          Identidad
        </div>
      )
    },
  },
  {
    accessorKey: "Usuarios",
    header: () => {
      return (
        <div className="text-primary">
          test
        </div>
      )
    },
    cell: ({ row }) => {
      return row.original.Cod_Rol
    },
  },
  {
    accessorKey: "Genero",
    header: () => {
      return (
        <div className="text-primary">
          Genero
        </div>
      )
    },
  },
  {
    accessorKey: "Fecha_Nacimiento",
    header: () => {
      return (
        <div className="text-primary">
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
      const { data: session } = useSession();

      const onDelete = async (isActive:boolean) => {
        const response = await fetch(`${Backend_URL}/usuarios/estado-usuario/${usuario.Cod_Persona}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.backendTokens.accessToken}`,
          },
          body: JSON.stringify({
            isActive
          })
        });

        if (!response.ok) {
          console.error('Error al borrar el usuario:', response.statusText);
          return;
        }
        location.reload();
      };

      return (
        <div className="flex justify-center items-center mt-3">
          <Button variant="ghost" className="text-primary">
            <Dialog>
              <DialogTrigger asChild>
                <Pencil />
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
          {row.original.Cod_EstadoUsuario === 1 ? (
            <Button variant="destructive">
              <Dialog>
                <DialogTrigger asChild>
                  <Trash2 />
                </DialogTrigger>
                <DialogContent className="z-[90]">
                  <DialogHeader className="text-center justify-center items-center w-full h-10">
                    <DialogTitle>
                      Borrar Usuario
                    </DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-row w-full justify-center gap-10 items-center">
                    <DialogClose asChild>
                      <Button type="button" variant="destructive" onClick={async () => await onDelete(false)}>
                        Borrar
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button type="button" variant="default">
                        Cancelar
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </Button>      
          ) : (
            <Button variant="default">
              <Dialog>
                <DialogTrigger asChild>
                  <ArrowBigDownDashIcon />
                </DialogTrigger>
                <DialogContent className="z-[90]">
                  <DialogHeader className="text-center justify-center items-center w-full h-10">
                    <DialogTitle>
                      Borrar Usuario
                    </DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-row w-full justify-center gap-10 items-center">
                    <DialogClose asChild>
                      <Button type="button" variant="default" onClick={async () => await onDelete(true)}>
                        Activar
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button type="button" variant="destructive">
                        Cancelar
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </Button>
          )}
        </div>
      )
    },
  },
]