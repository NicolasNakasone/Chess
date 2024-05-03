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

/* 
  {
    attackedPosition: Position
    attackedElement: JSX.Element
    attackedColor: 'white' | 'black'

    position: Position
    // element: JSX.Element | null    Tal vez esto no es necesario
  }

  02/01/24 14:06 - En efecto, probar con este approach. Hacer una CaptureCell
                   reemplazando una celda que este ocupada por una pieza
                   rival a la que esta por mover (la idea es reemplazar una
                   BoardCell con una CaptureCell)   
*/

/* 
  Basicamente lo que habria que hacer es:
  1- Usar o reutilizar los mismos handlers para chequear nuevos movimientos
     para chequear si la celda que se esta revisando esta ocupada o no, y
     en base a eso agregar un elemento al array de posibles movimientos
     (como sucede con las TemporaryCell, pero para las CaptureCell).
    
     Si creo que deberian ser handlers por aparte ya que estaria bueno en
     el componente donde se use, tener un handler para cada tipo de celda,
     asi es mas sencillo el manejo o generacion de celdas temporales o de
     captura.
     Otro approach que se puede hacer sino, es seguir usando las mismas
     funciones para chequear movimientos en una direccion, pero lo que 
     retornan podria ser ahora un objeto, que contenga el array de arrays
     de 2 numeros, pero ademas un string por cada par de numeros, para
     indicar si este corresponde a una celda temporal o de captura.
     De ultima, otra cosa que se puede hacer, es retornar 2 arrays, pero
     que uno sea para celdas temporales, y otro para celdas de captura.
*/

export interface PromotedPawnKeys {
  pawnCell: BoardCell
  openDialog: boolean
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

  promotedPawnKeys: PromotedPawnKeys | null
  handleClosePawnPromotion: () => void

  handlePawnPromotion: (selectedPiece: Exclude<Pieces, 'pawn' | 'king'>) => void
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

  promotedPawnKeys: null,
  handleClosePawnPromotion: () => null,

  handlePawnPromotion: () => null,
})
