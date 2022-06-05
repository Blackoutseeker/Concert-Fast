import { ref, get, set, Unsubscribe, onValue, off } from 'firebase/database'
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

/**
 * Add an order to the database
 * @param {Order} order - the order to add to the database
 * @returns {Promise<void>}
 */

export const setOrder = async (order: Order): Promise<void> => {
  const orderReference = ref(database, `orders/${order.client.id}/${order.id}`)
  await set(orderReference, order)
}

interface Listener {
  on: () => Unsubscribe
  off: () => void
}

/**
 * Listen for client orders changes in the database
 * @param id - the client id
 * @param setOrders - the function to set the orders
 * @returns {Listener} `on` and `off` methods
 */

export const listenClientOrders = (
  id: string,
  setOrders: (orders: Order[] | undefined) => void
): Listener => {
  const clientOrdersReference = ref(database, `orders/${id}`)

  return {
    on: () =>
      onValue(clientOrdersReference, snapshot => {
        const snapshotIsNotEmpty =
          snapshot.val() !== null && snapshot.val() !== undefined
        if (snapshotIsNotEmpty) {
          const orders: Order[] = []
          snapshot.forEach(order => {
            orders.push(order.val())
          })
          setOrders(orders)
        } else {
          setOrders(undefined)
        }
      }),
    off: () => off(clientOrdersReference)
  }
}
