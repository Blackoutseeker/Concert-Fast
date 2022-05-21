import type { FC } from 'react'
import Image from 'next/image'
import Icon from '@assets/images/icon.png'
import Link from 'next/link'
import { Pages } from '@utils/constants'
import Styles from './HomeHeader.module.css'

export const Header: FC = () => {
  return (
    <header className={Styles.headerContainer}>
      <Link href={Pages.Home} passHref>
        <a className={Styles.logoContainer}>
          <Image
            src={Icon}
            width={45}
            height={45}
            quality={90}
            alt="Concert Fast"
          />
          <h3 className={Styles.title} translate="no">
            Concert Fast
          </h3>
        </a>
      </Link>
      <nav className={Styles.navContainer}>
        <Link href={Pages.SignIn} passHref>
          <a className={Styles.navButton}>ENTRAR</a>
        </Link>
        <Link href={Pages.SignUp} passHref>
          <a className={Styles.navButton}>CRIAR CONTA</a>
        </Link>
        <Link href={Pages.About} passHref>
          <a className={Styles.navButton}>SOBRE NÓS</a>
        </Link>
      </nav>
    </header>
  )
}
