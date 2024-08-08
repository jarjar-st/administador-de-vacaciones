
import { Button } from "@/components/ui/button"
import TablaUsuarios from "."
import { columns } from "./columns"
import { DataTable } from "./data-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Auth from "@/components/Auth"



export default async function InventarioPage() {



  return (
    // <Auth roles={['admin']}>
      <div className="container mx-auto mt-4">
        <TablaUsuarios />
      </div>
    // </Auth>

  )
}
