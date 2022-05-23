import { ref, get } from 'firebase/database'
import { database } from '@utils/firebaseClient'

export const checkIfClientAlreadyExists = async (
  id: string
): Promise<boolean> => {
  const clientReference = ref(database, `/clients/${id}`)
  const client = await (await get(clientReference)).val()
  return client !== null
}
