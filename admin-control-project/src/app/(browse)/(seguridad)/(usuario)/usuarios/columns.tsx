"use client"


import { ColumnDef } from "@tanstack/react-table"


export type Usuarios = {
  Nombre: string
  Apellido: string
  Identidad: string
}

export const columns: ColumnDef<Usuarios>[] = [
  {
    accessorKey: "Identidad",
    header: "Identidad",
  },
  {
    accessorKey: "Nombre",
    header: "Nombre",
  },
  {
    accessorKey: "Apellido",
    header: "Apellido",
  },
]
