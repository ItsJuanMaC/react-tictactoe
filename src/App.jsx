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

  const [inputJugadorOne, setInputJugadorOne] = useState("");
  const [jugadorOne, setJugadorOne] = useState("");

  const [inputJugadorTwo, setInputJugadorTwo] = useState("");
  const [jugadorTwo, setJugadorTwo] = useState("");

  const aumentarTablero = () => {
    setTamañoTablero(tamañoTablero + 1);
  };

  const disminuirTablero = () => {
    if (tamañoTablero > 3) {
      setTamañoTablero(tamañoTablero - 1);
    }
  };

  const reiniciarTablero = () => {
    setTamañoTablero(3);
  };

  const tablero = Array.from({ length: tamañoTablero }, () =>
    Array.from({ length: tamañoTablero }, () => null)
  );

  return (
    <div>
      <div className='mainBotones'>
        <button onClick={aumentarTablero}>Aumentar Tablero</button>
        <button onClick={disminuirTablero}>Disminuir Tablero</button>
        <button onClick={reiniciarTablero}>Limpiar Tablero</button>
        <button onClick={reiniciarTablero}>Reiniciar Tablero</button>
      </div>
      <div className='Jugadores'>

        <div className='Jugador1'>
          {jugadorOne === "" ? (
            <p>
              Jugador 1 (X):
              <span>
                <input
                  type="text"
                  value={inputJugadorOne}
                  onChange={(e) => setInputJugadorOne(e.target.value)}
                />
              </span>
              <span>
                <button onClick={() => setJugadorOne(inputJugadorOne)}>
                  Asignar
                </button>
              </span>
            </p>
          ) : (
            <p>Jugador 1 (X): {jugadorOne}</p>
          )}
        </div>

        <div className='Jugador2'>
          {jugadorTwo === "" ? (
            <p>
              Jugador 2 (X):
              <span>
                <input
                  type="text"
                  value={inputJugadorTwo}
                  onChange={(e) => setInputJugadorTwo(e.target.value)}
                />
              </span>
              <span>
                <button onClick={() => setJugadorTwo(inputJugadorTwo)}>
                  Asignar
                </button>
              </span>
            </p>
          ) : (
            <p>Jugador 1 (X): {jugadorOne}</p>
          )}
        </div>

        <p>Tamaño Del Tablero: {tamañoTablero} x {tamañoTablero}</p>

        <div className='tablero' >
          <p>Turno del Jugador:</p>
          {tablero.map((fila, i) => (
            <div key={i} className='fila'>
              {fila.map((_, j) => (
                <button className='entrada' key={j}>
                  {i},{j}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      </div>
      );
}