import { SetStateAction, createContext } from 'react'

export interface Position {
  row: number
  column: number
}

export interface TemporalCell {
  element: JSX.Element
  position: Position
  piecePosition: Position
}

// type Pieces = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'

export interface BoardCell {
  playingAs: 'white' | 'black' | 'temporal'
  position: Position
  element: JSX.Element | null
}

export type Board = (null | BoardCell)[][]
export type TemporalCells = TemporalCell[]

interface BoardContextProps {
  board: (null | BoardCell)[][]
  // Quizas esto luego puede cambiar a algo como handleSetBoard (para setear un tablero entero por ejemplo)
  setBoard: (value: SetStateAction<Board>) => void
  handleSetCell: (props: BoardCell) => void
  handleGetCell: (position: Position) => BoardCell | null
  currentPiece: BoardCell | null
  handleCurrentPiece: (piece: BoardCell | null) => void
  handleTemporalCells: (cells: TemporalCells) => void
  isCellEmpty: (position: Position) => boolean
}

export const BoardContext = createContext<BoardContextProps>({
  board: [],
  setBoard: () => null,
  handleSetCell: () => null,
  handleGetCell: () => null,
  currentPiece: null,
  handleCurrentPiece: () => null,
  handleTemporalCells: () => null,
  isCellEmpty: () => false,
})
