import type { FC } from 'react'
import type { IconType } from 'react-icons'
import Styles from './FAB.module.css'

interface FabProps {
  position?: 'left' | 'right'
  onClick: () => void | Promise<void>
  Icon: IconType
}

export const FloatingActionButton: FC<FabProps> = ({
  position,
  onClick,
  Icon
}) => {
  const getButtonPosition = (): string => {
    switch (position) {
      case 'left':
        return Styles.leftButton
      case 'right':
        return Styles.rightButton
      default:
        return Styles.rightButton
    }
  }

  return (
    <button className={getButtonPosition()} onClick={onClick}>
      <Icon color="#fff" size={25} />
    </button>
  )
}
