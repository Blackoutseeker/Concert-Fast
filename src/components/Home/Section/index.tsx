import type { FC } from 'react'
import Link from 'next/link'
import { Pages } from '@utils/constants'
import Styles from './HomeSection.module.css'

export const HomeSection: FC = () => {
  return (
    <h1 className={Styles.slogan}>
      Seu aparelho apresenta defeitos? A Concert Fast irá te ajudar!{' '}
      <Link href={Pages.SignIn} passHref>
        <a className={Styles.budget}>Faça já seu orçamento!</a>
      </Link>
    </h1>
  )
}
