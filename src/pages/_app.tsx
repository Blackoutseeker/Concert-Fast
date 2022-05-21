import type { AppProps } from 'next/app'
import { AuthProvider } from '@services/authProvider'
import Head from 'next/head'
import '@styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App
