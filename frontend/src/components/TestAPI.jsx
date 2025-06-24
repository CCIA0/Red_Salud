import React, { useEffect, useState } from 'react';
import "../styles/TestAPI.css"

function TestAPI({ token }) {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/reservas/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        // Adaptamos para soportar paginación o array directo
        const reservaList = Array.isArray(data) ? data : data.results || [];
        setReservas(reservaList);
      })
      .catch(err => console.error('Error al obtener reservas:', err));
  }, [token]);

  return (
  <div className="reservas-container">
    <h2>Reservas</h2>
    <ul className="reservas-list">
      {reservas.length === 0 ? (
        <li className="reserva-vacio">No hay reservas registradas.</li>
      ) : (
        reservas.map(reserva => (
          <li className="reserva-item" key={reserva.id}>
            <strong>Fecha:</strong> {reserva.fecha} <br />
            <strong>Doctor:</strong> {reserva.doctor_detail?.nombre || 'Sin asignar'} <br />
            <strong>Box:</strong> {reserva.box_detail?.codigo ? `Box ${reserva.box_detail.codigo}` : 'Sin box'} <br />
          </li>
        ))
      )}
    </ul>
  </div>
);
}

export default TestAPI;
