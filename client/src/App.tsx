import { useContext, useEffect } from 'react'

import { TestPiece } from 'src/components/Pieces'
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

export const App = () => {
  const { board, handleSetPiece } = useContext(BoardContext)

  useEffect(() => {
    handleSetPiece(<TestPiece />)
  }, [])

  return (
    <main>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 100px)',
        }}
      >
        {board.map((row, i) => {
          return row.map((cell, j) => {
            const cellData = typeof cell !== 'string' ? cell : `${cell}${i}${j}`
            return (
              <div
                key={`${i}${j}`}
                style={{
                  height: '100px',
                  border: '1px solid grey',
                  backgroundColor: (i + j) % 2 === 0 ? '#444' : '#DDD',
                }}
              >
                {cellData}
              </div>
            )
          })
        })}
      </div>
    </main>
  )
}
