import React, { useState } from "react";
import "../css/Reserva.css";

const ReservarSilla = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [peli, setPeli] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const peliculas = ["Leo", "Trolls 3: Todos juntos", "Five Nights at Freddy"];
  const fechas = ["30/11/2023", "01/12/2023", "02/12/2023"];
  const horas = ["11:50", "13:40", "16:35", "17:30", "19:50", "21:10"];

  const seleccionarPeli = (e) => {
    setPeli(e.target.value);
  };

  const seleccionarFecha = (e) => {
    setFecha(e.target.value);
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

  return (
    <div className="reservar-silla">
      <h1>Reserva tu entrada</h1>
      <div className="contenedor">
        <div className="formulario-container">
          <div className="formulario">
            <div className="campo">
              <label>Película:</label>
              <select value={peli} onChange={seleccionarPeli}>
                <option value="">Seleccione una película</option>
                {peliculas.map((p, index) => (
                  <option key={index} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo">
              <label>Fecha:</label>
              <select value={fecha} onChange={seleccionarFecha}>
                <option value="">Seleccione una fecha</option>
                {fechas.map((f, index) => (
                  <option key={index} value={f}>
                    {f}
                  </option>
                ))}
              </select>
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
  );
};

export default ReservarSilla;
