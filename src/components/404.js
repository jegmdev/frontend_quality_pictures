import React from 'react';
import '../css/NotFound.css'; // Importa tus estilos CSS

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Página no encontrada</h1>
      <p className="not-found-text">Lo sentimos, la página que estás buscando no existe.</p>
      <a href="/" className="not-found-link">Volver a Cinomy</a>
    </div>
  );
};

export default NotFound;
