import { CSSProperties, useEffect, useRef } from 'react'

import { createPortal } from 'react-dom'

const DIALOG_ROOT_ID = 'dialog-root'

interface INewDialog {
  children?: JSX.Element | JSX.Element[]
  style?: CSSProperties | undefined
  open: boolean
  onClose: () => void
  alwaysOpen?: boolean
}

export const Dialog = ({ children, style, open, onClose, alwaysOpen }: INewDialog) => {
  const dialogRootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let newDialogRoot = document.getElementById(DIALOG_ROOT_ID)

    if (!newDialogRoot) {
      newDialogRoot = document.createElement('div')
      newDialogRoot.setAttribute('id', DIALOG_ROOT_ID)
      newDialogRoot.style.position = 'fixed'
      newDialogRoot.style.top = '0'
      newDialogRoot.style.width = '100%'
      newDialogRoot.style.height = '100%'
      newDialogRoot.style.display = 'none'
      newDialogRoot.style.justifyContent = 'center'
      newDialogRoot.style.alignItems = 'center'
      newDialogRoot.style.backgroundColor = '#00000080'
      document.body.appendChild(newDialogRoot)
    }

    dialogRootRef.current = newDialogRoot as HTMLDivElement
  }, [])

  useEffect(() => {
    if (dialogRootRef.current) {
      dialogRootRef.current.style.display = open ? 'flex' : 'none'
    }
  }, [open])

  const handleClose = () => {
    onClose()
  }

  return dialogRootRef.current
    ? createPortal(
        <div>
          <div
            style={{
              backgroundColor: '#fff',
              width: '30vw',
              minHeight: '20vh',
              ...style,
            }}
          >
            {children}
            {!alwaysOpen && <button onClick={handleClose}>Cerrar</button>}
          </div>
        </div>,
        dialogRootRef.current
      )
    : null
}
