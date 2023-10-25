import React from 'react';
import './Menu.css'; // Asegúrate de tener un archivo CSS separado para los estilos
import LoginButton from './LoginButton';

const Menu = () => {
  return (
    <nav className="menu">
      <div className="menu-logo">
        <img src="http://pink-anteater-360296.hostingersite.com/wp-content/uploads/2023/10/cinomy-logo-1.png" alt="Logo de la App" />
      </div>
      <ul className="menu-items">
        <li><a href="#">Home</a></li>
        <li><a href="#">Cartelera</a></li>
        <li><a href="#">Perfil</a></li>
        <li>
            <LoginButton/>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
