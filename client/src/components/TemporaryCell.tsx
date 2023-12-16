import { useContext } from 'react'

import { BoardContext, Position } from 'src/contexts/BoardContext'

export const TemporaryCell = ({ row, column }: Position): JSX.Element => {
  const { handleMovePiece } = useContext(BoardContext)

  return (
    <svg width="100" height="100" onClick={() => handleMovePiece({ row, column })}>
      <circle cx="50" cy="50" r="40" fill="#2ecc71" />
    </svg>
  )
}
