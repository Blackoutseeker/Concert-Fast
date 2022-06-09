import { FC, useState } from 'react'
import type { Order } from '@models/index'
import { format } from 'date-fns'
import { updateOrder, deleteOrder } from '@database/order'
import { FaTrash } from 'react-icons/fa'
import Styles from './AdminOrderItem.module.css'

interface AdminOrderItemProps {
  order: Order
}

export const AdminOrderItem: FC<AdminOrderItemProps> = ({ order }) => {
  const [budget, setBudget] = useState<string>(order.budget?.toString() ?? '')
  const [status, setStatus] = useState<typeof order.status>(order.status)

  const formatDate = (date: Date): string => {
    const formattedDate = format(date, 'dd/MM/yyyy - HH:mm')
    return formattedDate
  }

  const budgetPattern: RegExp = /^([0-9]+)((.|,)[0-9]{1,2})?$/g
  const canType: RegExp = /^(([0-9]+|\.|,|)+)$/g

  const handleUpdateOrder = async () => {
    const updatedOrder: Order = order
    updatedOrder.status = status

    if (budgetPattern.test(budget)) {
      updatedOrder.budget = Number(budget.replace(/,/g, '.'))
    }

    const noDispatchedDate: boolean =
      status === 'dispatched' && updatedOrder.dispatchDate === undefined
    if (noDispatchedDate) {
      updatedOrder.dispatchDate = new Date().toISOString()
    }

    const hasDispatchedDate: boolean = updatedOrder.dispatchDate !== undefined
    if (hasDispatchedDate) {
      updatedOrder.status = 'dispatched'
      setStatus('dispatched')
    }

    await updateOrder(updatedOrder)
  }

  return (
    <li key={order.id} className={Styles.orderCard}>
      <button
        className={Styles.deleteButton}
        onClick={() => deleteOrder(order)}
      >
        <FaTrash color="#fff" size={12} />
      </button>
      <h6 className={Styles.orderTitle}>#{order.id}</h6>
      <span className={Styles.orderEquipment}>{order.equipment}</span>
      <textarea
        className={Styles.orderDescription}
        rows={3}
        value={order.description}
        readOnly
      />
      <div>
        <span className={Styles.orderLabel}>Preço:</span>
        <span className={Styles.orderLabelText}>{` R$ `}</span>
        <input
          className={Styles.budgetInput}
          value={budget}
          onChange={event => {
            const value = event.target.value
            if (canType.test(value)) {
              setBudget(value)
            }
          }}
          placeholder="Adicionar"
          pattern={budgetPattern.source}
        />
      </div>
      <div>
        <label className={Styles.orderLabel} htmlFor={`${order.id}:status`}>
          Status:
        </label>
        <select
          className={Styles.orderSelectStatus}
          id={`${order.id}:status`}
          value={status}
          onChange={event =>
            setStatus(event.target.value as typeof order.status)
          }
        >
          <option className={Styles.orderStatusOption} value="sent">
            Enviado
          </option>
          <option className={Styles.orderStatusOption} value="repairing">
            Consertando
          </option>
          <option className={Styles.orderStatusOption} value="dispatched">
            Expedido
          </option>
        </select>
      </div>
      <div>
        <span className={Styles.orderLabel}>Cliente:</span>
        <span className={Styles.orderLabelText}>{` ${order.client.name}`}</span>
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
      <button className={Styles.saveButton} onClick={handleUpdateOrder}>
        Salvar
      </button>
    </li>
  )
}
