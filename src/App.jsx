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

  const [tablero, setTablero] = useState(crearTablero(3))

  const [turno, setTurno] = useState("X")

  const [inputJugadorOne, setInputJugadorOne] = useState("");
  const [jugadorOne, setJugadorOne] = useState("");

  const [inputJugadorTwo, setInputJugadorTwo] = useState("");
  const [jugadorTwo, setJugadorTwo] = useState("");

  const [status, setStatus] = useState(`Turno del Jugador: ${jugadorOne} (X)`);

  const [historial, setHistorial] = useState([])

  // Index del movimiento activo en el historial (-1 = estado actual/presente)
  const [pasoActivo, setPasoActivo] = useState(-1);

  const aumentarTablero = () => {
    const nuevo = tamañoTablero + 1;
    setTamañoTablero(nuevo);
    setTablero(crearTablero(nuevo));
    setContador(1)
  };

  const disminuirTablero = () => {
    if (tamañoTablero > 3) {
      const nuevo = tamañoTablero - 1;
      setTamañoTablero(nuevo);
      setTablero(crearTablero(nuevo));
      setContador(1)
    }
  };

  const reiniciarTablero = () => {
    setTamañoTablero(3)
    setTablero(crearTablero(3));
    setTurno("X");
    setHistorial([]);
    setPasoActivo(-1);

    setStatus(`Turno del Jugador: ${jugadorOne} (X)`);

    setContador(1)
  };

  const limpiarTablero = () => {
    setHistorial([]);
    setPasoActivo(-1);
    setTablero(crearTablero(tamañoTablero))
    setTurno("X")

    setStatus(`Turno del Jugador: ${jugadorOne} (X)`);

    setContador(1)
  }

  // Salta a un movimiento del historial restaurando el snapshot guardado
  const irAPaso = (index) => {
    const mov = historial[index];
    setTablero(mov.snapshot.map(f => [...f]));
    setTurno(mov.snapshot_turnoSiguiente);
    setStatus(mov.snapshot_status);
    setContador(mov.turno + 1);
    setPasoActivo(index);
  };

  function crearTablero(size) {
    return Array.from({ length: size }, () =>
      Array.from({ length: size }, () => null)
    );
  }

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
                <button onClick={() => setJugadorOne(inputJugadorOne)}>
                  Asignar
                </button>
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
                <button onClick={() => setJugadorTwo(inputJugadorTwo)}>
                  Asignar
                </button>
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
            {historial.map((mov, index) => (
              // Los movimientos "futuros" al paso activo se muestran con opacidad reducida
              <li key={index} style={{ opacity: pasoActivo !== -1 && index > pasoActivo ? 0.4 : 1 }}>
                {/* Botón para saltar a ese movimiento */}
                <button onClick={() => irAPaso(index)}>
                  Turno {mov.turno}
                </button>
                {" "}{mov.jugador} ({mov.simbolo}) →
                ({mov.fila + 1}, {mov.columna + 1})
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
                <Square key={`${i}-${j}`}
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
                  pasoActivo={pasoActivo}
                  setPasoActivo={setPasoActivo}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Square({ value, fila, columna, tablero, setTablero, turno, setTurno, contador, setContador, status, setStatus, jugadorOne, jugadorTwo, setHistorial, pasoActivo, setPasoActivo }) {

  function clickInsano() {

    if (status && status.includes("ha ganado")) return;

    if (tablero[fila][columna] !== null) return;
    const nuevoTablero = tablero.map((f) => [...f]);
    nuevoTablero[fila][columna] = turno;
    setTablero(nuevoTablero);

    const nombreJugador = turno === "X" ? jugadorOne : jugadorTwo;

    const ganador = verificarGanador(nuevoTablero, nuevoTablero.length);
    const empate = !ganador && revisarTablero(nuevoTablero);

    // Calcular el turno y status siguientes para guardarlos en el snapshot
    const siguienteTurno = turno === "X" ? "O" : "X";
    const nombreTurno = siguienteTurno === "X" ? `${jugadorOne} (X)` : `${jugadorTwo} (O)`;
    let nuevoStatus;
    if (ganador) {
      const nombreGanador = ganador === "X" ? jugadorOne : jugadorTwo;
      nuevoStatus = `${nombreGanador || ganador} ha ganado!`;
    } else if (empate) {
      nuevoStatus = `Empate!`;
    } else {
      nuevoStatus = `Turno de: ${nombreTurno || siguienteTurno}`;
    }

    const movimiento = {
      turno: contador,
      jugador: nombreJugador || turno,
      simbolo: turno,
      fila: fila,
      columna: columna,
      // Snapshot del tablero DESPUÉS de este movimiento y el estado resultante
      snapshot: nuevoTablero.map(f => [...f]),
      snapshot_turnoSiguiente: ganador || empate ? turno : siguienteTurno,
      snapshot_status: nuevoStatus,
    };

    // Si se jugó desde un paso anterior, descartar los movimientos "futuros"
    if (pasoActivo !== -1) {
      setHistorial((prev) => [...prev.slice(0, pasoActivo + 1), movimiento]);
    } else {
      setHistorial((prev) => [...prev, movimiento]);
    }

    // Volver al modo "presente" (sin paso activo)
    setPasoActivo(-1);

    setContador(contador + 1)

    if (ganador) {
      const nombreGanador = ganador === "X" ? jugadorOne : jugadorTwo;
      setStatus(`${nombreGanador || ganador} ha ganado!`);
      return;
    }

    setTurno(siguienteTurno);
    setStatus(`Turno de: ${nombreTurno || siguienteTurno}`);

    if (empate) {
      setStatus(`Empate!`)
      setContador(contador + 1)
      return;
    }
  }
  return (
    <button
      className="entrada"
      onClick={() => clickInsano()}
    >
      {value}
    </button>
  );
}

function revisarTablero(tablero) {
  return tablero.every(fila =>
    fila.every(celda => celda !== null)
  );
}

function verificarGanador(tablero, size) {
  //filas
  for (let i = 0; i < size; i++) {
    let primero = tablero[i][0];
    if (!primero) continue;
    let ganador = true;
    for (let j = 1; j < size; j++) {
      if (tablero[i][j] !== primero) {
        ganador = false;
        break;
      }
    }
    if (ganador) return primero;
  }
  //columnas
  for (let j = 0; j < size; j++) {
    let primero = tablero[0][j];
    if (!primero) continue;
    let ganador = true;
    for (let i = 1; i < size; i++) {
      if (tablero[i][j] !== primero) {
        ganador = false;
        break;
      }
    }
    if (ganador) return primero;
  }
  //diagonal
  let primero = tablero[0][0];
  if (primero) {
    let ganador = true;
    for (let i = 1; i < size; i++) {
      if (tablero[i][i] !== primero) {
        ganador = false;
        break;
      }
    }
    if (ganador) return primero;
  }
  //Diagonal inverso
  let primeroInv = tablero[0][size - 1];
  if (primeroInv) {
    let ganador = true;
    for (let i = 1; i < size; i++) {
      if (tablero[i][size - i - 1] !== primeroInv) {
        ganador = false;
        break;
      }
    }
    if (ganador) return primeroInv;
  }

  return null;
}