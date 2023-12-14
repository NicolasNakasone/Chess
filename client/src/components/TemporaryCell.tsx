import { useContext } from 'react'

import { handleGetPieceComponent } from 'src/components/Pieces'
import { BoardContext, Position } from 'src/contexts/BoardContext'

export const TemporaryCell = (position: Position): JSX.Element => {
  const {
    currentPiece,
    eraseTemporaryIndexes,
    handleSetCell,
    handleSetEmptyCell,
    resetCurrentPiece,
  } = useContext(BoardContext)

  const handleMovePiece = () => {
    const currentRow = currentPiece?.position.row
    const currentColumn = currentPiece?.position.column

    const temporaryRow = position.row
    const temporaryColumn = position.column

    console.log({ currentRow, temporaryRow, currentColumn, temporaryColumn })

    if (currentPiece) {
      handleSetCell({
        element: handleGetPieceComponent(currentPiece.pieceName || 'pawn', {
          row: position.row,
          column: position.column,
        }),
        position: { row: position.row, column: position.column },
        playingAs: currentPiece.playingAs,
        pieceName: currentPiece.pieceName,
      })

      handleSetEmptyCell(
        { row: currentPiece.position.row, column: currentPiece.position.column },
        true
      )

      eraseTemporaryIndexes()
      resetCurrentPiece()
    }
  }

  return (
    <svg width="100" height="100" onClick={handleMovePiece}>
      <circle cx="50" cy="50" r="40" fill="#2ecc71" />
    </svg>
  )
}
