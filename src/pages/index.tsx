import type { NextPage } from 'next'
import Head from 'next/head'
import Styles from '@styles/Home.module.css'

const HomePage: NextPage = () => {
  return (
    <div className={Styles.pageContainer}>
      <Head>
        <title>Concert Fast</title>
        <meta
          name="description"
          content="Concert Fast é uma assistência técnica que preza pela satisfação de seus clientes, sempre oferecendo serviços de qualidade e com preços acessíveis."
        />
      </Head>
    </div>
  )
}

export default HomePage
