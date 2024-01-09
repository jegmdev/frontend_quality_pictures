import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Menu.css";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
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
                <Link to="/admin/peliculas">Administrar Películas</Link>
              </li>
              <li>
                <Link to="/admin/reservas">Lista Reservas</Link>
              </li>
              <li>
                <Link to="/admin/peliculas">Cerrar sesión</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
