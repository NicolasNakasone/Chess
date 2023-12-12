import { SetStateAction, createContext } from 'react'

export interface Position {
  row: number
  column: number
}

type Pieces = 'king' | 'queen' | 'rock' | 'bishop' | 'knight' | 'pawn'

export interface BoardCell {
  color: 'white' | 'black'
  position: Position
  element: JSX.Element | null
}

export type Board = (null | BoardCell)[][]

interface BoardContextProps {
  board: (null | BoardCell)[][]
  // Quizas esto luego puede cambiar a algo como handleSetBoard (para setear un tablero entero por ejemplo)
  setBoard: (value: SetStateAction<Board>) => void
  handleSetCell: (props: BoardCell) => void
  isCellEmpty: (position: Position) => boolean
}

export const BoardContext = createContext<BoardContextProps>({
  board: [],
  setBoard: () => null,
  handleSetCell: () => null,
  isCellEmpty: () => false,
})
