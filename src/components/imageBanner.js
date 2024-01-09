import React from "react";
import "../css/Banner.css";
import { Link } from "react-router-dom";

const ImageBanner = () => {
  return (
    <div className="banner-container">
      <div className="cartelera-content">
        <h2 className="cartelera-text">
          ¡Vuelven los Miércoles de cine con 50% de descuento!
        </h2>
        <Link className="button" to="/cartelera">Cartelera</Link>
      </div>
    </div>
  );
};

export default ImageBanner;
