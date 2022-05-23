import { ref, get } from 'firebase/database'
import { database } from '@utils/firebaseClient'
import type { Client } from '@models/index'

/**
 * Check if the client is in the database
 * @param {string} id - the client id
 * @returns {Promise<boolean>} `true` if the client is in the database, otherwise `false`
 */

export const checkIfClientAlreadyExists = async (
  id: string
): Promise<boolean> => {
  const clientReference = ref(database, `/clients/${id}`)
  const client = await (await get(clientReference)).val()
  return client !== null
}

/**
 * Get a client from the database
 * @param id - the client id
 * @returns {Promise<Client | undefined>} the client if it exists, otherwise `undefined`
 */

export const getClient = async (id: string): Promise<Client | undefined> => {
  const clientReference = ref(database, `clients/${id}`)
  const client: Client | undefined = await (await get(clientReference)).val()
  return client
}

/**
 * Get all clients from the database
 * @returns {Promise<Client[] | undefined>} the clients if they exist, otherwise `undefined`
 */

export const getClients = async (): Promise<Client[] | undefined> => {
  const clientsReference = ref(database, `clients`)
  get(clientsReference).then(snapshot => {
    if (snapshot.val() !== null) {
      const clients: Client[] = []
      snapshot.forEach(client => {
        clients.push(client.val())
      })
      return clients
    }
  })
  return undefined
}
