import type { FC } from 'react'
import type { Order } from '@models/index'
import { format } from 'date-fns'
import Styles from './ClientOrdersList.module.css'

interface ClientOrdersListProps {
  orders: Order[]
}

export const ClientOrdersList: FC<ClientOrdersListProps> = ({ orders }) => {
  const handleOrderStatus = (order: Order): string => {
    switch (order.status) {
      case 'sent':
        return 'Enviado'
      case 'repairing':
        return 'Consertando'
      case 'dispatched':
        return 'Expedido'
    }
  }

  const formatDate = (date: Date): string => {
    const formattedDate = format(date, 'dd/MM/yyyy - HH:mm')
    return formattedDate
  }

  const sortOrderByDate = (a: Order, b: Order) => {
    const aDate = new Date(a.orderDate)
    const bDate = new Date(b.orderDate)
    return bDate.getTime() - aDate.getTime()
  }

  const ordersSortedByDate = orders.sort(sortOrderByDate)

  const renderOrders = ordersSortedByDate.map(order => (
    <li key={order.id} className={Styles.orderCard}>
      <h6 className={Styles.orderTitle}>#{order.id}</h6>
      <span className={Styles.orderEquipment}>{order.equipment}</span>
      <textarea
        className={Styles.orderDescription}
        rows={3}
        value={order.description}
        readOnly
      />
      {order.budget && (
        <div>
          <span className={Styles.orderLabel}>Preço:</span>
          <span className={Styles.orderLabelText}>{` R$ ${order.budget}`}</span>
        </div>
      )}
      <div>
        <span className={Styles.orderLabel}>Status:</span>
        <span className={Styles.orderLabelText}>{` ${handleOrderStatus(
          order
        )}`}</span>
      </div>
      <div>
        <span className={Styles.orderLabel}>Enviado em:</span>
        <span className={Styles.orderLabelText}>{` ${formatDate(
          new Date(order.orderDate)
        )}`}</span>
      </div>
      {order.dispatchDate && (
        <div>
          <span className={Styles.orderLabel}>Expedido em:</span>
          <span className={Styles.orderLabelText}>{` ${formatDate(
            new Date(order.dispatchDate)
          )}`}</span>
        </div>
      )}
    </li>
  ))

  return (
    <div className={Styles.containerWrapper}>
      <ul className={Styles.listContainer}>{renderOrders}</ul>
    </div>
  )
}
