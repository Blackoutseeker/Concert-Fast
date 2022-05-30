import type { NextPage, GetServerSideProps } from 'next'
import type { Client } from '@models/index'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { adminAuth } from '@utils/firebaseAdmin'
import storage from '@services/storage'
import { Pages } from '@utils/constants'
import { getClient } from '@database/client'
import Styles from '@styles/Home.module.css'

interface ClientPageProps {
  client: Client
}

const ClientPage: NextPage<ClientPageProps> = () => {
  return (
    <div className={Styles.pageContainer}>
      <Head>
        <title>Meus orçamentos - Concert Fast</title>
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

    if (uid) {
      const client = await getClient(uid)

      return {
        props: {
          client
        }
      }
    }
  } catch (_) {}
  return {
    props: {},
    redirect: {
      destination: Pages.SignIn
    }
  }
}

export default ClientPage
