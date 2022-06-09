import type { NextPage, GetServerSideProps } from 'next'
import type { Order } from '@models/index'
import { useState, useEffect } from 'react'
import { listenOrders, getOrders } from '@database/order'
import { format } from 'date-fns'
import Head from 'next/head'
import { AdminHeader, AdminOrdersList } from '@components/index'
import { parseCookies } from 'nookies'
import { adminAuth } from '@utils/firebaseAdmin'
import storage from '@services/storage'
import { Pages } from '@utils/constants'
import Styles from '@styles/Home.module.css'

interface AdminPageProps {
  preloadedOrders: Order[] | undefined
}

const AdminPage: NextPage<AdminPageProps> = ({ preloadedOrders }) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [orders, setOrders] = useState<Order[] | undefined>(preloadedOrders)
  const handleListenOrders = listenOrders(setOrders)

  useEffect(() => {
    handleListenOrders.on()
    return () => {
      handleListenOrders.off()
    }
  }, [handleListenOrders, orders])

  const filterOrdersBySearchValue = (order: Order) => {
    if (order.client) {
      const searchValueLowerCase = searchValue.toLowerCase()
      const clientName = order.client.name.toLowerCase()
      const orderEquipment = order.equipment.toLowerCase()
      const orderId = order.id.toLowerCase()
      const orderDate = format(new Date(order.orderDate), 'dd/MM/yyyy - HH:mm')
      return (
        clientName.includes(searchValueLowerCase) ||
        orderEquipment.includes(searchValueLowerCase) ||
        orderId.includes(searchValueLowerCase) ||
        orderDate.includes(searchValueLowerCase)
      )
    }
    return false
  }

  const filteredOrders = orders?.filter(filterOrdersBySearchValue)

  return (
    <div className={Styles.pageContainer}>
      <Head>
        <title>Admin - Concert Fast</title>
      </Head>
      <AdminHeader searchValue={searchValue} setSearchValue={setSearchValue} />
      {filteredOrders && <AdminOrdersList orders={filteredOrders} />}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const getTokenFromCookie = () => {
      const token = parseCookies(context).token
      return token
    }

    const idToken = storage().getToken(getTokenFromCookie)
    const uid = (await adminAuth.verifyIdToken(idToken)).uid
    const isAdmin = uid === process.env.ADMIN_ID

    if (isAdmin) {
      const preloadedOrders = await getOrders()

      return {
        props: {
          preloadedOrders
        }
      }
    }
    return {
      props: {},
      redirect: {
        destination: Pages.Home
      }
    }
  } catch (_) {}
  return {
    props: {},
    redirect: {
      destination: Pages.Home
    }
  }
}

export default AdminPage
