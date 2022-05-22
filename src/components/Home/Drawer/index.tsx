import { FC, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import Image from 'next/image'
import Icon from '@assets/images/icon.png'
import Link from 'next/link'
import { Pages } from '@utils/constants'
import Styles from './HomeDrawer.module.css'

export const HomeDrawer: FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  const changeDrawerVisibility = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  if (isDrawerOpen) {
    return (
      <nav className={Styles.drawerContainer}>
        <header className={Styles.drawerHeader}>
          <button
            className={Styles.closeButton}
            onClick={changeDrawerVisibility}
          >
            <FaTimes color="#fff" size={25} />
          </button>
          <Link href={Pages.Home} passHref>
            <a className={Styles.logoContainer}>
              <Image
                src={Icon}
                width={45}
                height={45}
                quality={90}
                alt="Concert Fast"
              />
              <h3 className={Styles.title}>Concert Fast</h3>
            </a>
          </Link>
          <div className={Styles.spacer} />
        </header>
        <ul className={Styles.listWrapper}>
          <li>
            <Link href={Pages.SignIn} passHref>
              <a className={Styles.listItem}>ENTRAR</a>
            </Link>
          </li>
          <li>
            <hr className={Styles.divider} />
          </li>
          <li>
            <Link href={Pages.SignUp} passHref>
              <a className={Styles.listItem}>CRIAR CONTA</a>
            </Link>
          </li>
          <li>
            <hr className={Styles.divider} />
          </li>
          <li>
            <Link href={Pages.About} passHref>
              <a className={Styles.listItem}>SOBRE NÓS</a>
            </Link>
          </li>
        </ul>
      </nav>
    )
  }

  return (
    <button className={Styles.drawerButton} onClick={changeDrawerVisibility}>
      <FaBars color="#fff" size={25} />
    </button>
  )
}
