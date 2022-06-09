import type { FC } from 'react'
import type { Order } from '@models/index'
import { AdminOrderItem } from '@components/index'
import Styles from './AdminOrdersList.module.css'

interface AdminOrdersListProps {
  orders: Order[]
}

export const AdminOrdersList: FC<AdminOrdersListProps> = ({ orders }) => {
  const sortOrderByDate = (a: Order, b: Order) => {
    const aDate = new Date(a.orderDate)
    const bDate = new Date(b.orderDate)
    return aDate.getTime() - bDate.getTime()
  }

  const ordersSortedByDate = orders.sort(sortOrderByDate)

  const renderOrders = ordersSortedByDate.map(order => (
    <AdminOrderItem key={order.id} order={order} />
  ))

  return (
    <div className={Styles.containerWrapper}>
      <ul className={Styles.listContainer}>{renderOrders}</ul>
    </div>
  )
}
