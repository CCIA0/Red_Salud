import React, { useEffect, useState } from 'react';

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
    <div>
      <h2>ReservaList</h2>
      <ul>
        {reservas.length === 0 ? (
          <li>No hay reservas registradas.</li>
        ) : (
          reservas.map(reserva => (
            <li key={reserva.id}>
              Fecha: {reserva.fecha} <br />
              Doctor: {reserva.doctor_detail?.nombre || 'Sin asignar'} <br />
              Box: {reserva.box_detail?.codigo ? `Box ${reserva.box_detail.codigo}` : 'Sin box'} <br />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TestAPI;
