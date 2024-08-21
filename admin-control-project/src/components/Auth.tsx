// components/Auth.tsx
"use client";
import { useSession, signIn } from "next-auth/react";
import { ReactNode } from "react";

interface AuthProps {
  children: ReactNode;
  roles?: string[];
  permissions?: string[];
}

const Auth: React.FC<AuthProps> = ({ children, roles, permissions }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    signIn();
    return null;
  }

  if (status === "authenticated") {
    // const userRole = session?.user?.Rol.Rol;
    const userPermissions = session?.user?.Rol.RolePermisos.map(rp => rp.Permisos.Nombre_Permiso);

    // if (roles && !roles.includes(userRole)) {
    //   return null;
    // }

    if (permissions && !permissions.every(permission => userPermissions.includes(permission))) {
      return null;
    }
  }

  return <>{children}</>;
};

export default Auth;