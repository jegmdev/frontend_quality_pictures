import React, { useState, useEffect } from "react";
import "../css/Reservas.css";
import DefaultLayout from "../layout/DefaultLayout.tsx";

const ListaReservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const obtenerTodasLasReservas = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/listareservas");
        const data = await response.json();
        setReservas(data);
      } catch (error) {
        console.error("Error al obtener todas las reservas", error);
      }
    };

    obtenerTodasLasReservas();
  }, []);

  const formatearFecha = (fecha) => {
    const fechaFormateada = new Date(fecha);
    const dia = fechaFormateada.getDate();
    const mes = fechaFormateada.getMonth() + 1; // Sumamos 1 porque los meses son indexados desde 0
    const año = fechaFormateada.getFullYear();

    return `${dia}/${mes}/${año}`;
  };

  return (
    <DefaultLayout>
      <div className="lista-reservas">
        <h2>Lista de Reservas</h2>
        <div className="table-container">
          <table className="reserva-table">
            <thead>
              <tr>
                <th>ID Película</th>
                <th>Película</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Sala</th>
                <th>Cantidad de Sillas</th>
                <th>Total compra</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva, index) => (
                <tr key={index}>
                  <td>{reserva.peliculaId}</td>
                  <td>{reserva.pelicula}</td>
                  <td>{`${formatearFecha(reserva.fecha)}`}</td>
                  <td>{`${reserva.hora}`}</td>
                  <td>{reserva.sala}</td>
                  <td>{reserva.asientos}</td>
                  <td>{reserva.total}.000</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ListaReservas;
