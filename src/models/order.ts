import type { Client } from './index'

type OrderStatus = 'sent' | 'repairing' | 'dispatched'

export type Order = {
  id: string
  client: Client
  equipment: string
  description: string
  budget?: number
  orderDate: string
  status: OrderStatus
  dispatchDate?: string
}
