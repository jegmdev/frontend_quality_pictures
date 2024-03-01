import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/Detalles.css";
import DefaultLayout from "../layout/DefaultLayout.tsx";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider.tsx";
import { API_URL } from "../constants.ts";

const DetallesPelicula = () => {
  const { id } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [pelicula, setPelicula] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState("");
  const [sala, setSala] = useState("");
  const [detallesPelicula, setDetallesPelicula] = useState(null);
  const [reservaMessage, setReservaMessage] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [errorReserva, setErrorReserva] = useState(null);
  const { isAuthenticated } = useAuth();
  const { user } = useAuth();
  const userId = user ? user.usuarioId : null;

  const salasAsientos = {
    Sala1: {
      filas: 5,
      asientosPorFila: 8,
    },
    Sala2: {
      filas: 6,
      asientosPorFila: 8,
    },
    Sala3: {
      filas: 7,
      asientosPorFila: 8,
    },
  };

  const horas = ["12pm", "3pm", "6pm", "9pm"];

  useEffect(() => {
    const fetchData = async () => {
      if (id && id.length > 4) {
        try {
          // Intenta obtener detalles de la película desde la primera API
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}`,
            {
              params: {
                api_key: "14b5366a2c78d02ef27b5efc74e15ed7",
                language: "es-ES",
                sala: sala,
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
              ? `${Math.floor(response.data.runtime / 60)}h ${
                  response.data.runtime % 60
                }min`
              : "Duración Desconocida",
          });

          setPelicula(response.data.title);
        } catch (error) {
          console.error(
            "Error al obtener detalles de la película desde la primera API:",
            error
          );
        }
      } else if (id) {
        // Si el id tiene 4 dígitos o menos, busca solo en la segunda API
        try {
          const response = await axios.get(
            `${API_URL}/api/estrenos/${id}`
          );

          setDetallesPelicula({
            posterPath: response.data.imagen_promocional,
            titulo: response.data.titulo,
            sinopsis: response.data.sinopsis,
            genero: response.data.genero,
            formato: "2D", // Ajusta según la información que proporciona la segunda API
            duracion: response.data.duracion,
          });

          setPelicula(response.data.titulo);
        } catch (secondApiError) {
          console.error(
            "Error al obtener detalles de la película desde la segunda API:",
            secondApiError
          );
        }
      }
    };

    fetchData();
  }, [id, sala]);

  useEffect(() => {
    const fetchReservasExistencias = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/reservas`, {
          params: {
            idPelicula: id,
            fecha: fecha.toISOString().slice(0, 10),
            hora,
            sala,
          },
        });

        setReservas(response.data);
      } catch (error) {
        console.error("Error al obtener las reservas existentes:", error);
      }
    };

    if (id && fecha && hora && sala) {
      fetchReservasExistencias();
    }
  }, [id, sala, fecha, hora]);

  const selectSeat = (row, seat) => {
    const isReserved = reservas.some((reserva) =>
      reserva.asientos.includes(getSeatLabel(row, seat))
    );

    setSelectedSeats((prevSeats) => {
      if (isReserved) {
        return prevSeats;
      }

      if (prevSeats.some((s) => s.row === row && s.seat === seat)) {
        return prevSeats.filter((s) => !(s.row === row && s.seat === seat));
      }

      if (prevSeats.length < 5) {
        return [...prevSeats, { row, seat }];
      }

      return prevSeats;
    });
  };

  const reservedSeatsLabel = (
    <p className="asientos-reservados-label">
      Asientos Reservados: Estos asientos ya han sido seleccionados por otros
      usuarios.
    </p>
  );

  const isSeatSelected = (row, seat) => {
    return selectedSeats.some((s) => s.row === row && s.seat === seat);
  };

  const calculateTotal = () => {
    const seatPrice = 10;
    return selectedSeats.length * seatPrice;
  };

  const total = calculateTotal();

  const getSeatLabel = (row, seat) => {
    const rowLetter = String.fromCharCode("A".charCodeAt(0) + row);
    return `${rowLetter}${seat}`;
  };

  const seleccionarHora = (e) => {
    setHora(e.target.value);
  };

  const handleReservarClick = async () => {
    if (!isAuthenticated) {
      // Redireccionar al usuario a la página de inicio de sesión si no está autenticado
      window.location.href = "/login";
      return;
    }

    console.log("ID user:", user.usuarioId);

    const formattedDate = fecha.toISOString().slice(0, 19).replace("T", " ");

    try {
      const response = await axios.post(`${API_URL}/api/reservar`, {
        idPelicula: id,
        pelicula,
        fecha: formattedDate,
        hora,
        sala,
        asientos: selectedSeats.map((seat) =>
          getSeatLabel(seat.row, seat.seat)
        ),
        total,
        usuarioId: userId,
      });

      setReservaMessage(response.data.message);

      setReservas((prevReservas) => [
        ...prevReservas,
        {
          id: response.data.id,
          fecha: formattedDate,
          hora,
          sala,
          asientos: selectedSeats.map((seat) =>
            getSeatLabel(seat.row, seat.seat)
          ),
          total,
        },
      ]);
      alert(
        `Reserva exitosa. Película: ${pelicula}\nAsientos seleccionados: ${selectedSeats
          .map((seat) => getSeatLabel(seat.row, seat.seat))
          .join(", ")}`
      );
      window.location.reload();
    } catch (error) {
      console.error("Error al realizar la reserva:", error);
      setErrorReserva(
        "Error al realizar la reserva. Por favor, inténtelo de nuevo."
      );
    }
  };

  const selectedSeatsDetails = selectedSeats.map((seat, index) => (
    <span key={`${seat.row}-${seat.seat}`} className="asiento-seleccionado">
      {getSeatLabel(seat.row, seat.seat)}
      {index < selectedSeats.length - 1 && " "}
    </span>
  ));

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
        {reservaMessage && (
          <p
            className={
              reservaMessage.includes("correctamente") ? "success" : "error"
            }
          >
            {reservaMessage}
          </p>
        )}
        {errorReserva && <p className="error">{errorReserva}</p>}
        <div className="contenedor">
          <div className="formulario-container">
            <div className="formulario">
              <div className="campo" id="id-pelicula">
                <label>Película ID:</label>
                <input
                  type="text"
                  value={id}
                  placeholder="ID de la película"
                  readOnly
                />
              </div>

              <div className="campo" id="id-pelicula">
                <label>Película:</label>
                <input
                  type="text"
                  value={pelicula}
                  placeholder="Película"
                  readOnly
                />
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

              <div className="campo">
                <label>Sala:</label>
                <select value={sala} onChange={(e) => setSala(e.target.value)}>
                  <option value="">Seleccione una sala</option>
                  <option value="Sala1">Sala 1</option>
                  <option value="Sala2">Sala 2</option>
                  <option value="Sala3">Sala 3</option>
                </select>
              </div>
            </div>
          </div>

          <div className="sillas-container">
            <h1>Pantalla - {sala}</h1>
            {reservas.length > 0 && reservedSeatsLabel}
            {[...Array(salasAsientos[sala]?.filas || 0)].map((_, i) => (
              <div key={i} className="fila">
                <span className="letra-fila">{getSeatLabel(i, 0)}</span>
                {[...Array(salasAsientos[sala]?.asientosPorFila || 0)].map(
                  (_, j) => (
                    <div
                      key={j}
                      className={`silla ${
                        isSeatSelected(i, j + 1) ? "seleccionada" : ""
                      } ${
                        reservas.some((reserva) =>
                          reserva.asientos.includes(getSeatLabel(i, j + 1))
                        )
                          ? "reservada"
                          : ""
                      }`}
                      onClick={() => selectSeat(i, j + 1)}
                    >
                      <span className="numero-asiento">{j + 1}</span>
                    </div>
                  )
                )}
              </div>
            ))}
            <p>Total: ${total.toFixed(2)}</p>
            <div className="asientos-seleccionados">
              <p>Asientos seleccionados:</p>
              {selectedSeatsDetails.length > 0 ? (
                selectedSeatsDetails
              ) : (
                <p>No se han seleccionado asientos</p>
              )}
            </div>
            <button className="boton" onClick={handleReservarClick}>
              Reservar
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DetallesPelicula;
