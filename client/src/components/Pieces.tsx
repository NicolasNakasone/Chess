import { useContext } from 'react'

import { BishopSVG, KingSVG, KnightSVG, PawnSVG, QueenSVG, RookSVG } from 'src/assets/svg'
import { TemporaryCell } from 'src/components/TemporaryCell'
import { BoardContext, Pieces, Position, TemporaryCells } from 'src/contexts/BoardContext'
import {
  getBishopMoves,
  getKingMoves,
  getKnightMoves,
  getPawnMoves,
  getQueenMoves,
  getRookMoves,
} from 'src/utils/getPieceMoves'

export const King = (position: Position): JSX.Element => {
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
      const kingMoves = getKingMoves(board, position)

      const temporaryCells: TemporaryCells = kingMoves.map(({ ['0']: row, ['1']: column }) => ({
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

  return <KingSVG onClick={onConfirmMove} />
}

export const Queen = (position: Position): JSX.Element => {
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
      const queenMoves = getQueenMoves(board, position)

      const temporaryCells: TemporaryCells = queenMoves.map(({ ['0']: row, ['1']: column }) => ({
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

  return <QueenSVG onClick={onConfirmMove} />
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

  return <RookSVG onClick={onConfirmMove} />
}

export const Bishop = (position: Position): JSX.Element => {
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
      const bishopMoves = getBishopMoves(board, position)

      const temporaryCells: TemporaryCells = bishopMoves.map(({ ['0']: row, ['1']: column }) => ({
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

  return <BishopSVG onClick={onConfirmMove} />
}

export const Knight = (position: Position): JSX.Element => {
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
      const knightMoves = getKnightMoves(board, position)

      const temporaryCells: TemporaryCells = knightMoves.map(({ ['0']: row, ['1']: column }) => ({
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

  return <KnightSVG onClick={onConfirmMove} />
}

export const Pawn = (position: Position): JSX.Element => {
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
      const pawnMoves = getPawnMoves(board, position)

      const temporaryCells: TemporaryCells = pawnMoves.map(({ ['0']: row, ['1']: column }) => ({
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

  return <PawnSVG onClick={onConfirmMove} />
}

type Piece = {
  [piece in Pieces]: JSX.Element
}

export const handleGetPieceComponent = (pieceName: Pieces, { row, column }: Position) => {
  const PieceComponent: Piece = {
    king: <King {...{ row, column }} />,
    queen: <Queen {...{ row, column }} />,
    rook: <Rook {...{ row, column }} />,
    bishop: <Bishop {...{ row, column }} />,
    knight: <Knight {...{ row, column }} />,
    pawn: <Pawn {...{ row, column }} />,
  }
  return PieceComponent[pieceName]
}
