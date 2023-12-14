import { useState } from 'react'

import { Board, BoardCell, BoardContext, Position, TemporalCells } from 'src/contexts/BoardContext'

export const BoardProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const emptyBlocks: Board = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null))

  const [board, setBoard] = useState<Board>(emptyBlocks)
  const [currentPiece, setCurrentPiece] = useState<BoardCell | null>(null)

  const handleGetCell = ({ row, column }: Position): BoardCell | null => {
    return board[row][column]
  }

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

  const handleCurrentPiece = (piece: BoardCell | null) => {
    setCurrentPiece(piece)
  }

  const handleTemporalCells = (cells: TemporalCells) => {
    cells.forEach(cell => {
      handleSetCell({
        position: { row: cell.position.row, column: cell.position.column },
        element: cell.element,
        playingAs: 'temporal',
      })
    })
  }

  const isCellEmpty = ({ row, column }: Position) => {
    return !board[row][column]
  }

  return (
    <BoardContext.Provider
      value={{
        board,
        setBoard,
        handleSetCell,
        handleGetCell,
        currentPiece,
        handleCurrentPiece,
        handleTemporalCells,
        isCellEmpty,
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}
