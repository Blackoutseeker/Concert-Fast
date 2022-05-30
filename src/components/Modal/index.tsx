import type { FC, ReactNode } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import Styles from './Modal.module.css'

interface ModalProps {
  isOpen: boolean
  closeModal: () => void
  children: ReactNode | ReactNode[]
}

export const Modal: FC<ModalProps> = ({ isOpen, closeModal, children }) => {
  if (isOpen) {
    return (
      <div className={Styles.modalContainer}>
        <OutsideClickHandler onOutsideClick={closeModal}>
          {children}
        </OutsideClickHandler>
      </div>
    )
  }

  return null
}
