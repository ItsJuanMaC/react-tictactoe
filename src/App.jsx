import { useState } from 'react';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <h1>TicTacToe</h1>
      <CrearTablero />
    </div>  

  );
}
export default App;

function CrearTablero() {
  const [tamañoTablero, setTamañoTablero] = useState(3);

  const aumentarTablero = () => {
    setTamañoTablero(tamañoTablero + 1);
  };

  const disminuirTablero = () => {
    if (tamañoTablero > 3) {
      setTamañoTablero(tamañoTablero - 1);
    }
  };


  const tablero = Array.from({ length: tamañoTablero }, () =>
    Array.from({ length: tamañoTablero }, () => null)
  );

  return (
    <div>
      <p>
        Tamaño Del Tablero: {tamañoTablero} x {tamañoTablero}
      </p>

      <button onClick={aumentarTablero}>Aumentar Tablero</button>
      <button onClick={disminuirTablero}>Disminuir Tablero</button>
      <div>
        {tablero.map((fila, i) => (
          <div key={i} style={{ display: 'flex' }}>
            {fila.map((_, j) => (
              <button
                key={j}
              >
                {i},{j}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}