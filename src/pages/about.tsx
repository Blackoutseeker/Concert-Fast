import type { NextPage } from 'next'
import Head from 'next/head'
import { HomeHeader, Banner, AboutSection } from '@components/index'
import Styles from '@styles/Home.module.css'

const AboutPage: NextPage = () => {
  return (
    <div className={Styles.pageContainer}>
      <Head>
        <title>Sobre nós - Concert Fast</title>
        <meta
          name="description"
          content="Conheça um pouco mais sobre nossa assistência técnica!"
        />
      </Head>
      <HomeHeader />
      <Banner>
        <AboutSection />
      </Banner>
    </div>
  )
}

export default AboutPage
