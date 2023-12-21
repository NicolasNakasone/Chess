import { useState } from 'react'

import { handleGetPieceComponent } from 'src/components/Pieces'
import {
  Board,
  BoardCell,
  BoardContext,
  Pieces,
  Position,
  PromotedPawnKeys,
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

  const [promotedPawnKeys, setPromotedPawnKeys] = useState<PromotedPawnKeys | null>(null)

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

  /* 
    Se trajo la funcion al provider para reducir el uso de setBoard a solo uno, asi no
    se tiene que recorrer toda el tablero cada vez que se use handleSetCell
  */
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

      /* 
        En vez de solo la funcion handlePawnPromotion, en el futuro podrian haber
        varias funciones para los movimientos especiales como el enroque, las casillas
        dobles del peon al inicio, o el peon al paso
      */
      checkForPawnPromotion(newPiece)

      setTemporaryIndexes([])
      setCurrentPiece(null)
    }
  }

  /* 
    Leer lo que esta modificado, luego hacer commit. Luego seguir con el cambio de color
    de los svg segun la propiedad playingAs. Luego empezar con la logica de captura
  */

  const handleClosePawnPromotion = () =>
    setPromotedPawnKeys(prev => {
      if (prev) {
        return {
          ...prev,
          openDialog: false,
        }
      } else {
        return null
      }
    })

  const checkForPawnPromotion = (newPiece: BoardCell) => {
    const isNewPieceAPawn = newPiece.pieceName === 'pawn'
    const isAWhitePiece = newPiece.playingAs === 'white'

    const { row } = newPiece.position

    const isReadyToPromote = isNewPieceAPawn && (isAWhitePiece ? row === 7 : row === 0)

    if (isReadyToPromote) {
      setPromotedPawnKeys({ openDialog: true, pawnCell: newPiece })
    }
  }

  const handlePawnPromotion = (selectedPiece: Exclude<Pieces, 'pawn' | 'king'>) => {
    if (promotedPawnKeys?.pawnCell) {
      const {
        position: { row, column },
        playingAs,
      } = promotedPawnKeys.pawnCell

      const newPiece: BoardCell = {
        element: handleGetPieceComponent(selectedPiece, { row, column }),
        position: { row, column },
        playingAs: playingAs,
        pieceName: selectedPiece,
      }

      handleSetCell(newPiece)

      setPromotedPawnKeys(null)
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

        promotedPawnKeys,
        handleClosePawnPromotion,

        handlePawnPromotion,
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}
