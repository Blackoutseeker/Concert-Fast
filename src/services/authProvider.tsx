import { createContext, useState, useEffect, useContext } from 'react'
import { setCookie, destroyCookie } from 'nookies'
import type { User } from 'firebase/auth'
import { auth } from '@utils/firebaseClient'

const AuthContext = createContext<{ user: User | null }>({
  user: null
})

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null)

  const saveTokenByCookie = (token: string) => {
    setCookie(undefined, 'token', token, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })
  }

  const deleteTokenFromCookie = () => {
    destroyCookie(undefined, 'token')
  }

  useEffect(() => {
    return auth.onIdTokenChanged(async user => {
      if (!user) {
        setUser(null)
        deleteTokenFromCookie()
      } else {
        await user.getIdToken().then(token => {
          setUser(user)
          saveTokenByCookie(token)
        })
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
