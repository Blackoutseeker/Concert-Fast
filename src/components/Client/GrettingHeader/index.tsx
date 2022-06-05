import type { FC } from 'react'
import Styles from './GrettingHeader.module.css'

interface GrettingHeaderProps {
  name: string
  haveOrders?: boolean
}

export const GrettingHeader: FC<GrettingHeaderProps> = ({
  name,
  haveOrders
}) => {
  const firstName = name.split(' ')[0]
  const lastName = name.split(' ')[1]

  return (
    <>
      <h1 className={Styles.grettingText}>
        Olá, {firstName} {lastName}!
      </h1>
      {!haveOrders && (
        <h4 className={Styles.getStartedText}>
          Para fazer um orçamento, basta clicar no botão no canto inferior
          direito.
        </h4>
      )}
    </>
  )
}
