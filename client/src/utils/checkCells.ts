import { Board, Position } from 'src/contexts/BoardContext'
import { ValidMoves } from 'src/utils/getPieceMoves'

const leftBorder = 0
const rightBorder = 7

const isCellEmpty = (board: Board, { row, column }: Position) => {
  return typeof board[row]?.[column] !== 'undefined'
}

export const checkHorizontalCells = (board: Board, { row, column }: Position): ValidMoves => {
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

export const checkVerticalCells = (board: Board, { row, column }: Position): ValidMoves => {
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
export const checkDownwardDiagonalCells = (
  board: Board,
  { row, column }: Position
): ValidMoves => {
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
export const checkUpwardDiagonalCells = (board: Board, { row, column }: Position): ValidMoves => {
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
