import React, { useState, useEffect } from "react";
import "../css/Reservas.css";
import DefaultLayout from "../layout/DefaultLayout.tsx";
import { useAuth } from "../auth/AuthProvider.tsx";
import axios from "axios";
import jsPDF from "jspdf";

const ListaReservas = () => {
  const { user } = useAuth();
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const obtenerTodasLasReservas = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/listareservas");
        const data = await response.json();

        // Filtrar las reservas por usuario
        const reservasUsuario = data.filter(
          (reserva) => reserva.usuarioId === user.usuarioId
        );

        // Ordenar las reservas por fecha de manera descendente (las más recientes primero)
        reservasUsuario.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        setReservas(reservasUsuario);
      } catch (error) {
        console.error("Error al obtener todas las reservas", error);
      }
    };

    obtenerTodasLasReservas();
  }, [user.usuarioId]);

  const eliminarReserva = async (reservaId) => {
    // Mostrar un mensaje de confirmación
    const confirmacion = window.confirm(
      `¿Está seguro que quiere cancelar su reserva?`
    );

    // Si el usuario confirma la eliminación
    if (confirmacion) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/reservas/${reservaId}`
        );

        if (response.status === 200) {
          alert("Reserva eliminada correctamente");
          // Actualizar la lista de reservas después de eliminar
          const nuevasReservas = reservas.filter(
            (reserva) => reserva.id !== reservaId
          );
          setReservas(nuevasReservas);
        } else {
          alert("Error al eliminar la reserva");
        }
      } catch (error) {
        console.error("Error de red:", error);
        alert("Error de red al intentar eliminar la reserva");
      }
    }
  };

  const generarTicketPDF = (reserva) => {
    // Crear un nuevo documento PDF
    const doc = new jsPDF();

    // Establecer estilos de texto
    doc.setFont("Arial, sans-serif");
    doc.setFontSize(18);
    doc.setTextColor("#FFFFFF"); // Texto blanco

    // Agregar fondo
    doc.setFillColor("#17273F"); // Fondo oscuro
    doc.rect(0, 0, 210, 297, "F");

    // Agregar contenido al PDF
    doc.setTextColor("#F4D03F"); // Texto amarillo para título
    doc.setFontSize(26); // Tamaño grande para título
    doc.text(`Ticket de Reserva Cinomy`, 10, 20);

    // Agregar línea blanca
    doc.setDrawColor(255, 255, 255); // Línea blanca
    doc.setLineWidth(0.5); // Grosor de la línea
    doc.line(10, 25, 200, 25); // Línea blanca debajo del título

    doc.setTextColor("#FFFFFF"); // Restaurar color de texto blanco
    doc.setFontSize(18); // Restaurar tamaño de fuente

    // Formatear la fecha
    const fechaISO = reserva.fecha;
    const fecha = new Date(fechaISO);
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Ajusta el mes a dos dígitos
    const dia = String(fecha.getDate()).padStart(2, "0"); // Ajusta el día a dos dígitos
    const fechaFormateada = `${año}-${mes}-${dia}`;

    // Agregar detalles de la reserva
    doc.text(`Cliente: ${user.nombre} ${user.apellidos}`, 10, 40);
    doc.text(`Pelicula: ${reserva.pelicula}`, 10, 50);
    doc.text(`Fecha: ${fechaFormateada}`, 10, 60); // Fecha formateada
    doc.text(`Hora: ${reserva.hora}`, 10, 70);
    doc.text(`Sillas: ${reserva.asientos}`, 10, 80);
    doc.text(`${reserva.sala}`, 10, 90);
    doc.text(`Total de compra: ${reserva.total}.000`, 10, 100);

    // Descargar el PDF
    doc.save(`ticket_${reserva.id}.pdf`);
  };

  const eliminarSillasDeReserva = async (reservaId, sillasAEliminar) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/reservas/${reservaId}/eliminar-sillas`,
        { sillasAEliminar }
      );

      if (response.status === 200) {
        alert("Sillas eliminadas de la reserva correctamente");
        window.location.reload();
      } else {
        alert("Error al eliminar sillas de la reserva");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error de red al intentar eliminar sillas de la reserva");
    }
  };

  const promptEliminarSillas = (reservaId) => {
    const sillasAEliminarInput = prompt(
      "Ingrese las sillas a eliminar, separadas por coma"
    );

    if (sillasAEliminarInput !== null) {
      const sillasAEliminar = sillasAEliminarInput
        .split(",")
        .map((silla) => silla.trim().toUpperCase());

      if (sillasAEliminar.length > 0) {
        eliminarSillasDeReserva(reservaId, sillasAEliminar);
      } else {
        alert("Por favor, ingrese al menos una silla para eliminar.");
      }
    } else {
      alert("Operación cancelada. No se eliminaron sillas.");
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
        <h2>
          Lista de Reservas de {user.nombre} {user.apellidos}
        </h2>
        <div className="table-container">
          <table className="reserva-table">
            <thead>
              <tr>
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
                  <td>{reserva.pelicula}</td>
                  <td>{`${formatearFecha(reserva.fecha)}`}</td>
                  <td>{`${reserva.hora}`}</td>
                  <td>{reserva.sala}</td>
                  <td>{reserva.asientos}</td>
                  <td>{`${reserva.total}.000`}</td>
                  <td>
                    <button
                      className="btn-cancelar"
                      onClick={() => eliminarReserva(reserva.id)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="btn-editar"
                      onClick={() => promptEliminarSillas(reserva.id)}
                    >
                      Editar Sillas
                    </button>
                    <button
                      className="btn-ticket"
                      onClick={() => generarTicketPDF(reserva)}
                    >
                      Ticket
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
