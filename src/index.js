import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  children,
} from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import "./css/index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import Cartelera from "./components/Cartelera";
import CarteleraAdmin from "./components/CarteleraAdmin.js";
import Reservas from "./components/Reservas";
import Login from "./auth/Login.tsx";
import Home from "./components/Home";
import HomeAdmin from "./components/HomeAdmin.js";
import Registro from "./auth/Registro";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardAdmin from "./components/DashboardAdmin";
import MovieForm from "./components/MovieForm.js";
import DetallesPelicula from "./components/DetallesPelicula.js";
import ListaReservas from "./components/ListaReservas.js";
import Estrenos from "./components/Estrenos.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cartelera",
    element: <Cartelera />,
  },
  {
    path: "/estrenos",
    element: <Estrenos />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "/pelicula/:id",
    element: <DetallesPelicula />,
  },
  {
    path: "/",
    element: <PrivateRoute adminOnly={false} />,
    children: [
      {
        path: "/reservas",
        element: <Reservas />,
      },
    ],
  },
  {
    path: "/",
    element: <PrivateRoute adminOnly={true} />,
    children: [
      {
        path: "/admin",
        element: <HomeAdmin />,
      },
      {
        path: "/admin/dashboard",
        element: <DashboardAdmin />,
      },
      {
        path: "/admin/peliculas",
        element: <MovieForm />,
      },
      {
        path: "/admin-reservas",
        element: <ListaReservas />,
      },
      {
        path: "/admin/cartelera",
        element: <CarteleraAdmin />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <App />
  </React.StrictMode>
);
reportWebVitals();
