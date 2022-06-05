import { ref, get } from 'firebase/database'
import { database } from '@utils/firebaseClient'
import type { Order } from '@models/index'

/**
 * Get all orders from the database
 * @returns {Promise<Order[]> | undefined} the orders if exist, otherwise `undefined`
 */

export const getOrders = async (): Promise<Order[] | undefined> => {
  const ordersRef = ref(database, 'orders')
  const orders: Order[] = []

  await get(ordersRef).then(snapshot => {
    if (snapshot.val() === null) return undefined

    snapshot.forEach(order => {
      orders.push(order.val())
    })
  })

  return orders
}

/**
 * Get client orders from the database
 * @param id - the client id
 * @returns {Promise<Order[] | undefined>} the orders if exist, otherwise `undefined`
 */

export const getClientOrders = async (
  id: string
): Promise<Order[] | undefined> => {
  const clientOrdersReference = ref(database, `orders/${id}`)
  const clientOrders: Order[] = []

  await get(clientOrdersReference).then(snapshot => {
    if (snapshot.val() === null) return undefined

    snapshot.forEach(order => {
      clientOrders.push(order.val())
    })
  })

  return clientOrders
}
