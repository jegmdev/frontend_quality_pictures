import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/Reserva.css";
import DefaultLayout from "../layout/DefaultLayout.tsx";

const ReservarSilla = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [peli, setPeli] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState("");
  const [detallesPelicula, setDetallesPelicula] = useState(null);
  const [peliculas, setPeliculas] = useState([]);

  const horas = ["12pm", "3pm", "6pm", "9pm"];

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = "https://api.themoviedb.org/3/movie/now_playing";
      const apiKey = "14b5366a2c78d02ef27b5efc74e15ed7";

      try {
        const response = await axios.get(apiUrl, {
          params: {
            api_key: apiKey,
            language: "es-ES",
            page: 1,
          },
        });

        const peliculasData = response.data.results.map((pelicula) => ({
          id: pelicula.id,
          title: pelicula.title,
        }));

        setPeliculas(peliculasData);
      } catch (error) {
        console.error("Error al obtener la lista de películas:", error);
      }
    };

    fetchData();
  }, []);

  const seleccionarPeli = (e) => {
    setPeli(e.target.value);
    setDetallesPelicula(null); // Limpiamos los detalles al cambiar la película
  };

  const seleccionarHora = (e) => {
    setHora(e.target.value);
  };

  const selectSeat = (row, seat) => {
    setSelectedSeats((prevSeats) => {
      if (prevSeats.some((s) => s.row === row && s.seat === seat)) {
        return prevSeats.filter((s) => !(s.row === row && s.seat === seat));
      } else if (prevSeats.length < 5) {
        return [...prevSeats, { row, seat }];
      } else {
        return prevSeats;
      }
    });
  };

  const isSeatSelected = (row, seat) => {
    return selectedSeats.some((s) => s.row === row && s.seat === seat);
  };

  const calculateTotal = () => {
    const seatPrice = 10;
    return selectedSeats.length * seatPrice;
  };

  const total = calculateTotal();

  const getRowLetter = (index) => {
    return String.fromCharCode("A".charCodeAt(0) + index);
  };

  const verDetallesPelicula = async () => {
    if (peli) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${peli}`,
          {
            params: {
              api_key: "14b5366a2c78d02ef27b5efc74e15ed7",
              language: "es-ES",
            },
          }
        );

        setDetallesPelicula({
          posterPath: `https://image.tmdb.org/t/p/w500${response.data.poster_path}`,
          titulo: response.data.title,
          sinopsis: response.data.overview,
          genero: response.data.genres[0]?.name || "Género Desconocido",
          formato: response.data.imax ? "3D" : "2D",
          duracion: response.data.runtime
            ? `${Math.floor(response.data.runtime / 60)}h ${response.data.runtime % 60}min`
            : "Duración Desconocida",
        });
      } catch (error) {
        console.error("Error al obtener detalles de la película:", error);
      }
    }
  };

  return (
    <DefaultLayout>
      <div className="reservar-silla">
        {detallesPelicula && (
          <div className="detalles-pelicula">
            <div className="contenedor-peli">
              <div className="poster">
                <img
                  src={detallesPelicula.posterPath}
                  alt={detallesPelicula.title}
                />
              </div>
              <div className="info-peli">
                <h2>Detalles de la película</h2>
                <p>
                  <b>Título:</b> {detallesPelicula.titulo}
                </p>
                <p>
                  <b>Sinopsis:</b> {detallesPelicula.sinopsis}
                </p>
                <p>
                  <b>Género:</b> {detallesPelicula.genero}
                </p>
                <p>
                  <b>Formato:</b> {detallesPelicula.formato}
                </p>
                <p>
                  <b>Duración:</b> {detallesPelicula.duracion}
                </p>
              </div>
            </div>
          </div>
        )}
        <h1>Reserva tu entrada</h1>
        <div className="contenedor">
          <div className="formulario-container">
            <div className="formulario">
              <div className="campo">
                <label>Película:</label>
                <select value={peli} onChange={seleccionarPeli}>
                  <option value="">Seleccione una película</option>
                  {peliculas.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
                {peli && (
                  <button onClick={verDetallesPelicula}>Ver Detalles</button>
                )}
              </div>

              <div className="campo">
                <label>Fecha:</label>
                <DatePicker
                  selected={fecha}
                  onChange={(date) => setFecha(date)}
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                />
              </div>

              <div className="campo">
                <label>Hora:</label>
                <select value={hora} onChange={seleccionarHora}>
                  <option value="">Seleccione una hora</option>
                  {horas.map((h, index) => (
                    <option key={index} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="sillas-container">
            <h1>Pantalla</h1>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="fila">
                <span className="letra-fila">{getRowLetter(i)}</span>
                {[...Array(10)].map((_, j) => (
                  <div
                    key={j}
                    className={`silla ${
                      isSeatSelected(i + 1, j + 1) ? "seleccionada" : ""
                    }`}
                    onClick={() => selectSeat(i + 1, j + 1)}
                  >
                    <span className="numero-asiento">{j + 1}</span>
                  </div>
                ))}
              </div>
            ))}
            <p>Total: ${total.toFixed(3)}</p>
            <p>Asientos seleccionados: {selectedSeats.length}</p>
            <button className="boton">Reservar</button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ReservarSilla;
