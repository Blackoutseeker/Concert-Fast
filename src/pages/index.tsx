import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { HomeHeader, Banner, HomeSection } from '@components/index'
import { parseCookies } from 'nookies'
import { adminAuth } from '@utils/firebaseAdmin'
import storage from '@services/storage'
import { Pages } from '@utils/constants'
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
      <HomeHeader />
      <Banner>
        <HomeSection />
      </Banner>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const getTokenFromCookie = () => {
      const token = parseCookies(context).token
      return token
    }

    const idToken = storage().getToken(getTokenFromCookie)
    const uid = (await adminAuth.verifyIdToken(idToken)).uid
    const isAdmin = uid === process.env.ADMIN_ID

    if (isAdmin) {
      return {
        props: {},
        redirect: {
          destination: Pages.Admin
        }
      }
    }
    return {
      props: {},
      redirect: {
        destination: Pages.Client
      }
    }
  } catch (_) {}
  return {
    props: {}
  }
}

export default HomePage
