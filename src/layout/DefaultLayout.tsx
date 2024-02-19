import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Menu.css";
import { useAuth } from "../auth/AuthProvider.tsx";

const DefaultLayout = ({ children }) => {
  const [menuItemsVisible, setMenuItemsVisible] = useState(false); // Inicialmente oculto
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenuItems = () => {
    setMenuItemsVisible(!menuItemsVisible); // Cambiar el estado de visibilidad
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
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
            <ul className={`menu-items ${menuItemsVisible ? "active" : ""}`}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/cartelera">Cartelera</Link>
              </li>
              <li>
                <Link to="/estrenos">Restrenos</Link>
              </li>
              <li>
                <Link to="/reservas">Reservas</Link>
              </li>
              {isAuthenticated ? (
                <li onClick={handleLogout}>Cerrar Sesión</li>
              ) : (
                <li><Link to="/login">Iniciar Sesión</Link></li>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};

export default DefaultLayout;
