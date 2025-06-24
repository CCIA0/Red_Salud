import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const toggleSidebar = () => setOpen(!open);
  const toggleSubmenu = () => setSubmenuOpen(!submenuOpen);

  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <img src="/logo02.png" alt="Logo" className="logo-icon" />
      </button>

      <div className={`sidebar ${open ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/" onClick={() => setOpen(false)}>Inicio</Link>
          </li>
          <li>
            <button className="submenu-toggle" onClick={toggleSubmenu}>
              Mis Herramientas
            </button>
            {submenuOpen && (
              <ul className="submenu">
                <li><Link to="/crear-doctor" onClick={() => setOpen(false)}>Doctor</Link></li>
                <li><Link to="/crear-box" onClick={() => setOpen(false)}>Box</Link></li>
                <li><Link to="/crear-reserva" onClick={() => setOpen(false)}>Reserva</Link></li>
                <li><Link to="/crear-actividad" onClick={() => setOpen(false)}>Actividad</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
