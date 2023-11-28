import { useContext } from 'react'

import { Pawn } from 'src/assets/svg/Pawn'
import { BoardContext } from 'src/contexts/BoardContext'

export const TestPiece = (): JSX.Element => {
  const { handleSetPiece } = useContext(BoardContext)

  return <Pawn />
}
