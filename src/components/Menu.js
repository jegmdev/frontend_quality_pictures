import React from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import '../css/Menu.css';

const Menu = () => {
  return (
    <div>
      <nav className="menu">
        <div className="menu-logo">
          <img src="https://templatekit.jegtheme.com/cinomy/wp-content/uploads/sites/151/2021/08/cinomy-logo.png" alt="Logo de la App" />
        </div>
        <ul className="menu-items">
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/cartelera'>Cartelera</Link>
          </li>
          <li>
            <Link to='/reserva'>Reservar</Link>
          </li>
          <li>
            <Link to='/login'>Iniciar Sesión</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Menu;
