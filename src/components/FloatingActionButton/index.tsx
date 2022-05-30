import type { FC } from 'react'
import { HiPlus } from 'react-icons/hi'
import Styles from './FAB.module.css'

interface FabProps {
  onClick: () => void | Promise<void>
}

export const FloatingActionButton: FC<FabProps> = ({ onClick }) => {
  return (
    <button className={Styles.button} onClick={onClick}>
      <HiPlus color="#fff" size={25} />
    </button>
  )
}
