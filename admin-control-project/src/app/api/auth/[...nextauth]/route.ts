import { Backend_URL } from "@/lib/constants";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "ejemplo" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials?.username || !credentials?.password){
                    return null;
                }

                const {username, password} = credentials;
                const res = await fetch(Backend_URL + "/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            },
        })
    ]
}