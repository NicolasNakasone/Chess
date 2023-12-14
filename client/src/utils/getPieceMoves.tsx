import { Board, Position } from 'src/contexts/BoardContext'

/* 
  Retornar un array con las posiciones validas para movimiento, para pintar los TemporalCell en pantalla,
  por ej: const pawnMoves = [[6, 4]]; return pawnMoves
  Esto se utilizaria en el componente que llamo la funcion en el onConfirmMove (previo a setear el 
  currentPiece), para tal vez en un useEffect setear el tablero con los TemporalCell validos

  Consultar si es posible realizar mas de una funcion recursiva dentro de una funcion, para en una sola
  funcion inicial retornar (por ejemplo para el caso de una torre), los movimientos posibles en una direccion,
  tanto horizontalmente como verticalmente. Por ej:
  getRookMoves(board, {0, 4})
  \
   \
    // Vertical, tanto hacia atras como hacia adelante
    --> getRookMoves(board, {0, --4})
    --> getRookMoves(board, {0, ++4})
  |
  |
    // Horizontal (logicamente aca el primer movimiento seria invalidado)
   --> getRookMoves(board, {--0, 4})
   --> getRookMoves(board, {++0, 4})
*/

type ValidMoves = [number, number][]

const leftBorder = 0
const rightBorder = 7

// const validMoves: ValidMoves = []

const isCellEmpty = (board: Board, { row, column }: Position) => {
  return typeof board[row]?.[column] !== 'undefined'
}

const checkHorizontalCells = (board: Board, { row, column }: Position): ValidMoves => {
  const horizontalMoves: ValidMoves = []
  let previousColumn = column - 1
  let nextColumn = column + 1

  while (previousColumn >= leftBorder || nextColumn < rightBorder) {
    isCellEmpty(board, { row, column: previousColumn }) &&
      horizontalMoves.push([row, previousColumn])
    isCellEmpty(board, { row, column: nextColumn }) && horizontalMoves.push([row, nextColumn])

    previousColumn--
    nextColumn++
  }
  return horizontalMoves
}

const checkVerticalMoves = (board: Board, { row, column }: Position): ValidMoves => {
  const verticalMoves: ValidMoves = []
  let previousRow = row - 1
  let nextRow = row + 1

  while (previousRow >= leftBorder || nextRow < rightBorder) {
    isCellEmpty(board, { row: previousRow, column }) && verticalMoves.push([previousRow, column])
    isCellEmpty(board, { row: nextRow, column }) && verticalMoves.push([nextRow, column])

    previousRow--
    nextRow++
  }
  return verticalMoves
}

// export const getKingMoves = (board: Board, { row, column }: Position) => {
//   if (isCellEmpty(board, { row, column })) {
//   } else {
//     return validMoves
//   }
// }

export const getRookMoves = (board: Board, { row, column }: Position) => {
  let validMoves: ValidMoves = []

  const horizontalMoves = checkHorizontalCells(board, { row, column })
  const verticalMoves = checkVerticalMoves(board, { row, column })

  validMoves = validMoves.concat(horizontalMoves).concat(verticalMoves)

  return validMoves
}

export const getPawnMoves = (board: Board, { row, column }: Position) => {
  if (isCellEmpty(board, { row, column })) {
    return [[row, ++column]]
  } else {
    // Quizas aca mas adelante se puede realizar la logica para coronar al peon
    // return validMoves
  }
}

/* 
  getPawnMoves(board, {row: 7, column: 4})
  if(isCellEmpty(board, {7, 4}))
  validMoves.push([7, 5])
  return getPawnMoves(board, { 7, 5 })
  
  getPawnMoves(board, {row: 7, column: 5})
  if(isCellEmpty(board, {7, 5}))
  validMoves.push([7, 6])
  return getPawnMoves(board, { 7, 6 })
  
  getPawnMoves(board, {row: 7, column: 6})
  if(isCellEmpty(board, {7, 6}))
  validMoves.push([7, 6])
  return getPawnMoves(board, { 7, 7 })

  getPawnMoves(board, {row: 7, column: 6})
  if(isCellEmpty(board, {7, 6}))
  validMoves.push([7, 6])
  return getPawnMoves(board, { 7, 7 })

  getPawnMoves(board, {row: 7, column: 7})
  if(isCellEmpty(board, {7, 7}))
  validMoves.push([7, 7])
  return getPawnMoves(board, { 7, 8 })

  getPawnMoves(board, {row: 7, column: 8})
  if(isCellEmpty(board, {7, 8}))
  return [[7, 5], [7, 6], [7, 7]]
*/
