import React, { useState, useEffect } from 'react';

function CrearReserva({ token }) {
  const [form, setForm] = useState({
    doctor: '',
    box: '',
    fecha: '',
    hora_inicio: '',
    hora_fin: '',
    actividad: null,
  });

  const [doctores, setDoctores] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [actividades, setActividades] = useState([]);

  const [reservas, setReservas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };

    const fetchData = async (url, setState) => {
      try {
        const res = await fetch(url, { headers });
        if (!res.ok) throw new Error(`Error en ${url}: ${res.status}`);
        const data = await res.json();
        setState(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData('http://localhost:8000/api/doctores/', setDoctores);
    fetchData('http://localhost:8000/api/boxes/', setBoxes);
    fetchData('http://localhost:8000/api/actividades/', setActividades);
    loadReservas();
  }, [token]);

  const loadReservas = async () => {
    if (!token) return;
    try {
      const res = await fetch('http://localhost:8000/api/reservas/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Error al cargar reservas');
      const data = await res.json();

      // Eliminar el slice para mostrar todas las reservas
      setReservas(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBoxChange = (e) => {
    const selectedBoxId = parseInt(e.target.value, 10);
    const selectedBox = boxes.find(box => box.id === selectedBoxId);

    let actividadId = null;
    if (selectedBox) {
      if (typeof selectedBox.actividad === 'object' && selectedBox.actividad !== null) {
        actividadId = selectedBox.actividad.id;
      } else if (typeof selectedBox.actividad === 'number') {
        actividadId = selectedBox.actividad;
      }
    }

    const actividadObj = actividades.find(act => act.id === actividadId) || null;

    setForm(prev => ({
      ...prev,
      box: selectedBoxId || '',
      actividad: actividadObj,
    }));
  };

  const resetForm = () => {
    setForm({
      doctor: '',
      box: '',
      fecha: '',
      hora_inicio: '',
      hora_fin: '',
      actividad: null,
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.doctor || !form.box || !form.fecha || !form.hora_inicio || !form.hora_fin) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }

    setLoading(true);

    const body = {
      doctor: form.doctor,
      box: form.box,
      fecha: form.fecha,
      hora_inicio: form.hora_inicio,
      hora_fin: form.hora_fin,
      actividad: form.actividad ? form.actividad.id : null,
    };

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `http://localhost:8000/api/reservas/${editingId}/`
      : 'http://localhost:8000/api/reservas/';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert(editingId ? 'Reserva actualizada' : 'Reserva creada exitosamente');
        resetForm();
        await loadReservas();
      } else {
        const errorData = await response.json();
        console.error('Error respuesta API:', errorData);
        alert('Error al guardar reserva');
      }
    } catch (error) {
      console.error(error);
      alert('Error en la conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (reserva) => {
    // Al editar, asignamos la actividad desde el box asociado a la reserva
    const box = boxes.find(b => b.id === reserva.box);
    let actividadId = null;
    if (box) {
      if (typeof box.actividad === 'object' && box.actividad !== null) {
        actividadId = box.actividad.id;
      } else if (typeof box.actividad === 'number') {
        actividadId = box.actividad;
      }
    }
    const actividadObj = actividades.find(a => a.id === actividadId) || null;

    setForm({
      doctor: reserva.doctor,
      box: reserva.box,
      fecha: reserva.fecha,
      hora_inicio: reserva.hora_inicio,
      hora_fin: reserva.hora_fin,
      actividad: actividadObj,
    });
    setEditingId(reserva.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta reserva?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/reservas/${id}/`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        alert('Reserva eliminada');
        if (editingId === id) resetForm();
        await loadReservas();
      } else {
        alert('Error al eliminar reserva');
      }
    } catch (error) {
      console.error(error);
      alert('Error en la conexión');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{editingId ? 'Editar Reserva' : 'Crear Reserva'}</h2>

        <label>Doctor:</label>
        <select
          name="doctor"
          value={form.doctor}
          onChange={handleChange}
          required
          disabled={loading}
        >
          <option value="">Selecciona un doctor</option>
          {doctores.map(doc => (
            <option key={doc.id} value={doc.id}>
              {doc.nombre}
            </option>
          ))}
        </select>

        <label>Box:</label>
        <select
          name="box"
          value={form.box}
          onChange={handleBoxChange}
          required
          disabled={loading}
        >
          <option value="">Selecciona un box</option>
          {boxes.map(box => (
            <option key={box.id} value={box.id}>
              Box {box.codigo || box.id}
            </option>
          ))}
        </select>

        <label>Fecha:</label>
        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <label>Hora de inicio:</label>
        <input
          type="time"
          name="hora_inicio"
          value={form.hora_inicio}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <label>Hora de fin:</label>
        <input
          type="time"
          name="hora_fin"
          value={form.hora_fin}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <label>Actividad:</label>
        <input
          type="text"
          value={form.actividad ? form.actividad.nombre : ''}
          readOnly
          placeholder="Selecciona un box para ver la actividad"
        />

        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: '10px' }}
        >
          {loading ? (editingId ? 'Actualizando...' : 'Creando...') : editingId ? 'Actualizar' : 'Crear'}
        </button>
        {editingId && !loading && (
          <button type="button" onClick={resetForm} style={{ marginLeft: 10 }}>
            Cancelar
          </button>
        )}
      </form>

      <hr />

      <h3>Reservas</h3>
      {reservas.length === 0 ? (
        <p>No hay reservas.</p>
      ) : (
        <table
          border="1"
          cellPadding="5"
          cellSpacing="0"
          style={{ marginTop: 10 }}
        >
          <thead>
  <tr>
    <th>ID</th>
    <th>Fecha</th>
    <th>Doctor</th>
    <th>Especialidad</th> {/* NUEVO */}
    <th>Box</th>
    <th>Hora Inicio</th>
    <th>Hora Fin</th>
    <th>Actividad</th>
    <th>Acciones</th>
  </tr>
</thead>
<tbody>
  {reservas.map(r => {
    const box = boxes.find(b => b.id === r.box);
    const doctor = doctores.find(d => d.id === r.doctor);

    // Obtener nombre de actividad asociada al box
    let actividadNombre = '-';
    if (box) {
      let actividadId = null;
      if (typeof box.actividad === 'object' && box.actividad !== null) {
        actividadId = box.actividad.id;
      } else if (typeof box.actividad === 'number') {
        actividadId = box.actividad;
      }
      const actividad = actividades.find(a => a.id === actividadId);
      actividadNombre = actividad ? actividad.nombre : actividadId || '-';
    }

    // Obtener nombre de especialidad
    let especialidadNombre = '-';
    if (doctor?.especialidad) {
      if (typeof doctor.especialidad === 'object' && doctor.especialidad.nombre) {
        especialidadNombre = doctor.especialidad.nombre;
      } else if (typeof doctor.especialidad === 'string') {
        especialidadNombre = doctor.especialidad;
      }
    }

    return (
      <tr key={r.id}>
        <td>{r.id}</td>
        <td>{r.fecha}</td>
        <td>{doctor?.nombre || r.doctor}</td>
        <td>{especialidadNombre}</td> {/* NUEVO */}
        <td>{box?.codigo || r.box}</td>
        <td>{r.hora_inicio}</td>
        <td>{r.hora_fin}</td>
        <td>{actividadNombre}</td>
        <td>
          <button onClick={() => handleEdit(r)} disabled={loading}>
            Editar
          </button>
          <button
            onClick={() => handleDelete(r.id)}
            style={{ marginLeft: 10, color: 'red' }}
            disabled={loading}
          >
            Eliminar
          </button>
        </td>
      </tr>
    );
  })}
</tbody>

        </table>
      )}
    </div>
  );
}

export default CrearReserva;
