import { Board, Position } from 'src/contexts/BoardContext'
import { ValidMoves } from 'src/utils/getPieceMoves'

const leftBorder = 0
const rightBorder = 7

/* 
  Antes llamada isCellEmpty, quedara comentada ya que los ciclos while se encargan de cortar cuando se llegue
  al limite del tablero, lo que hace que nunca se revise una posicion que no exista, por lo que nunca se llega
  a dar el caso en que esta funcion retorne false
 */
const itIsOffTheBoard = (board: Board, { row, column }: Position) => {
  return typeof board[row]?.[column] === 'undefined'
}

const isCellEmpty = (board: Board, { row, column }: Position) => {
  return !!board[row][column]
}

const checkCellContent = (board: Board, { row, column }: Position) => {
  return !itIsOffTheBoard(board, { row, column }) && !isCellEmpty(board, { row, column })
}

export const check8WayCells = (board: Board, { row, column }: Position): ValidMoves => {
  const eightWayMoves: ValidMoves = []

  const upRow = row - 1
  const downRow = row + 1

  const leftColumn = column - 1
  const rightColumn = column + 1

  // Diagonal izquierda superior
  checkCellContent(board, { row: upRow, column: leftColumn }) &&
    eightWayMoves.push([upRow, leftColumn])

  // Arriba
  checkCellContent(board, { row: upRow, column }) && eightWayMoves.push([upRow, column])

  // Diagonal derecha superior
  checkCellContent(board, { row: upRow, column: rightColumn }) &&
    eightWayMoves.push([upRow, rightColumn])

  // Izquierda
  checkCellContent(board, { row, column: leftColumn }) && eightWayMoves.push([row, leftColumn])
  // Derecha
  checkCellContent(board, { row, column: rightColumn }) && eightWayMoves.push([row, rightColumn])

  // Diagonal izquierda inferior
  checkCellContent(board, { row: downRow, column: leftColumn }) &&
    eightWayMoves.push([downRow, leftColumn])

  // Abajo
  checkCellContent(board, { row: downRow, column }) && eightWayMoves.push([downRow, column])

  // Diagonal derecha inferior
  checkCellContent(board, { row: downRow, column: rightColumn }) &&
    eightWayMoves.push([downRow, rightColumn])

  return eightWayMoves
}

export const checkHorizontalCells = (board: Board, { row, column }: Position): ValidMoves => {
  const horizontalMoves: ValidMoves = []
  let previousColumn = column - 1
  let nextColumn = column + 1

  while (previousColumn >= leftBorder) {
    if (checkCellContent(board, { row, column: previousColumn })) {
      horizontalMoves.push([row, previousColumn])
      previousColumn--
    } else {
      break
    }
  }

  while (nextColumn <= rightBorder) {
    if (checkCellContent(board, { row, column: nextColumn })) {
      horizontalMoves.push([row, nextColumn])
      nextColumn++
    } else {
      break
    }
  }

  return horizontalMoves
}

