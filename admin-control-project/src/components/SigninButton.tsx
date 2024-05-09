"use client"
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'

export const SigninButton = () => {
    const { data: session } = useSession();

    if (session && session.user) {
        return (
            <div className=' flex gap-4 ml-auto'>
                <p className=' text-sky-600'>
                    {session.user.name}
                </p>
                <Link
                    href={"/api/auth/signout"}
                    className="flex gap-4 ml-auto text-red-600"
                >
                    Cerrar Sesión
                </Link>

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
