import React, { useState, useEffect } from "react";
import "../css/Reservas.css";
import AdminLayout from "../layout/AdminLayout.tsx";
import axios from "axios";

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

  const eliminarSillasDeReserva = async (reservaId, sillasAEliminar) => {
  try {
    const response = await axios.put(`http://localhost:3001/api/reservas/${reservaId}/eliminar-sillas`, { sillasAEliminar });

    if (response.status === 200) {
      alert('Sillas eliminadas de la reserva correctamente');
      // Actualizar la lista de reservas u otras acciones necesarias
    } else {
      alert('Error al eliminar sillas de la reserva');
    }
  } catch (error) {
    console.error('Error de red:', error);
    alert('Error de red al intentar eliminar sillas de la reserva');
  }
};

  

  return (
    <AdminLayout>
      <div className="lista-reservas">
        <h2>Admin - Lista de reservas</h2>
        <div className="table-container">
          <table className="reserva-table">
            <thead>
              <tr>
                <th>ID Reserva</th>
                <th>ID Película</th>
                <th>Película</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Sala</th>
                <th>Cantidad de Sillas</th>
                <th>Total compra</th>
                <th>Acciones</th> {/* Nueva columna para los botones de eliminación */}
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.id}</td>
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
    </AdminLayout>
  );
};

export default ListaReservas;
