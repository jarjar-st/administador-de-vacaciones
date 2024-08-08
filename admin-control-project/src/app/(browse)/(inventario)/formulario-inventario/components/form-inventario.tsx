// admin-control-project/src/app/(browse)/(inventario)/page.tsx

"use client";

import { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Backend_URL } from '@/lib/constants';

const inventarioSchema = z.object({
  Nombre_Item: z.string().min(1, "Nombre es requerido"),
  Descripcion: z.string().min(1, "Descripción es requerida"),
  Cantidad: z.number().min(1, "Cantidad es requerida"),
});

const FormInventario = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof inventarioSchema>>({
    resolver: zodResolver(inventarioSchema),
    defaultValues: {
      Nombre_Item: "",
      Descripcion: "",
      Cantidad: 1,
    }
  });

  const onSubmit = async (values: z.infer<typeof inventarioSchema>) => {
    try {
      const url = `${Backend_URL}/inventario`;
      values.Cantidad = parseInt(values.Cantidad as any);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.backendTokens.accessToken}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error creando inventario:', errorResponse);
        toast.error(`Error: ${errorResponse.message}`);
      } else {
        toast.success('Inventario creado con éxito!');
        router.push("/"); // Cambia a la ruta que necesites después de la creación
      }
    } catch (error) {
      toast.error('Error al crear el inventario');
    }
  };

  return (
    <div className="flex justify-center h-[450px] overflow-y-auto custom-scrollbar-form">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col w-full gap-4 max-w-lg">
          <FormField
            control={form.control}
            name="Nombre_Item"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Item</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del Item" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input placeholder="Descripción" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Cantidad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Cantidad"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2 flex justify-end">
            <Button type="submit">Agregar Inventario</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormInventario;
