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

  const [tablero,setTablero]=useState(crearTablero(3))

  const [turno,setTurno]=useState("X")
  
  const [inputJugadorOne, setInputJugadorOne] = useState("");
  const [jugadorOne, setJugadorOne] = useState("");
  
  const [inputJugadorTwo, setInputJugadorTwo] = useState("");
  const [jugadorTwo, setJugadorTwo] = useState("");

  const [status, setStatus] = useState(`Turno del Jugador: ${jugadorOne} (X)`);

  
  const aumentarTablero = () => {
    limpiarTablero()
    const nuevo = tamañoTablero + 1;
    setTamañoTablero(nuevo);
    setTablero(crearTablero(nuevo));
    setContador(1)
  };

  const disminuirTablero = () => {
    limpiarTablero()
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

    setStatus(`Turno del Jugador: ${jugadorOne} (X)`);

    setContador(1)
  };

  const limpiarTablero=()=>{
    setTablero(crearTablero(tamañoTablero))
    setTurno("X")

    setStatus(`Turno del Jugador: ${jugadorOne} (X)`);

    setContador(1)
  }

  function crearTablero(size){
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
                <button onClick={() => {setJugadorOne(inputJugadorOne), setStatus(`Turno del Jugador: ${inputJugadorOne} (X)`)}}>
                  Asignar
                </button>
              </span>
            </p>
          ) : (
            <p>Jugador 1 (X): {jugadorOne}
              <span>
                <button className='btnNombre' onClick={() => {setJugadorOne(""), setStatus(`Turno del Jugador: (X)`)}}> Cambiar nombre</button>
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
                <button onClick={() => {setJugadorOne(inputJugadorTwo), setStatus(`Turno del Jugador: ${inputJugadorTwo} (O)`)}}>
                  Asignar
                </button>
              </span>
            </p>
          ) : (
            <p>Jugador 2 (O): {jugadorTwo}
              <span>
                <button className='btnNombre' onClick={() => {setJugadorTwo(""), setStatus(`Turno del Jugador: (O)`)}}> Cambiar nombre</button>
              </span>
            </p>
          )}
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
                  />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Square({ value, fila, columna, tablero, setTablero, turno, setTurno, contador , setContador, status, setStatus, jugadorOne, jugadorTwo }){

  function clickInsano(){
    
    if(status && status.includes("ha ganado"))return;  
    
    if (tablero[fila][columna] !== null) return;
    const nuevoTablero = tablero.map((f) => [...f]);
    nuevoTablero[fila][columna] = turno;
    setTablero(nuevoTablero);
    
    setContador(contador + 1)
    
    const ganador = verificarGanador(nuevoTablero, nuevoTablero.length);
    if(ganador){
      const nombreGanador = ganador === "X" ? `${jugadorOne} (X)` : `${jugadorTwo} (O)`;
      setStatus(`${nombreGanador || ganador} ha ganado!`);
      return;
    }
    
    const siguienteTurno = turno === "X" ? "O" : "X";
    setTurno(siguienteTurno);
    const nombreTurno = siguienteTurno === "X" ? `${jugadorOne} (X)` : `${jugadorTwo} (O)`;
    setStatus(`Turno de: ${nombreTurno || siguienteTurno}`);
    
    if (revisarTablero(nuevoTablero)) {
      setStatus(`Empate!`)
      setContador(contador + 1)
      return;
    }
  }
    return(
      <button
      className="entrada"
      onClick={() => clickInsano()}
      >
      {value}
      </button>
    );
  }

function revisarTablero( tablero ){
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
  for(let j = 0; j < size; j++){
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
  let primeroInv = tablero[0][size-1];
  if (primeroInv) {  
    let ganador = true;
    for (let i = 1; i < size; i++) {
      if (tablero[i][size-i-1] !== primeroInv) {
        ganador = false;
        break;
      }
    }
    if (ganador) return primeroInv;
  }

  return null;
}
   
