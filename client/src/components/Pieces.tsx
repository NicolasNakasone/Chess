import { useContext } from 'react'

import { TemporaryCell } from 'src/components/TemporaryCell'
import { BoardContext, Position, TemporaryCells } from 'src/contexts/BoardContext'
import { getPawnMoves, getRookMoves } from 'src/utils/getPieceMoves'

export const King = (position: Position): JSX.Element => {
  // const { board, handleCurrentPiece, handleGetCell } = useContext(BoardContext)

  // const onConfirmMove = () => {
  //   const cellContent = handleGetCell(position)
  //   handleCurrentPiece(cellContent)

  //   const pawnMoves = getPawnMoves(board, position)
  // }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="100"
      height="100"
      viewBox="0 0 100 100"
    >
      <circle cx="50" cy="50" r="40" fill="#f0d9b5" />
      <rect x="40" y="35" width="20" height="10" fill="#000" />
      <rect x="45" y="45" width="10" height="20" fill="#000" />
      <rect x="40" y="55" width="20" height="10" fill="#000" />
    </svg>
  )
}

export const Rook = (position: Position): JSX.Element => {
  const { board, currentPiece, handleCurrentPiece, handleGetCell, handleTemporaryCells } =
    useContext(BoardContext)

  const onConfirmMove = () => {
    const cellContent = handleGetCell(position)
    handleCurrentPiece(cellContent)

    const isTheSamePiece =
      currentPiece &&
      currentPiece?.position.row === position.row &&
      currentPiece?.position.column === position.column

    console.log({ isTheSamePiece })

    if (!isTheSamePiece) {
      const rookMoves = getRookMoves(board, position)

      const temporaryCells: TemporaryCells = rookMoves.map(({ ['0']: row, ['1']: column }) => ({
        element: <TemporaryCell {...{ row, column }} />,
        position: { row, column },
        piecePosition: {
          row: cellContent?.position.row || 0,
          column: cellContent?.position.column || 0,
        },
      }))

      handleTemporaryCells(temporaryCells)
    }
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      onClick={onConfirmMove}
    >
      <rect x="35" y="35" width="30" height="30" fill="#f0d9b5" />
      <rect x="40" y="25" width="20" height="10" fill="#000" />
      <rect x="40" y="65" width="20" height="10" fill="#000" />
      <rect x="25" y="40" width="10" height="20" fill="#000" />
      <rect x="65" y="40" width="10" height="20" fill="#000" />
    </svg>
  )
}

export const Pawn = (position: Position): JSX.Element => {
  const { board, handleCurrentPiece, handleGetCell } = useContext(BoardContext)

  const onConfirmMove = () => {
    const cellContent = handleGetCell(position)
    handleCurrentPiece(cellContent)

    const pawnMoves = getPawnMoves(board, position)

    console.log(pawnMoves)
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      onClick={onConfirmMove}
    >
      <circle cx="50" cy="50" r="40" fill="#f0d9b5" />
      <circle cx="50" cy="30" r="10" fill="#000" />
      <circle cx="50" cy="30" r="6" fill="#fff" />
      <ellipse cx="50" cy="85" rx="30" ry="12" fill="#000" />
    </svg>
  )
}

type Pieces = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'

type Piece = {
  [piece in Pieces]: JSX.Element
}

export const handleGetPieceComponent = (pieceName: Pieces, { row, column }: Position) => {
  const PieceComponent: Piece = {
    king: <King {...{ row, column }} />,
    queen: <div />,
    rook: <Rook {...{ row, column }} />,
    bishop: <div />,
    knight: <div />,
    pawn: <Pawn {...{ row, column }} />,
  }
  return PieceComponent[pieceName]
}
