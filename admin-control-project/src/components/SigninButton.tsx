"use client"
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';

export const SigninButton = () => {
    const { data: session } = useSession();
    const handleSignOut = async () => {
        await signOut({ redirect: false, callbackUrl: "/signIn" });
        window.location.reload();
    };

    if (session && session.user) {
        return (
            <div className=' flex gap-4 ml-auto'>
                <p className=' text-sky-600'>
                    {session.user.Persona.Nombre}
                </p>
                <Button
                    onClick={handleSignOut}
                    className="flex gap-4 ml-auto text-red-600"
                >
                    Cerrar Sesión
                </Button>

            </div>
        )
    }
    return (
        <div className=' flex gap-4 ml-auto items-center'>
            <Link
                href={"/signIn"}
                className="flex gap-4 ml-auto text-green-600"
            >
                Iniciar Sesión
            </Link>

        </div>
    )
}
