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
import Reserva from "./components/Reserva";
import Login from "./auth/Login";
import Home from "./components/Home";
import Registro from "./auth/Registro";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardAdmin from "./components/DashboardAdmin";
import MovieForm from "./components/MovieForm.js";
import DetallesPelicula from "./components/DetallesPelicula.js";
import { MovieProvider } from "./context/MovieContext.js";
import Cartelera2 from "./components/Cartelera2";

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
    path: "/cartelera2",
    element: <Cartelera2 />,
  },
  {
    path: "/reserva",
    element: <Reserva />,
  },
  {
    path: "/pelicula/:id",
    element: <DetallesPelicula />,
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
    path: "/reserva/:id",
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
    <MovieProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <App />
    </MovieProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
