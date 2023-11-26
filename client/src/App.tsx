import { useEffect, useState } from 'react'

import { TestPiece } from 'src/components/Pieces'

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

export const App = () => {
  const emptyBlocks: (string | JSX.Element)[][] = Array(8)
    .fill(null)
    .map(() => Array(8).fill(''))

  const [board, setBoard] = useState<(string | JSX.Element)[][]>(emptyBlocks)

  useEffect(() => {
    setBoard(prev => {
      const newBoard = [...prev]
      newBoard[7][4] = <TestPiece />
      return newBoard
    })
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
