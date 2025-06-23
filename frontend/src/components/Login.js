import React, { useState } from 'react';
import "../styles/Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      onLogin(data.access); // Pasamos el token al componente padre
    } else {
      alert('Credenciales incorrectas');
    }
  };

return (
    <div className="login-container">
      <div className="login-box">
        <img
          src="/redsalud.png" 
          alt="Clínica Dental RedSalud"
          className="logo"
        />
        <h2>Bienvenido</h2>
        <p>Ingrese sus datos para utilizar todas las funciones del sistema.</p>
        <form onSubmit={handleSubmit}>
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Inicio Sesión</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
