"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from 'react-hot-toast';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"



const formSchema = z.object({
    email: z.string({
        required_error: "Este campo es requerido.",
        invalid_type_error: "Este campo debe ser un correo."
    }).email({
        message: "Ingrese un correo válido."
    }),
    password: z.string(
        {
            required_error: "Este campo es requerido."
        }
    )
})


type Props = {
    className?: string;
    error?: string;
}

const Login = (props: Props) => {
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const router = useRouter();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log("SI ENTRA AQUI")
        console.log(values)
        const res = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
            callbackUrl: "/",
        });

        console.log(`ESTE ES EL RES: ${JSON.stringify(res, null, 2)}`);


        if (res?.error) {
            // If there's an error, update the error message state.
            setErrorMessage(res.error);
            toast.error(`${res.error}`)
        } else {
            // If there's no error, clear the error message state and redirect the user.
            setErrorMessage(null);
            toast.success('Inicio de sesion exitoso!')
            router.push("/");
        }
    }
    // return (
    //     <div className={props.className}>
    //         <div className=' g-gradient-to-b from-slate-50 to-slate-200 p-2 text-center text-slate-600'>
    //             Login Form
    //         </div>
    //     </div>
    // )
    return (
        <Card className="w-[550px]">
            <CardHeader className=" flex justify-center items-center">
                <img src="/logo1.png" alt="logo" className="w-20 h-20" />
                <CardTitle>Inicio de Sesion</CardTitle>
                {/* <CardDescription>Card Description</CardDescription> */}
            </CardHeader>
            <CardContent>
                <div className={props.className}>
                    <div className=' g-gradient-to-b from-slate-50 to-slate-200 p-2 text-center text-slate-600'>
                        Inicio de Sesion
                    </div>
                    {/* {!!errorMessage && (
                <p className="bg-red-100 text-red-600 text-center p-2">
                    {errorMessage}
                </p>
            )} */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="ejemplo@ejemplo.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="*****" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className=" flex justify-center items-center">
                                <Button type="submit">Ingresar</Button>
                            </div>

                        </form>
                    </Form>

                </div>
            </CardContent>
            {/* <CardFooter>
                <p>Card Footer</p>
            </CardFooter> */}
        </Card>


    )
}

export default Login