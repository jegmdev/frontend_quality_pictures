import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, children } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider.tsx';
import './css/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import Cartelera from './components/Cartelera';
import Reserva from './components/Reserva';
import Login from './components/Login';
import Home from './components/Home';
import Registro from './components/Registro';
import PrivateRoute from './components/PrivateRoute';
import DashboardAdmin from './components/DashboardAdmin';

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Home /> 
  },
  { 
    path: '/cartelera', 
    element: <Cartelera /> 
  },
  { 
    path: '/reserva', 
    element: <Reserva /> 
  },
  { 
    path: '/login', 
    element: <Login /> 
  },
  { 
    path: '/registro', 
    element: <Registro /> 
  },
  { 
    path: '/', 
    element: <PrivateRoute />,
    children: [
      {
        path: '/admin',
        element: <DashboardAdmin />
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
      <App/>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
