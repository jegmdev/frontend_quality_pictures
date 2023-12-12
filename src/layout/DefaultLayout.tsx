import React, { Children } from "react";
import { Link } from "react-router-dom";
import '../css/Menu.css';

interface DefaultLayoutProps {
  children: React.ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <header>
        <div className='div-menu'>
          <nav className="menu">
            <div className="menu-logo">
              <img
                src="https://templatekit.jegtheme.com/cinomy/wp-content/uploads/sites/151/2021/08/cinomy-logo.png"
                alt="Logo de la App"
              />
            </div>
            <ul className="menu-items">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/cartelera">Cartelera</Link>
              </li>
              <li>
                <Link to="/">Estrenos</Link>
              </li>
              <li>
                <Link to="/login">Iniciar sesión</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
