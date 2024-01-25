import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Menu.css";
import { useAuth } from "../auth/AuthProvider.tsx"; // Ajusta la ruta según la ubicación real

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [menuItemsVisible, setMenuItemsVisible] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenuItems = () => {
    setMenuItemsVisible((prevVisibility) => !prevVisibility);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    // Puedes redirigir al usuario o realizar otras tareas después de cerrar sesión si es necesario
  };

  return (
    <>
      <header>
        <div className="div-menu">
          <nav className="menu">
            <div className="logo-icon-container">
              <div className="menu-logo">
                <img
                  src="https://templatekit.jegtheme.com/cinomy/wp-content/uploads/sites/151/2021/08/cinomy-logo.png"
                  alt="Logo de la App"
                />
              </div>
              <div className="menu-icon" onClick={toggleMenuItems}>
                <img
                  src="https://i.postimg.cc/j2t41Pfd/icon-menu.png"
                  alt="Icono del Menú"
                />
              </div>
            </div>
            <ul className={`menu-items ${menuItemsVisible ? "" : "hidden"}`}>
              <li>
                <Link to="/admin">Home</Link>
              </li>
              <li>
                <Link to="/admin/peliculas">Crear Películas</Link>
              </li>
              <li>
                <Link to="/admin/cartelera">Administrar Cartelera</Link>
              </li>
              <li>
                <Link to="/admin-reservas">Lista Reservas</Link>
              </li>
              <li onClick={handleLogout}>Cerrar Sesión</li>
            </ul>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
