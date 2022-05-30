import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { HomeHeader, SignUpForm } from '@components/index'
import { parseCookies } from 'nookies'
import { adminAuth } from '@utils/firebaseAdmin'
import storage from '@services/storage'
import { Pages } from '@utils/constants'
import Styles from '@styles/Home.module.css'

const SignUpPage: NextPage = () => {
  return (
    <div className={Styles.pageContainer}>
      <Head>
        <title>Concert Fast</title>
        <meta
          name="description"
          content="Faça seu cadastro para ter acesso aos serviços da Concert Fast"
        />
      </Head>
      <HomeHeader />
      <SignUpForm />
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
    const isAuthenticated = await adminAuth.verifyIdToken(idToken)

    if (isAuthenticated) {
      return {
        props: {},
        redirect: {
          destination: Pages.Client
        }
      }
    }
  } catch (_) {}
  return {
    props: {}
  }
}

export default SignUpPage
