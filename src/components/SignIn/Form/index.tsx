import { FC, useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { Pages } from '@utils/constants'
import { signIn, signInWithGoogle } from '@services/authentication'
import { checkIfClientAlreadyExists } from '@database/client'
import { FaGoogle } from 'react-icons/fa'
import Link from 'next/link'
import Styles from './SignInForm.module.css'

export const SignInForm: FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showErrorBox, setShowErrorBox] = useState<boolean>(false)

  const showError = () => {
    setShowErrorBox(true)
    setTimeout(() => {
      setShowErrorBox(false)
    }, 5000)
  }

  const navigateToClientPage = async () => {
    await router.push(Pages.Client)
  }

  const handleSignIn = async () => {
    await signIn(email, password, navigateToClientPage, showError)
  }

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle(
      checkIfClientAlreadyExists,
      navigateToClientPage,
      showError
    )
  }

  const isPasswordValid = password.length >= 6

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isPasswordValid) {
      await handleSignIn()
    }
  }

  return (
    <div className={Styles.formWrapper}>
      <form className={Styles.formCard} onSubmit={onSubmit}>
        <h3 className={Styles.title}>Entrar</h3>
        <input
          className={Styles.input}
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
          type="email"
          autoComplete="email"
          placeholder="E-mail"
        />
        <input
          className={Styles.input}
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
          type="password"
          autoComplete="current-password"
          placeholder="Senha"
        />
        <input className={Styles.signInButton} type="submit" value="Entrar" />
        <div className={Styles.dividerContainer}>
          <hr className={Styles.divider} />
          <span className={Styles.dividerText}>ou</span>
          <hr className={Styles.divider} />
        </div>
        <button
          className={Styles.googleButton}
          type="button"
          onClick={handleSignInWithGoogle}
        >
          <FaGoogle color="#fff" size={25} />
          <span>Entrar com Google</span>
        </button>
        <Link href={Pages.SignUp} passHref>
          <a className={Styles.createAccountText}>
            Não possui uma conta? Faça agora!
          </a>
        </Link>
      </form>
      <div className={showErrorBox ? Styles.showErrorBox : Styles.hideErrorBox}>
        <span className={Styles.errorText}>
          Ocorreu um erro ao tentar fazer login.
        </span>
      </div>
    </div>
  )
}
