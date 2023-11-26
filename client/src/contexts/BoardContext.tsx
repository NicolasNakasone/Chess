import { SetStateAction, createContext } from 'react'

interface BoardContextProps {
  board: (string | JSX.Element)[][]
  // Quizas esto luego puede cambiar a algo como handleSetBoard (para setear un tablero entero por ejemplo)
  setBoard: (value: SetStateAction<(string | JSX.Element)[][]>) => void
  handleSetPiece: (value: JSX.Element) => void
}

export const BoardContext = createContext<BoardContextProps>({
  board: [],
  setBoard: () => null,
  handleSetPiece: () => null,
})
