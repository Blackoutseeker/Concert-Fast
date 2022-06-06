import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { adminAuth } from '@utils/firebaseAdmin'
import storage from '@services/storage'
import { Pages } from '@utils/constants'
import Styles from '@styles/Home.module.css'

const AdminSignInPage: NextPage = () => {
  return (
    <div className={Styles.pageContainer}>
      <Head>
        <title>Concert Fast</title>
      </Head>
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
  } catch (_) {}
  return {
    props: {}
  }
}

export default AdminSignInPage
