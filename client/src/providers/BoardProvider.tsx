import { useState } from 'react'

import { handleGetPieceComponent } from 'src/components/Pieces'
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

  // Se trajo la funcion al provider para reducir los setBoard a solo uno
  const handleMovePiece = ({ row: newRow, column: newColumn }: Position) => {
    if (currentPiece) {
      const previousRow = currentPiece.position.row
      const previousColumn = currentPiece.position.column

      const newPiece: BoardCell = {
        element: handleGetPieceComponent(currentPiece.pieceName || 'pawn', {
          row: newRow,
          column: newColumn,
        }),
        position: { row: newRow, column: newColumn },
        playingAs: currentPiece.playingAs,
        pieceName: currentPiece.pieceName,
      }

      setBoard(prevBoard => {
        const newBoard = [...prevBoard]

        // Se setea primero el movimiento de la pieza, usando los indices que llegan por parametro
        newBoard[newRow][newColumn] = newPiece

        // Luego se setea la posicion anterior de la pieza a null (el valor inicial de una celda vacia)
        newBoard[previousRow][previousColumn] = null

        // Por ultimo se resetean (es decir se setean en null) todas las celdas que contegan una TemporaryCell
        temporaryIndexes.forEach(({ ['0']: row, ['1']: column }) => {
          newBoard[row][column]?.playingAs === 'temporary' && (newBoard[row][column] = null)
        })

        return newBoard
      })

      setTemporaryIndexes([])
      setCurrentPiece(null)
    }
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
        handleMovePiece,
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}
