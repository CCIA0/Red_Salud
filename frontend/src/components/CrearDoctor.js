import React, { useState, useEffect } from 'react';

function CrearDoctor({ token }) {
  const [nombre, setNombre] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [doctores, setDoctores] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Cargar doctores desde la API
  const loadDoctores = () => {
    fetch('http://localhost:8000/api/doctores/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setDoctores(Array.isArray(data) ? data : []))
      .catch(err => console.error('Error cargando doctores:', err));
  };

  useEffect(() => {
    loadDoctores();
  }, []);

  const resetForm = () => {
    setNombre('');
    setEspecialidad('');
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `http://localhost:8000/api/doctores/${editingId}/`
      : 'http://localhost:8000/api/doctores/';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ nombre, especialidad }),
    });

    if (response.ok) {
      alert(editingId ? 'Doctor actualizado' : 'Doctor creado exitosamente');
      resetForm();
      loadDoctores();
    } else {
      alert('Error al guardar doctor');
    }
  };

  const handleEdit = (doctor) => {
    setNombre(doctor.nombre);
    setEspecialidad(doctor.especialidad);
    setEditingId(doctor.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este doctor?')) return;

    const response = await fetch(`http://localhost:8000/api/doctores/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      alert('Doctor eliminado');
      if (editingId === id) resetForm();
      loadDoctores();
    } else {
      alert('Error al eliminar doctor');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{editingId ? 'Editar Doctor' : 'Crear Doctor'}</h2>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          placeholder="Especialidad"
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)}
          required
        />
        <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            style={{ marginLeft: '10px' }}
          >
            Cancelar
          </button>
        )}
      </form>

      <hr />

      <h3>Doctores registrados</h3>
      {doctores.length === 0 ? (
        <p>No hay doctores registrados.</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Especialidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {doctores.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.nombre}</td>
                <td>{doctor.especialidad}</td>
                <td>
                  <button onClick={() => handleEdit(doctor)}>Editar</button>
                  <button
                    onClick={() => handleDelete(doctor.id)}
                    style={{ marginLeft: '10px', color: 'red' }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CrearDoctor;
