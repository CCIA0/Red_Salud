import React, { useState, useEffect } from 'react';
import TestAPI from './components/TestAPI';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/boxes/')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <h1>Red Salud - Asignación de Boxes</h1>
      <TestAPI boxes={data} />
    </div>
  );
}

export default App;
