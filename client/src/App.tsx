import { useContext, useEffect } from 'react'

import { Queen } from 'src/components/Pieces'
import { BoardContext } from 'src/contexts/BoardContext'

import 'src/App.css'

/* 
  Un hook que sea useMove o algo asi, el cual utilicen todas las piezas al hacerles click, dentro del hook se
  chequeara si el lugar a donde se puede mover la pieza esta vacio o no.

  O pensar alguna logica para que al hacer click en un casillero se active el handler, el cual cheque, si se
  clickea en un casillero vacio, no hace nada. Si hay una pieza, "highlightearla", y activar un segundo click,
  el cual confirma el movimiento.

  Pensar de que forma se revisaran antes hacer el movimiento las restricciones de cada pieza, o si el movimiento
  es valido (sino guiarse de la logica del juego "Chess Royale")
*/

/* 
  - Hacer un context y guardar el board ahi. Basicamente esto seria para que cada vez que una pieza quiera moverse
    lo haga seteando el state que todas las piezas compartirian.
  - A futuro pensar en algun util o algo que genere o coloque todas las piezas en el tablero, este util se podria 
    llamar en un useEffect inicial
*/

/* 
  Cambiar la logica o lo que se guarda en cada casillero del tablero, ya que deberia ser un objeto que contenga
  datos como el color (negro, blanco), la posicion actual (tal vez sea util guardar esto), y luego en otra prop
  el elemento HTML

  Entonces en newBoard[row][column], ahora se guardaria algo como:

  {
    color: "white" | "black",
    position: {
      row: number
      column: number
    }
    element: JSX.Element
  }
*/

export const App = () => {
  const { board, handleSetCell } = useContext(BoardContext)

  // A fines de probar se setea de esta forma, mas adelante se deberia ver la manera de setear un tablero entero
  useEffect(() => {
    handleSetCell({
      element: <Queen {...{ row: 4, column: 5 }} />,
      position: { row: 4, column: 5 },
      playingAs: 'white',
      pieceName: 'queen',
    })
  }, [])

  // const Board = useMemo(() => {
  //   return (

  //   )
  // }, [board])

  return (
    <main>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 100px)',
        }}
      >
        {board.map((column, i) => {
          return column.map((cell, j) => {
            // console.log({ column, cell, i, j })
            return (
              <div
                key={`${i}${j}`}
                style={{
                  height: '100px',
                  border: '1px solid grey',
                  backgroundColor: (i + j) % 2 === 0 ? '#444' : '#DDD',
                  userSelect: 'none',
                }}
              >
                {cell ? cell.element : `${i}${j}`}
              </div>
            )
          })
        })}
      </div>
    </main>
  )
}
