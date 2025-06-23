import React, { useState, useEffect } from 'react';
import "../styles/CrearBox.css"

function CrearBox() {
  const [codigo, setCodigo] = useState('');
  const [actividadId, setActividadId] = useState('');
  const [actividades, setActividades] = useState([]);

  const [boxes, setBoxes] = useState([]);
  const [editingId, setEditingId] = useState(null); // Para saber si estamos editando

  // Cargar actividades
  useEffect(() => {
    fetch('http://localhost:8000/api/actividades/')
      .then(res => res.json())
      .then(data => setActividades(Array.isArray(data) ? data : []))
      .catch(err => console.error('Error cargando actividades:', err));
  }, []);

  // Cargar boxes
  const loadBoxes = () => {
    fetch('http://localhost:8000/api/boxes/')
      .then(res => res.json())
      .then(data => setBoxes(Array.isArray(data) ? data : []))
      .catch(err => console.error('Error cargando boxes:', err));
  };

  useEffect(() => {
    loadBoxes();
  }, []);

  const resetForm = () => {
    setCodigo('');
    setActividadId('');
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `http://localhost:8000/api/boxes/${editingId}/`
      : 'http://localhost:8000/api/boxes/';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        codigo: parseInt(codigo),
        actividad_id: actividadId || null,
      }),
    });

    if (response.ok) {
      alert(editingId ? 'Box actualizado' : 'Box creado exitosamente');
      resetForm();
      loadBoxes();
    } else {
      alert('Error al guardar el box');
    }
  };

  const handleEdit = (box) => {
    setCodigo(box.codigo.toString());
    setActividadId(box.actividad?.id?.toString() || '');
    setEditingId(box.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este box?')) return;

    const response = await fetch(`http://localhost:8000/api/boxes/${id}/`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Box eliminado');
      if (editingId === id) resetForm();
      loadBoxes();
    } else {
      alert('Error al eliminar el box');
    }
  };

  return (
  <div className="crear-box-container">
    <form onSubmit={handleSubmit}>
      <h2>{editingId ? 'Editar Box' : 'Agregar Box'}</h2>

      <div className="fila-doble">
        <div className="form-item">
          <label htmlFor="codigo">Código:</label>
          <input
            id="codigo"
            type="number"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
        </div>

        <div className="form-item">
          <label htmlFor="actividad">Actividad:</label>
          <select
            id="actividad"
            value={actividadId}
            onChange={(e) => setActividadId(e.target.value)}
          >
            <option value="">------</option>
            {actividades.map(act => (
              <option key={act.id} value={act.id}>{act.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit">{editingId ? 'Actualizar' : 'Guardar'}</button>
      {editingId && (
        <button type="button" onClick={resetForm} style={{ marginLeft: '10px' }}>
          Cancelar
        </button>
      )}
    </form>

    <hr />

    <h3>Boxes creados</h3>
    {boxes.length === 0 ? (
      <p>No hay boxes creados.</p>
    ) : (
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Actividad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {boxes.map(box => (
            <tr key={box.id}>
              <td>{box.id}</td>
              <td>{box.codigo}</td>
              <td>{box.actividad ? box.actividad.nombre : '-'}</td>
              <td>
                <button onClick={() => handleEdit(box)}>Editar</button>
                <button onClick={() => handleDelete(box.id)} style={{ marginLeft: '10px', color: 'red' }}>
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

export default CrearBox;
