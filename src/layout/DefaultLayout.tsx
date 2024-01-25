import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Menu.css";
import { useAuth } from "../auth/AuthProvider.tsx";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const [menuItemsVisible, setMenuItemsVisible] = useState(true);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  console.log("Estado de autenticación en DefaultLayout:", isAuthenticated);

  const toggleMenuItems = () => {
    setMenuItemsVisible((prevVisibility) => !prevVisibility);
  };

  const handleLogout = async () => {
    console.log("Antes de cerrar sesión");
    await logout();
    console.log("Después de cerrar sesión");
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
            <ul className={`menu-items ${menuItemsVisible ? "" : "hidden"}`}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/cartelera">Cartelera</Link>
              </li>
              <li>
                <Link to="/reservas">Reservas</Link>
              </li>
              <li>
                <Link to="/">Estrenos</Link>
              </li>
              <li>
                {isAuthenticated ? (
                  <span onClick={handleLogout}>Cerrar Sesión</span>
                ) : (
                  <Link to="/login">Iniciar Sesión</Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};

export default DefaultLayout;
