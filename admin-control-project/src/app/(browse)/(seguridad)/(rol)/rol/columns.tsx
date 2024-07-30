//  "use client"
// import { ColumnDef } from "@tanstack/react-table"
// import { ArrowUpDown, MoreHorizontal } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// // import FormUsuario from "./components/form-usuario"


// export type Usuarios = {
//   id: number
//   Identidad: string
//   Nombre: string
//   Apellido: string
//   Genero: string
//   Fecha_Nacimiento: string
// }

// const calculateAge = (birthDate: string) => {
//   const birth = new Date(birthDate);
//   const today = new Date();
//   let age = today.getFullYear() - birth.getFullYear();
//   const monthDifference = today.getMonth() - birth.getMonth();
//   if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
//     age--;
//   }
//   return age;
// }

// export const columns: ColumnDef<Usuarios>[] = [
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const usuario = row.original

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Opciones</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(usuario.Identidad)}
//             >
//               Copiar Identidad del usuario
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <Dialog  >
//               <DialogTrigger className=" text-sm px-2 py-1.5">Editar Usuario</DialogTrigger>

//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>Editar Usuario</DialogTitle>
//                   <DialogDescription>
//                     {/* <FormUsuario usuario={usuario} onSuccess={() => location.reload()}/> */}
//                   </DialogDescription>
//                 </DialogHeader>
//               </DialogContent>
//             </Dialog>

//             <DropdownMenuItem className=" bg-red-400" onClick={async function onDelete() {
//               // const response = await fetch(`http://localhost:3000/usuario/${usuario.id}`, {
//               //     method: 'DELETE',
//               // });

//               // if (!response.ok) {
//               //     console.error('Error al borrar el usuario:', response.statusText);
//               //     return;
//               // }
//               // location.reload();
//             }}>Borrar Usuario</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },
//   {
//     accessorKey: "Nombre",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Nombre
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//   },
//   {
//     accessorKey: "Apellido",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Apellido
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//   },
//   {
//     accessorKey: "Identidad",
//     header: "Identidad",
//   },
//   {
//     accessorKey: "Genero",
//     header: "Genero",
//   },
//   {
//     accessorKey: "Fecha_Nacimiento",
//     header: "Edad",
//     cell: ({ row }) => `${calculateAge(row.original.Fecha_Nacimiento)} años`,
//   },
// ]