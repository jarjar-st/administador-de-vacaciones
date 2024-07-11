
import TablaUsuarios from "."
import { columns } from "./columns"
import FormUsuario from "./components/form-usuario"
import { DataTable } from "./data-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



export default async function UsuariosPage() {



  return (
    <div className="container mx-auto py-10">
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <FormUsuario/>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <TablaUsuarios />
    </div>
  )
}
