// PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider.tsx';

const PrivateRoute = ({ adminOnly }) => {
  const { isAuthenticated, user } = useAuth();

  // Verificar si el usuario está autenticado
  if (!isAuthenticated) {
    return <Navigate to='/login'/>;
  }

  // Verificar si se requiere un administrador y el usuario es un administrador
  if (adminOnly && (!user || user.tipo !== 2)) {
    return <Navigate to='/'/>; 
  }

  // Si el usuario está autenticado y cumple con los requisitos, mostrar las rutas
  return <Outlet/>;
};

export default PrivateRoute;
