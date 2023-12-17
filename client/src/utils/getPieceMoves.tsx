import { Board, Position } from 'src/contexts/BoardContext'

/* 
  Retornar un array con las posiciones validas para movimiento, para pintar los TemporaryCell en pantalla,
  por ej: const pawnMoves = [[6, 4]]; return pawnMoves
  Esto se utilizaria en el componente que llamo la funcion en el onConfirmMove (previo a setear el 
  currentPiece), para tal vez en un useEffect setear el tablero con los TemporaryCell validos

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

export type ValidMoves = [number, number][]

const leftBorder = 0
const rightBorder = 7

const isCellEmpty = (board: Board, { row, column }: Position) => {
  return typeof board[row]?.[column] !== 'undefined'
}

const checkHorizontalCells = (board: Board, { row, column }: Position): ValidMoves => {
  const horizontalMoves: ValidMoves = []
  let previousColumn = column - 1
  let nextColumn = column + 1

  while (previousColumn >= leftBorder || nextColumn <= rightBorder) {
    isCellEmpty(board, { row, column: previousColumn }) &&
      horizontalMoves.push([row, previousColumn])
    isCellEmpty(board, { row, column: nextColumn }) && horizontalMoves.push([row, nextColumn])

    previousColumn--
    nextColumn++
  }
  return horizontalMoves
}

const checkVerticalCells = (board: Board, { row, column }: Position): ValidMoves => {
  const verticalMoves: ValidMoves = []
  let previousRow = row - 1
  let nextRow = row + 1

  while (previousRow >= leftBorder || nextRow <= rightBorder) {
    isCellEmpty(board, { row: previousRow, column }) && verticalMoves.push([previousRow, column])
    isCellEmpty(board, { row: nextRow, column }) && verticalMoves.push([nextRow, column])

    previousRow--
    nextRow++
  }
  return verticalMoves
}

// Diagonal izquierda superior -> row: 4, columm: 5 => row: 3, column: 4
// Diagonal derecha inferior -> row: 4, columm: 5 => row: 5, column: 6
const checkDownwardDiagonalCells = (board: Board, { row, column }: Position) => {
  const downwardDiagonalMoves: ValidMoves = []
  let upperLeftRow = row - 1
  let upperLeftColumn = column - 1

  let lowerRightRow = row + 1
  let lowerRightColumn = column + 1

  while (
    (upperLeftRow >= leftBorder && upperLeftColumn >= leftBorder) ||
    (lowerRightRow <= rightBorder && lowerRightColumn <= rightBorder)
  ) {
    isCellEmpty(board, { row: upperLeftRow, column: upperLeftColumn }) &&
      downwardDiagonalMoves.push([upperLeftRow, upperLeftColumn])
    isCellEmpty(board, { row: lowerRightRow, column: lowerRightColumn }) &&
      downwardDiagonalMoves.push([lowerRightRow, lowerRightColumn])

    upperLeftRow--
    upperLeftColumn--
    lowerRightRow++
    lowerRightColumn++
  }
  return downwardDiagonalMoves
}

// Diagonal izquierda inferior -> row: 4, column: 5 => row: 5, column: 4
// Diagonal derecha superior -> row: 4, column: 5 => row: 3, column: 6
const checkUpwardDiagonalCells = (board: Board, { row, column }: Position) => {
  // debugger
  const upwardDiagonalMoves: ValidMoves = []
  let lowerLeftRow = row + 1
  let lowerLeftColumn = column - 1

  let upperRightRow = row - 1
  let upperRightColumn = column + 1

  while (
    (lowerLeftRow <= rightBorder && lowerLeftColumn >= leftBorder) ||
    (upperRightRow >= leftBorder && upperRightColumn <= rightBorder)
  ) {
    isCellEmpty(board, { row: lowerLeftRow, column: lowerLeftColumn }) &&
      upwardDiagonalMoves.push([lowerLeftRow, lowerLeftColumn])
    isCellEmpty(board, { row: upperRightRow, column: upperRightColumn }) &&
      upwardDiagonalMoves.push([upperRightRow, upperRightColumn])

    lowerLeftRow++
    lowerLeftColumn--
    upperRightRow--
    upperRightColumn++
  }
  return upwardDiagonalMoves
}

export const getRookMoves = (board: Board, { row, column }: Position) => {
  let validMoves: ValidMoves = []

  const horizontalMoves = checkHorizontalCells(board, { row, column })
  const verticalMoves = checkVerticalCells(board, { row, column })

  validMoves = validMoves.concat(horizontalMoves).concat(verticalMoves)

  return validMoves
}

export const getBishopMoves = (board: Board, { row, column }: Position) => {
  let validMoves: ValidMoves = []

  const downwardDiagonalMoves = checkDownwardDiagonalCells(board, { row, column })
  const upwardDiagonalMoves = checkUpwardDiagonalCells(board, { row, column })

  validMoves = validMoves.concat(downwardDiagonalMoves).concat(upwardDiagonalMoves)

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
