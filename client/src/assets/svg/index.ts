import { BishopSVG } from 'src/assets/svg/BishopSVG'
import { KingSVG } from 'src/assets/svg/KingSVG'
import { KnightSVG } from 'src/assets/svg/KnightSVG'
import { PawnSVG } from 'src/assets/svg/PawnSVG'
import { QueenSVG } from 'src/assets/svg/QueenSVG'
import { RookSVG } from 'src/assets/svg/RookSVG'

export interface IPieceSVG {
  color: 'white' | 'black' | 'temporary'
  onClick: () => void
}

export { BishopSVG, KingSVG, KnightSVG, PawnSVG, QueenSVG, RookSVG }
