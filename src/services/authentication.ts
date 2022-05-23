import { createUserWithEmailAndPassword } from 'firebase/auth'
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
