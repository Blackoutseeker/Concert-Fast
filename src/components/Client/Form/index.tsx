import { FC, useState, FormEvent } from 'react'
import type { Client, Order } from '@models/index'
import { generateRandomId } from '@services/generate'
import { setOrder } from '@database/order'
import Styles from './ClientForm.module.css'

interface ClientFormProps {
  client: Client
  closeModal: () => void
}

export const ClientForm: FC<ClientFormProps> = ({ client, closeModal }) => {
  const [equipment, setEquipment] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const orderId: string = generateRandomId()
    const orderDate: string = new Date().toISOString()

    const order: Order = {
      id: orderId,
      equipment,
      description,
      client,
      status: 'sent',
      orderDate
    }

    await setOrder(order).then(closeModal)
  }

  return (
    <div>
      <form className={Styles.formCard} onSubmit={onSubmit}>
        <h3 className={Styles.title}>Fazer orçamento</h3>
        <input
          className={Styles.input}
          value={equipment}
          onChange={event => setEquipment(event.target.value)}
          placeholder="Nome do aparelho"
          required
        />
        <textarea
          className={Styles.textArea}
          value={description}
          onChange={event => setDescription(event.target.value)}
          rows={3}
          placeholder="Descreva o defeito"
          required
        />
        <button className={Styles.submitButton} type="submit">
          Enviar
        </button>
      </form>
    </div>
  )
}
