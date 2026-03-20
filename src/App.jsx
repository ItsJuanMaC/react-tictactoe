import { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>TicTacToe</h1>
      <Juego />
    </div>
  );
}
export default App;

function Juego() {
  const [tamañoTablero, setTamañoTablero] = useState(3);
  const [contador, setContador] = useState(1);
  const [tablero, setTablero] = useState(crearTablero(3));
  const [turno, setTurno] = useState("X");

  const [inputJugadorOne, setInputJugadorOne] = useState("");
  const [jugadorOne, setJugadorOne] = useState("");
  const [inputJugadorTwo, setInputJugadorTwo] = useState("");
  const [jugadorTwo, setJugadorTwo] = useState("");

  const [status, setStatus] = useState(`Turno del Jugador: (X)`);

  // Cada entrada del historial guarda el snapshot completo del estado
  const [historial, setHistorial] = useState([]);

  // Índice del paso actual (null = estado presente, número = viajando en el tiempo)
  const [pasoActual, setPasoActual] = useState(null);

  const aumentarTablero = () => {
    const nuevo = tamañoTablero + 1;
    setTamañoTablero(nuevo);
    setTablero(crearTablero(nuevo));
    setContador(1);
    setHistorial([]);
    setPasoActual(null);
  };

  const disminuirTablero = () => {
    if (tamañoTablero > 3) {
      const nuevo = tamañoTablero - 1;
      setTamañoTablero(nuevo);
      setTablero(crearTablero(nuevo));
      setContador(1);
      setHistorial([]);
      setPasoActual(null);
    }
  };

  const reiniciarTablero = () => {
    setTamañoTablero(3);
    setTablero(crearTablero(3));
    setTurno("X");
    setHistorial([]);
    setPasoActual(null);
    setStatus(`Turno del Jugador: ${jugadorOne || "X"} (X)`);
    setContador(1);
  };

  const limpiarTablero = () => {
    setHistorial([]);
    setTablero(crearTablero(tamañoTablero));
    setTurno("X");
    setPasoActual(null);
    setStatus(`Turno del Jugador: ${jugadorOne || "X"} (X)`);
    setContador(1);
  };

  // Viaja a un paso específico del historial
  const viajarA = (index) => {
    const entrada = historial[index];
    // Restaura el tablero que había DESPUÉS de ese movimiento
    setTablero(entrada.tableroSnapshot);
    setTurno(entrada.turnoSiguiente);
    setContador(entrada.turno + 1);
    setStatus(entrada.statusDespues);
    setPasoActual(index);
    // Trunca el historial hasta ese punto para que los nuevos movimientos sobrescriban
    setHistorial(historial.slice(0, index + 1));
  };

  function crearTablero(size) {
    return Array.from({ length: size }, () =>
      Array.from({ length: size }, () => null)
    );
  }

  const enPartida = pasoActual === null || pasoActual === historial.length - 1;

  return (
    <div>
      <div className='mainBotones'>
        <button onClick={aumentarTablero}>Aumentar Tablero</button>
        <button onClick={disminuirTablero}>Disminuir Tablero</button>
        <button onClick={limpiarTablero}>Limpiar Tablero</button>
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
                <button onClick={() => setJugadorOne(inputJugadorOne)}>Asignar</button>
              </span>
            </p>
          ) : (
            <p>Jugador 1 (X): {jugadorOne}
              <span>
                <button className='btnNombre' onClick={() => setJugadorOne("")}> Cambiar nombre</button>
              </span>
            </p>
          )}
        </div>

        <div className='Jugador2'>
          {jugadorTwo === "" ? (
            <p>
              Jugador 2 (O):
              <span>
                <input
                  type="text"
                  value={inputJugadorTwo}
                  onChange={(e) => setInputJugadorTwo(e.target.value)}
                />
              </span>
              <span>
                <button onClick={() => setJugadorTwo(inputJugadorTwo)}>Asignar</button>
              </span>
            </p>
          ) : (
            <p>Jugador 2 (O): {jugadorTwo}
              <span>
                <button className='btnNombre' onClick={() => setJugadorTwo("")}> Cambiar nombre</button>
              </span>
            </p>
          )}
        </div>

        <div className='historial'>
          <h3>Historial de Movimientos:</h3>
          <ul>
            {/* Entrada especial para volver al inicio */}
            <li>
              <button
                onClick={() => {
                  setTablero(crearTablero(tamañoTablero));
                  setTurno("X");
                  setContador(1);
                  setStatus(`Turno del Jugador: ${jugadorOne || "X"} (X)`);
                  setPasoActual(-1);
                  setHistorial([]);
                }}
                style={{ fontStyle: 'italic', opacity: 0.7 }}
              >
                ↩ Inicio del juego
              </button>
            </li>

            {historial.map((mov, index) => (
              <li key={index} style={{ fontWeight: index === pasoActual ? 'bold' : 'normal' }}>
                <button onClick={() => viajarA(index)}>
                  {index === pasoActual ? '▶ ' : ''}
                  Turno {mov.turno}: {mov.jugador} ({mov.simbolo}) →
                  ({mov.fila + 1}, {mov.columna + 1})
                </button>
              </li>
            ))}
          </ul>
        </div>

        <p>Tamaño Del Tablero: {tamañoTablero} x {tamañoTablero}</p>
        <div className='tablero'>
          <p>{status}</p>
          <p>Turno: {contador}</p>
          {tablero.map((fila, i) => (
            <div key={i} className='fila'>
              {fila.map((celda, j) => (
                <Square
                  key={`${i}-${j}`}
                  value={celda}
                  fila={i}
                  columna={j}
                  tablero={tablero}
                  setTablero={setTablero}
                  turno={turno}
                  setTurno={setTurno}
                  contador={contador}
                  setContador={setContador}
                  status={status}
                  setStatus={setStatus}
                  jugadorOne={jugadorOne}
                  jugadorTwo={jugadorTwo}
                  setHistorial={setHistorial}
                  setPasoActual={setPasoActual}
                  historialLength={historial.length}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Square({
  value, fila, columna, tablero, setTablero,
  turno, setTurno, contador, setContador,
  status, setStatus, jugadorOne, jugadorTwo,
  setHistorial, setPasoActual, historialLength
}) {

  function clickInsano() {
    if (status && status.includes("ha ganado")) return;
    if (tablero[fila][columna] !== null) return;

    const nuevoTablero = tablero.map((f) => [...f]);
    nuevoTablero[fila][columna] = turno;
    setTablero(nuevoTablero);

    const nombreJugador = turno === "X" ? jugadorOne : jugadorTwo;

    const ganador = verificarGanador(nuevoTablero, nuevoTablero.length);
    const empate = !ganador && revisarTablero(nuevoTablero);

    const siguienteTurno = turno === "X" ? "O" : "X";
    const nombreTurno = siguienteTurno === "X"
      ? `${jugadorOne || "X"} (X)`
      : `${jugadorTwo || "O"} (O)`;

    let nuevoStatus;
    if (ganador) {
      const nombreGanador = ganador === "X" ? jugadorOne : jugadorTwo;
      nuevoStatus = `${nombreGanador || ganador} ha ganado!`;
    } else if (empate) {
      nuevoStatus = `Empate!`;
    } else {
      nuevoStatus = `Turno de: ${nombreTurno}`;
    }

    setStatus(nuevoStatus);

    // Guarda snapshot completo para poder navegar de vuelta
    const movimiento = {
      turno: contador,
      jugador: nombreJugador || turno,
      simbolo: turno,
      fila,
      columna,
      tableroSnapshot: nuevoTablero.map(f => [...f]), // copia profunda
      turnoSiguiente: ganador || empate ? turno : siguienteTurno,
      statusDespues: nuevoStatus,
    };

    setHistorial((prev) => [...prev, movimiento]);
    setPasoActual(historialLength); // apunta al último elemento añadido
    setContador(contador + 1);

    if (!ganador && !empate) {
      setTurno(siguienteTurno);
    }
  }

  return (
    <button className="entrada" onClick={clickInsano}>
      {value}
    </button>
  );
}

function revisarTablero(tablero) {
  return tablero.every(fila => fila.every(celda => celda !== null));
}

function verificarGanador(tablero, size) {
  for (let i = 0; i < size; i++) {
    let primero = tablero[i][0];
    if (!primero) continue;
    if (tablero[i].every(c => c === primero)) return primero;
  }
  for (let j = 0; j < size; j++) {
    let primero = tablero[0][j];
    if (!primero) continue;
    let ganador = true;
    for (let i = 1; i < size; i++) {
      if (tablero[i][j] !== primero) { ganador = false; break; }
    }
    if (ganador) return primero;
  }
  let primero = tablero[0][0];
  if (primero) {
    let ganador = true;
    for (let i = 1; i < size; i++) {
      if (tablero[i][i] !== primero) { ganador = false; break; }
    }
    if (ganador) return primero;
  }
  let primeroInv = tablero[0][size - 1];
  if (primeroInv) {
    let ganador = true;
    for (let i = 1; i < size; i++) {
      if (tablero[i][size - i - 1] !== primeroInv) { ganador = false; break; }
    }
    if (ganador) return primeroInv;
  }
  return null;
}