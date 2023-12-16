import { SetStateAction, createContext } from 'react'

import { ValidMoves } from 'src/utils/getPieceMoves'

export interface Position {
  row: number
  column: number
}

export interface TemporaryCell {
  element: JSX.Element
  position: Position
  piecePosition: Position
}

export type Pieces = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'

export interface BoardCell {
  playingAs: 'white' | 'black' | 'temporary'
  pieceName?: Pieces
  position: Position
  element: JSX.Element | null
}

export type Board = (null | BoardCell)[][]
export type TemporaryCells = TemporaryCell[]

interface BoardContextProps {
  board: (null | BoardCell)[][]
  // Quizas esto luego puede cambiar a algo como handleSetBoard (para setear un tablero entero por ejemplo)
  setBoard: (value: SetStateAction<Board>) => void
  handleSetCell: (props: BoardCell) => void
  handleGetCell: (position: Position) => BoardCell | null
  handleSetEmptyCell: ({ row, column }: Position, isMovingPiece: boolean) => void
  currentPiece: BoardCell | null
  handleCurrentPiece: (piece: BoardCell | null) => void
  resetCurrentPiece: () => void
  handleTemporaryCells: (cells: TemporaryCells) => void
  isCellEmpty: (position: Position) => boolean
  temporaryIndexes: ValidMoves
  eraseTemporaryIndexes: () => void
  handleMovePiece: (position: Position) => void
}

export const BoardContext = createContext<BoardContextProps>({
  board: [],
  setBoard: () => null,
  handleSetCell: () => null,
  handleGetCell: () => null,
  handleSetEmptyCell: () => null,
  currentPiece: null,
  handleCurrentPiece: () => null,
  resetCurrentPiece: () => null,
  handleTemporaryCells: () => null,
  isCellEmpty: () => false,
  temporaryIndexes: [],
  eraseTemporaryIndexes: () => null,
  handleMovePiece: () => null,
})
