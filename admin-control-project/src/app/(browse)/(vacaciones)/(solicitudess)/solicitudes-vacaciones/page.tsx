
import { Button } from "@/components/ui/button"
import TablaSolicitudes from "."
import { columns } from "./columns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Auth from "@/components/Auth"



export default async function SolicitudesVacacionesPage() {



  return (
    // <Auth roles={['admin']}>
      <div className="container mx-auto mt-4">
        <TablaSolicitudes />
      </div>
    // </Auth>

  )
}
