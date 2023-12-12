import { useState } from 'react'

import { Board, BoardCell, BoardContext, Position } from 'src/contexts/BoardContext'

export const BoardProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const emptyBlocks: Board = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null))

  const [board, setBoard] = useState<Board>(emptyBlocks)

  const handleSetCell = ({ position: { row, column }, ...rest }: BoardCell) => {
    setBoard(prev => {
      const newBoard = [...prev]
      newBoard[row][column] = {
        position: { row, column },
        ...rest,
      }
      return newBoard
    })
  }

  const isCellEmpty = ({ row, column }: Position) => {
    return !board[row][column]
  }

  return (
    <BoardContext.Provider value={{ board, setBoard, handleSetCell, isCellEmpty }}>
      {children}
    </BoardContext.Provider>
  )
}
