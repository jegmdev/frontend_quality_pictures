import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider.tsx';

const PrivateRoute = ({ adminOnly }: { adminOnly: boolean }) => {
  const auth = useAuth();

  // Verificar si el usuario está autenticado
  if (auth.isAuthenticated) {
    // Verificar si se requiere que el usuario sea administrador
    if (adminOnly && auth.user && auth.user.tipo === '2') {
      return <Outlet />;
    } else if (!adminOnly) {
      return <Outlet />;
    } else {
      // Mostrar mensaje de error y redirigir al Home
      alert("Error: acceso denegado, solo administradores");
      return <Navigate to='/' />;
    }
  }

  return <Navigate to='/login' />;
};

export default PrivateRoute;
