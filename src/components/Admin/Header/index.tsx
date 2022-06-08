import type { FC } from 'react'
import { useRouter } from 'next/router'
import { Pages } from '@utils/constants'
import { logOut } from '@services/authentication'
import { HiLogout } from 'react-icons/hi'
import Styles from './AdminHeader.module.css'

interface AdminHeaderProps {
  searchValue: string
  setSearchValue: (value: string) => void
}

export const AdminHeader: FC<AdminHeaderProps> = ({
  searchValue,
  setSearchValue
}) => {
  const router = useRouter()

  const navigateToHomePage = async () => {
    await router.push(Pages.Home)
  }

  const handleLogOut = async () => {
    await logOut(navigateToHomePage)
  }

  return (
    <header className={Styles.headerContainer}>
      <input
        className={Styles.searchInput}
        value={searchValue}
        onChange={event => setSearchValue(event.target.value)}
        placeholder="Procurar por cliente, equipamento, ID, data..."
      />
      <button className={Styles.logOutButton} onClick={handleLogOut}>
        <HiLogout color="#fff" size={15} />
      </button>
    </header>
  )
}
