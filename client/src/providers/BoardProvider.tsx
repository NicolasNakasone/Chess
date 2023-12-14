import { useState } from 'react'

import {
  Board,
  BoardCell,
  BoardContext,
  Position,
  TemporaryCells,
} from 'src/contexts/BoardContext'
import { ValidMoves } from 'src/utils/getPieceMoves'

export const BoardProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const emptyBlocks: Board = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null))

  const [board, setBoard] = useState<Board>(emptyBlocks)
  const [currentPiece, setCurrentPiece] = useState<BoardCell | null>(null)
  const [temporaryIndexes, setTemporaryIndexes] = useState<ValidMoves>([])

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

  const handleSetEmptyCell = ({ row, column }: Position, isMovingPiece?: boolean) => {
    setBoard(prev => {
      const newBoard = [...prev]
      ;(newBoard[row][column]?.playingAs === 'temporary' || isMovingPiece) &&
        (newBoard[row][column] = null)

      return newBoard
    })
  }

  const handleCurrentPiece = (piece: BoardCell | null) => {
    setCurrentPiece(piece)
  }

  const handleTemporaryCells = (cells: TemporaryCells) => {
    const temporaryIndexes: ValidMoves = []

    cells.forEach(cell => {
      handleSetCell({
        position: { row: cell.position.row, column: cell.position.column },
        element: cell.element,
        playingAs: 'temporary',
      })

      temporaryIndexes.push([cell.position.row, cell.position.column])
    })

    setTemporaryIndexes(temporaryIndexes)
  }

  const eraseTemporaryIndexes = () => {
    temporaryIndexes.forEach(({ ['0']: row, ['1']: column }) => {
      handleSetEmptyCell({ row, column })
    })

    setTemporaryIndexes([])
  }

  const resetCurrentPiece = () => {
    setCurrentPiece(null)
  }

  const isCellEmpty = ({ row, column }: Position) => {
    return typeof board[row]?.[column] !== 'undefined'
  }

  return (
    <BoardContext.Provider
      value={{
        board,
        setBoard,
        handleSetCell,
        handleGetCell,
        handleSetEmptyCell,
        currentPiece,
        handleCurrentPiece,
        resetCurrentPiece,
        handleTemporaryCells,
        isCellEmpty,
        temporaryIndexes,
        eraseTemporaryIndexes,
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}
