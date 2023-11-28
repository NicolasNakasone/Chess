import { useState } from 'react'

import { BoardContext, HandleSetPieceProps } from 'src/contexts/BoardContext'

export const BoardProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const emptyBlocks: (string | JSX.Element)[][] = Array(8)
    .fill(null)
    .map(() => Array(8).fill(''))

  const [board, setBoard] = useState<(string | JSX.Element)[][]>(emptyBlocks)

  const handleSetPiece = ({ piece, place: { row, column } }: HandleSetPieceProps) => {
    setBoard(prev => {
      const newBoard = [...prev]
      newBoard[row][column] = piece
      return newBoard
    })
  }

  return (
    <BoardContext.Provider value={{ board, setBoard, handleSetPiece }}>
      {children}
    </BoardContext.Provider>
  )
}
