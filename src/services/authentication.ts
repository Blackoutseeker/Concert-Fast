import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { auth } from '@utils/firebaseClient'

/**
 * Create a new user with an email and password.
 * @param email - the user's email
 * @param password - the user's password
 * @param onError - a callback to be called if an error occurs while creating the user account
 * @returns {Promise<string | undefined>} the user's `id` if the user's account was created successfully, otherwise `undefined` if an error occurred
 */

export const createUser = async (
  email: string,
  password: string,
  onError?: (error?: Error) => void | Promise<void>
): Promise<string | undefined> => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then(async ({ user }) => user.uid)
    .catch(async error => {
      await onError?.(error)
      return undefined
    })
}

/**
 * Sign in with email and password
 * @param {string} email - the user's email
 * @param {string} password - the user's password
 * @param {(() => void | Promise<void>) | undefined} onSuccess - a callback that is called when the user is successfully signed in
 * @param {(error?: Error | undefined) => void | Promise<void> | undefined} onError - a callback that is called when the user is not successfully signed in
 */

export const signIn = async (
  email: string,
  password: string,
  onSuccess?: () => void | Promise<void>,
  onError?: (error?: Error) => void | Promise<void>
) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then(onSuccess)
    .catch(onError)
}

/**
 * Sign in with Google account
 * @param {(id: string) => boolean | Promise<boolean>} checkIfClientAlreadyHasAccount - a callback that checks if the user already has an account in the database
 * @param {(() => void | Promise<void>) | undefined} onSuccess - a callback that is called when the user is successfully signed in
 * @param {(error?: Error | undefined) => void | Promise<void> | undefined} onError - a callback that is called when the user is not successfully signed in
 */

export const signInWithGoogle = async (
  checkIfClientAlreadyHasAccount: (id: string) => boolean | Promise<boolean>,
  onSuccess?: () => void | Promise<void>,
  onError?: (error?: Error) => void | Promise<void>
) => {
  const googleProvider = new GoogleAuthProvider()
  await signInWithPopup(auth, googleProvider)
    .then(async ({ user }) => {
      const alreadyHasAccount = await checkIfClientAlreadyHasAccount(user.uid)
      if (alreadyHasAccount) {
        return onSuccess?.()
      }
      await signOut(auth).then(async () => {
        await onError?.()
      })
    })
    .catch(onError)
}
