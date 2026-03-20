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

  const aumentarTablero = () => {
    const nuevo = tamañoTablero + 1;
    setTamañoTablero(nuevo);
    setTablero(crearTablero(nuevo));
  };

  const disminuirTablero = () => {
    if (tamañoTablero > 3) {
      const nuevo = tamañoTablero - 1;
      setTamañoTablero(nuevo);
      setTablero(crearTablero(nuevo));
    }
  };

  const reiniciarTablero = () => {
    setTamañoTablero(3)
    setTablero(crearTablero(3));
    setTurno("X");

    setContador(1)
  };

  const limpiarTablero=()=>{
    setTablero(crearTablero(tamañoTablero))
    setTurno("X")

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

        <p>Tamaño Del Tablero: {tamañoTablero} x {tamañoTablero}</p>

        <div className='tablero' >
          <p>Turno del Jugador: {turno === "X" ? `${jugadorOne} (X)` : `${jugadorTwo} (O)`}</p>
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
                  />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Square({ value, fila, columna, tablero, setTablero, turno, setTurno, contador , setContador }){

  function clickInsano(){
    if (tablero[fila][columna] !== null) return;
    const nuevoTablero = tablero.map((f) => [...f]);
    nuevoTablero[fila][columna] = turno;
    setTablero(nuevoTablero);
    setTurno(turno === "X" ? "O" : "X");

    setContador(contador + 1)
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
