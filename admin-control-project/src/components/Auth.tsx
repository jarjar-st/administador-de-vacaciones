// components/Auth.tsx
"use client";
import { useSession, signIn } from "next-auth/react";
import { ReactNode } from "react";

interface AuthProps {
  children: ReactNode;
  roles?: string[];
}

const Auth: React.FC<AuthProps> = ({ children, roles }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    signIn();
    return null;
  }

  if (status === "authenticated" && roles && !roles.includes(session?.user?.Rol.Rol)) {
    return null; // o puedes mostrar un mensaje de acceso denegado aquí
  }

  return <>{children}</>;
};

export default Auth;
