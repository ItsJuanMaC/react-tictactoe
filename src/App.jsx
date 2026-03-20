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
  };

  const limpiarTablero=()=>{
    setTablero(crearTablero(tamañoTablero))
    setTurno("X")
  }

  function crearTablero(size){
    return Array.from({ length: size }, () =>
      Array.from({ length: size }, () => null)
    );
  }

  function clickInsano(fila,columna){
     if (tablero[fila][columna] !== null) return;
    const nuevoTablero = tablero.map((f) => [...f]);
    nuevoTablero[fila][columna] = turno;
    setTablero(nuevoTablero);
    setTurno(turno === "X" ? "O" : "X");

  }
  

  return (
    <div>
      <div className='mainBotones'>
        <button onClick={aumentarTablero}>Aumentar Tablero</button>
        <button onClick={disminuirTablero}>Disminuir Tablero</button>
        <button onClick={limpiarTablero}>Limpiar Partida</button>
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
            <p>Jugador 2 (O): {jugadorOne}</p>
          )}
        </div>

        <p>Tamaño Del Tablero: {tamañoTablero} x {tamañoTablero}</p>
         <div style={{ marginTop: "20px" }}>
        {tablero.map((fila, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "center" }}>
            {fila.map((celda, j) => (
              <button
                key={j}
                onClick={() => clickInsano(i, j)}
                style={{
                  width: "60px",
                  height: "60px",
                  margin: "5px",
                  fontSize: "20px",
                }}
              >
                {celda}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
 
        </div>    
      );
}