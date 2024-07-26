import { Backend_URL } from "@/lib/constants";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { stringify } from "querystring";

async function refreshToken(token: JWT): Promise<JWT> {
    const res = await fetch(Backend_URL + "/auth/refresh", {
      method: "POST",
      headers: {
        authorization: `Refresh ${token.backendTokens.refreshToken}`,
      },
    });
    console.log("refreshed");
  
    const response = await res.json();
  
    return {
      ...token,
      backendTokens: response,
    };
  }

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

                console.log(`ESTE ES EL RES 1111111: ${JSON.stringify(res, null, 2)}`);

                if (res.status === 401) {
                    console.log(`FALLO ESTE PEDO: ${res.statusText}`);
                    const body = await res.json();
                    console.log(`ESTE ES EL ERROR: ${body.message}`);
                    const message = body.message;
                    throw new Error(message);
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
            if (user) return { ...token, ...user };
      
            if (new Date().getTime() < token.backendTokens.expiresIn)
              return token;
      
            return await refreshToken(token);
          },
      
          async session({ token, session }) {
            session.user = token.user;
            session.backendTokens = token.backendTokens;
      
            return session;
          },
    },

}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };