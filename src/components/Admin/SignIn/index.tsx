import { FC, useState, FormEvent } from 'react'
import { signIn } from '@services/authentication'
import Styles from './AdminSignIn.module.css'

interface AdminSignInProps {
  handlePageRedirection: () => void | Promise<void>
}

export const AdminSignIn: FC<AdminSignInProps> = ({
  handlePageRedirection
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showErrorBox, setShowErrorBox] = useState<boolean>(false)

  const showError = () => {
    setShowErrorBox(true)
    setTimeout(() => {
      setShowErrorBox(false)
    }, 5000)
  }

  const handleSignIn = async () => {
    await signIn(email, password, handlePageRedirection, showError)
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await handleSignIn()
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
          pattern=".{6,}"
          title="A senha deve conter no mínimo 6 caracteres"
        />
        <input className={Styles.signInButton} type="submit" value="Entrar" />
      </form>
      <div className={showErrorBox ? Styles.showErrorBox : Styles.hideErrorBox}>
        <span className={Styles.errorText}>
          Ocorreu um erro ao tentar fazer login.
        </span>
      </div>
    </div>
  )
}
