import React, { useState, useEffect } from 'react';

const TestAPI = () => {
  const [doctors, setDoctors] = useState([]);
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    // Fetch Doctores
    fetch('http://127.0.0.1:8000/api/doctors/')
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.error('Error fetching doctors:', err));

    // Fetch Boxes
    fetch('http://127.0.0.1:8000/api/boxes/')
      .then(res => res.json())
      .then(data => setBoxes(data))
      .catch(err => console.error('Error fetching boxes:', err));
  }, []);

  return (
    <div>
      <h2>Lista de Doctores</h2>
      <ul>
        {doctors.length === 0 ? (
          <li>No hay doctores disponibles.</li>
        ) : (
          doctors.map(doc => (
            <li key={doc.id}>{doc.nombre} - {doc.especialidad}</li>
          ))
        )}
      </ul>

      <h2>Lista de Boxes</h2>
      <ul>
        {boxes.length === 0 ? (
          <li>No hay boxes disponibles.</li>
        ) : (
          boxes.map(box => (
            <li key={box.id}>Box: {box.id} Doctor asignado: {box.doctor? box.doctor.nombre : 'Disponible'}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TestAPI;
