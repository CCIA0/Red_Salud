import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from './components/Login';
import CrearDoctor from './components/CrearDoctor';
import CrearBox from './components/CrearBox';
import CrearReserva from './components/CrearReserva';
import TestAPI from './components/TestAPI';
import CrearActividad from './components/CrearActividad';

function App() {
  const [token, setToken] = useState(null);

  const handleLogin = (accessToken) => {
    setToken(accessToken);
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="App">
        <h1>Red Salud - Asignación de Boxes</h1>

        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/crear-doctor">Crear Doctor</Link></li>
            <li><Link to="/crear-box">Crear Box</Link></li>
            <li><Link to="/crear-reserva">Crear Reserva</Link></li>
            <li><Link to="/crear-actividad">Crear Actividad</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<TestAPI token={token} />} />
          <Route path="/crear-doctor" element={<CrearDoctor token={token} />} />
          <Route path="/crear-box" element={<CrearBox token={token} />} />
          <Route path="/crear-reserva" element={<CrearReserva token={token} />} />
          <Route path="/crear-actividad" element={<CrearActividad token={token} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
