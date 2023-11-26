import { useState } from 'react'

import 'src/App.css'

export const App = () => {
  const emptyBlocks: string[][] = []
  emptyBlocks.length = 8
  emptyBlocks.fill([])

  emptyBlocks.forEach((row, i) => {
    row[i] = 'cell'
  })

  const [board, setBoard] = useState<string[][]>(emptyBlocks)

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
            return (
              <div
                key={`${i}${j}`}
                style={{
                  height: '100px',
                  border: '1px solid grey',
                  backgroundColor: (i + j) % 2 === 0 ? 'black' : 'white',
                }}
              >{`${cell}${i}${j}`}</div>
            )
          })
        })}
      </div>
    </main>
  )
}
