import React from "react";
import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <div className="logo">
            <img
              src="https://templatekit.jegtheme.com/cinomy/wp-content/uploads/sites/151/2021/08/cinomy-logo.png"
              alt="Logo"
            />
          </div>
        </div>
        <div className="footer-section">
          <ul>
            <h3>Contacto</h3>
            <li>Dirección: Calle Principal, Ciudad</li>
            <li>Email: info@cinomy.com</li>
            <li>Teléfono: +123 456 789</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li>
              <a href="/">Inicio</a>
            </li>
            <li>
              <a href="/cartelera">Cartelera</a>
            </li>
            <li>
              <a href="/reservas">Mis Reservas</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Síguenos</h3>
          <div className="social-icons">
            <a
              href="https://github.com/jegmdev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="social-icon"
                src="https://cdn-icons-png.flaticon.com/512/4494/4494477.png"
                alt=""
              />
            </a>
            <a
              href="https://github.com/jegmdev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="social-icon"
                src="https://cdn-icons-png.flaticon.com/512/4494/4494488.png"
                alt=""
              />
            </a>
            <a
              href="https://github.com/jegmdev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="social-icon"
                src="https://cdn-icons-png.flaticon.com/512/4494/4494485.png"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Cinomy. Todos los derechos reservados.</p>
        <p>Desarrollado por <a href="https://github.com/jegmdev" target="_blank" rel="noopener noreferrer">TresCoders</a></p>
      </div>
    </footer>
  );
};

export default Footer;