export const checkVerticalCells = (board: Board, { row, column }: Position): ValidMoves => {
  const verticalMoves: ValidMoves = []
  let previousRow = row - 1
  let nextRow = row + 1

  while (previousRow >= leftBorder) {
    if (checkCellContent(board, { row: previousRow, column })) {
      verticalMoves.push([previousRow, column])
      previousRow--
    } else {
      break
    }
  }

  while (nextRow <= rightBorder) {
    if (checkCellContent(board, { row: nextRow, column })) {
      verticalMoves.push([nextRow, column])
      nextRow++
    } else {
      break
    }
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

  while (upperLeftRow >= leftBorder && upperLeftColumn >= leftBorder) {
    if (checkCellContent(board, { row: upperLeftRow, column: upperLeftColumn })) {
      downwardDiagonalMoves.push([upperLeftRow, upperLeftColumn])
      upperLeftRow--
      upperLeftColumn--
    } else {
      break
    }
  }

  while (lowerRightRow <= rightBorder && lowerRightColumn <= rightBorder) {
    if (checkCellContent(board, { row: lowerRightRow, column: lowerRightColumn })) {
      downwardDiagonalMoves.push([lowerRightRow, lowerRightColumn])
      lowerRightRow++
      lowerRightColumn++
    } else {
      break
    }
  }
  return downwardDiagonalMoves
}

// Diagonal izquierda inferior -> row: 4, column: 5 => row: 5, column: 4
// Diagonal derecha superior -> row: 4, column: 5 => row: 3, column: 6
export const checkUpwardDiagonalCells = (board: Board, { row, column }: Position): ValidMoves => {
  const upwardDiagonalMoves: ValidMoves = []
  let lowerLeftRow = row + 1
  let lowerLeftColumn = column - 1

  let upperRightRow = row - 1
  let upperRightColumn = column + 1

  while (lowerLeftRow <= rightBorder && lowerLeftColumn >= leftBorder) {
    if (checkCellContent(board, { row: lowerLeftRow, column: lowerLeftColumn })) {
      upwardDiagonalMoves.push([lowerLeftRow, lowerLeftColumn])
      lowerLeftRow++
      lowerLeftColumn--
    } else {
      break
    }
  }

  while (upperRightRow >= leftBorder && upperRightColumn <= rightBorder) {
    if (checkCellContent(board, { row: upperRightRow, column: upperRightColumn })) {
      upwardDiagonalMoves.push([upperRightRow, upperRightColumn])
      upperRightRow--
      upperRightColumn++
    } else {
      break
    }
  }
  return upwardDiagonalMoves
}

export const checkUpwardInLCells = (board: Board, { row, column }: Position): ValidMoves => {
  const upwardInLMoves: ValidMoves = []

  const leftUpwardLRow = row - 1
  const leftUpwardLColumn = column - 2

  const upwardLeftLRow = row - 2
  const upwardLeftLColumn = column - 1

  const upwardRightLRow = row - 2
  const upwardRightLColumn = column + 1

  const rightUpwardLRow = row - 1
  const rightUpwardLColumn = column + 2

  checkCellContent(board, { row: leftUpwardLRow, column: leftUpwardLColumn }) &&
    upwardInLMoves.push([leftUpwardLRow, leftUpwardLColumn])

  checkCellContent(board, { row: upwardLeftLRow, column: upwardLeftLColumn }) &&
    upwardInLMoves.push([upwardLeftLRow, upwardLeftLColumn])

  checkCellContent(board, { row: upwardRightLRow, column: upwardRightLColumn }) &&
    upwardInLMoves.push([upwardRightLRow, upwardRightLColumn])

  checkCellContent(board, { row: rightUpwardLRow, column: rightUpwardLColumn }) &&
    upwardInLMoves.push([rightUpwardLRow, rightUpwardLColumn])

  return upwardInLMoves
}

export const checkDownwardInLCells = (board: Board, { row, column }: Position): ValidMoves => {
  const downwardInLMoves: ValidMoves = []

  const leftDownwardLRow = row + 1
  const leftDownwardLColumn = column - 2

  const downwardLeftLRow = row + 2
  const downwardLeftLColumn = column - 1

  const downwardRightLRow = row + 2
  const downwardRightLColumn = column + 1

  const rightDownwardLRow = row + 1
  const rightDownwardLColumn = column + 2

  checkCellContent(board, { row: leftDownwardLRow, column: leftDownwardLColumn }) &&
    downwardInLMoves.push([leftDownwardLRow, leftDownwardLColumn])

  checkCellContent(board, { row: downwardLeftLRow, column: downwardLeftLColumn }) &&
    downwardInLMoves.push([downwardLeftLRow, downwardLeftLColumn])

  checkCellContent(board, { row: downwardRightLRow, column: downwardRightLColumn }) &&
    downwardInLMoves.push([downwardRightLRow, downwardRightLColumn])

  checkCellContent(board, { row: rightDownwardLRow, column: rightDownwardLColumn }) &&
    downwardInLMoves.push([rightDownwardLRow, rightDownwardLColumn])

  return downwardInLMoves
}

export const checkOneCellForward = (board: Board, { row, column }: Position): ValidMoves => {
  const pawnMoves: ValidMoves = []

  const isAWhitePiece = board[row][column] && board[row][column]?.playingAs === 'white'
  const calculatedRow = isAWhitePiece ? row + 1 : row - 1

  checkCellContent(board, { row: calculatedRow, column }) &&
    pawnMoves.push([calculatedRow, column])

  return pawnMoves
}
