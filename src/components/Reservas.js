import React, { useState, useEffect } from "react";
import "../css/Reservas.css";
import DefaultLayout from "../layout/DefaultLayout.tsx";
import { useAuth } from "../auth/AuthProvider.tsx";
import axios from "axios";

const ListaReservas = () => {
  const { user } = useAuth();
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const obtenerTodasLasReservas = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/listareservas");
        const data = await response.json();
        
        // Filtrar las reservas por usuario
        const reservasUsuario = data.filter(reserva => reserva.usuarioId === user.usuarioId);

        setReservas(reservasUsuario);
      } catch (error) {
        console.error("Error al obtener todas las reservas", error);
      }
    };

    obtenerTodasLasReservas();
  }, [user.usuarioId]); 

  const eliminarReserva = async (reservaId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/reservas/${reservaId}`);
  
      if (response.status === 200) {
        alert('Reserva eliminada correctamente');
        // Actualizar la lista de reservas después de eliminar
        const nuevasReservas = reservas.filter((reserva) => reserva.id !== reservaId);
        setReservas(nuevasReservas);
      } else {
        alert('Error al eliminar la reserva');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error de red al intentar eliminar la reserva');
    }
  };

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
        <h2>Lista de Reservas de {user.nombre}</h2>
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
                  <td>
                    <button onClick={() => eliminarReserva(reserva.id)}>
                      Eliminar
                    </button>
                  </td>
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
