import type { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useAuth } from '@services/authProvider'
import Head from 'next/head'
import { AdminSignIn } from '@components/index'
import { parseCookies } from 'nookies'
import { adminAuth } from '@utils/firebaseAdmin'
import storage from '@services/storage'
import { Pages } from '@utils/constants'
import Styles from '@styles/Home.module.css'

const AdminSignInPage: NextPage = () => {
  const { user } = useAuth()
  const router = useRouter()

  const handlePageRedirection = async () => {
    if (user) {
      const isAdmin = user.uid === process.env.ADMIN_ID
      if (isAdmin) {
        await router.push(Pages.Admin)
      } else {
        await router.push(Pages.Client)
      }
    }
  }

  return (
    <div className={Styles.pageContainer}>
      <Head>
        <title>Concert Fast</title>
      </Head>
      <AdminSignIn handlePageRedirection={handlePageRedirection} />
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
