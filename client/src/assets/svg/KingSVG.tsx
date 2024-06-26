import { IPieceSVG } from 'src/assets/svg'

export const KingSVG = ({ color, onClick }: IPieceSVG): JSX.Element => {
  return (
    <svg
      fill={color === 'white' ? '#FFFFFF' : '#000000'}
      width="80"
      height="80"
      viewBox="-32 0 512 512"
      onClick={onClick}
    >
      <path d="M400 448H48a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h352a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm16-288H256v-48h40a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8h-40V8a8 8 0 0 0-8-8h-48a8 8 0 0 0-8 8v40h-40a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h40v48H32a32 32 0 0 0-30.52 41.54L74.56 416h298.88l73.08-214.46A32 32 0 0 0 416 160z" />
    </svg>
  )
}
