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
import Reservas from "./components/Reservas";
import Login from "./auth/Login.tsx";
import Home from "./components/Home";
import HomeAdmin from "./components/HomeAdmin.js";
import Registro from "./auth/Registro";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardAdmin from "./components/DashboardAdmin";
import MovieForm from "./components/MovieForm.js";
import DetallesPelicula from "./components/DetallesPelicula.js";
import ListaReservas from "./components/Reservas";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <HomeAdmin />,
  },
  {
    path: "/cartelera",
    element: <Cartelera />,
  },
  {
    path: "/reservas",
    element: <Reservas />,
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
    path: "/admin/peliculas",
    element: <MovieForm />,
  },
  {
    path: "/admin/listareservas",
    element: <ListaReservas />,
  },
  {
    path: "/pelicula/:id",
    element: <DetallesPelicula />,
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/admin",
        element: <DashboardAdmin />,
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
