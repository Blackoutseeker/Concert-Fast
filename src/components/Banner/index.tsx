import type { FC, ReactNode } from 'react'
import Styles from './Banner.module.css'

interface BannerProps {
  children?: ReactNode
}

export const Banner: FC<BannerProps> = ({ children }) => {
  return (
    <div className={Styles.bannerImage}>
      <main className={Styles.bannerWrapper}>{children}</main>
    </div>
  )
}
