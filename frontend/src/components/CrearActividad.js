import React, { useState, useEffect } from 'react';

function CrearActividad({ token }) {
  const [nombre, setNombre] = useState('');
  const [actividades, setActividades] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (token) loadActividades();
  }, [token]);

  const loadActividades = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/actividades/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Error al cargar actividades');
      const data = await response.json();
      setActividades(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `http://localhost:8000/api/actividades/${editingId}/`
      : 'http://localhost:8000/api/actividades/';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre }),
      });

      if (response.ok) {
        alert(editingId ? 'Actividad actualizada' : 'Actividad creada');
        setNombre('');
        setEditingId(null);
        await loadActividades();
      } else {
        alert('Error al guardar actividad');
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión');
    }
  };

  const handleEdit = (actividad) => {
    setNombre(actividad.nombre);
    setEditingId(actividad.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta actividad?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/actividades/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Actividad eliminada');
        if (editingId === id) {
          setNombre('');
          setEditingId(null);
        }
        await loadActividades();
      } else {
        alert('Error al eliminar actividad');
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{editingId ? 'Editar Actividad' : 'Crear Actividad'}</h2>
        <input
          type="text"
          placeholder="Ej: Consulta, Procedimiento"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <button type="submit">
          {editingId ? 'Actualizar' : 'Crear'}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setNombre(''); setEditingId(null); }} style={{ marginLeft: 10 }}>
            Cancelar
          </button>
        )}
      </form>

      <hr />

      <h3>Actividades existentes</h3>
      {actividades.length === 0 ? (
        <p>No hay actividades registradas.</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0" style={{ marginTop: 10 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {actividades.map((act) => (
              <tr key={act.id}>
                <td>{act.id}</td>
                <td>{act.nombre}</td>
                <td>
                  <button onClick={() => handleEdit(act)}>Editar</button>
                  <button onClick={() => handleDelete(act.id)} style={{ marginLeft: 10, color: 'red' }}>
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

export default CrearActividad;
