import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Menu.css";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: DashboardLayoutProps) {
  const [menuItemsVisible, setMenuItemsVisible] = useState(true);

  const toggleMenuItems = () => {
    setMenuItemsVisible((prevVisibility) => !prevVisibility);
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
                <Link to="/reservas">Lista Reservas</Link>
              </li>
              <li>
                <Link to="">Cerrar sesión</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
