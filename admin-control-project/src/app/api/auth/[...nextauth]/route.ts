import { Backend_URL } from "@/lib/constants";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { stringify } from "querystring";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Correo", type: "text", placeholder: "ejemplo" },
                password: { label: "Contraseña", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const { email, password } = credentials;
                const res = await fetch(Backend_URL + "/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (res.status === 401) {
                    console.log(`FALLO ESTE PEDO: ${res.statusText}`);

                    return null;
                }

                const user = await res.json();
                console.log(`ESTE ES EL USUARIO: ${JSON.stringify(user, null, 2)}`);
                return user;
            },
        })
    ],

    pages: {
        signIn: "/signIn",

    },

    callbacks: {
        async jwt({ token, user }) {
            console.log(`ESTO ES DESDE EL CALLBACK:\n`)
            console.log({ token, user })
            if (user) {
                return { ...token, ...user };
            }

            return token;
        },

        async session({session, token}){
            session.user = token.user;
            session.backendTokens = token.backendTokens;
            console.log(`ESTO ES DE SESSION:${JSON.stringify(session, null, 2)}`)
            return session;
        }
    },

}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };