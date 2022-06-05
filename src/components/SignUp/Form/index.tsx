import { FC, useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { Pages } from '@utils/constants'
import { Client } from '@models/index'
import { createUser } from '@services/authentication'
import { setClient } from '@database/client'
import Link from 'next/link'
import Styles from './SignUpForm.module.css'

export const SignUpForm: FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [address, setAddress] = useState<string>('')
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

  const handleCreateUser = async () => {
    await createUser(email, password, showError).then(async id => {
      if (id) {
        const client: Client = {
          id,
          name,
          email,
          phone,
          address
        }
        await setClient(client).then(navigateToClientPage)
      }
    })
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await handleCreateUser()
  }

  const phonePattern: RegExp = /^\(([0-9]{2})\) ([0-9]{5})-([0-9]{4})$/g

  return (
    <div className={Styles.formWrapper}>
      <form className={Styles.formCard} onSubmit={onSubmit}>
        <h3 className={Styles.title}>Fazer cadastro</h3>
        <input
          className={Styles.input}
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
          type="email"
          autoComplete="email"
          placeholder="Seu e-mail"
        />
        <input
          className={Styles.input}
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
          type="password"
          autoComplete="new-password"
          placeholder="Crie uma senha"
          pattern=".{6,}"
          title="A senha deve conter no mínimo 6 caracteres"
        />
        <input
          className={Styles.input}
          value={name}
          onChange={event => setName(event.target.value)}
          required
          type="text"
          autoComplete="name"
          placeholder="Nome completo"
        />
        <input
          className={Styles.input}
          value={phone}
          onChange={event => {
            setPhone(event.target.value)
          }}
          required
          type="text"
          autoComplete="tel"
          placeholder="Número de celular"
          pattern={phonePattern.source}
          title="Número de celular no formato (xx) xxxxx-xxxx"
        />
        <input
          className={Styles.input}
          value={address}
          onChange={event => setAddress(event.target.value)}
          required
          type="text"
          autoComplete="address-line1"
          placeholder="Endereço"
        />
        <input
          className={Styles.signUpButton}
          type="submit"
          value="Cadastrar"
        />
        <Link href={Pages.SignIn} passHref>
          <a className={Styles.signInText}>
            Já possui uma conta? Faça seu login!
          </a>
        </Link>
      </form>
      <div className={showErrorBox ? Styles.showErrorBox : Styles.hideErrorBox}>
        <span className={Styles.errorText}>
          Ocorreu um erro ao tentar fazer seu cadastro.
        </span>
      </div>
    </div>
  )
}