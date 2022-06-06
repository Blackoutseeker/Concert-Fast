import type { NextPage, GetServerSideProps } from 'next'
import type { Client, Order } from '@models/index'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { listenClientOrders, getClientOrders } from '@database/order'
import Head from 'next/head'
import {
  GrettingHeader,
  FloatingActionButton,
  Modal,
  ClientForm,
  ClientOrdersList
} from '@components/index'
import { HiPlus, HiLogout } from 'react-icons/hi'
import { logOut } from '@services/authentication'
import { parseCookies } from 'nookies'
import { adminAuth } from '@utils/firebaseAdmin'
import storage from '@services/storage'
import { Pages } from '@utils/constants'
import { getClient } from '@database/client'
import Styles from '@styles/Home.module.css'

interface ClientPageProps {
  client: Client
  preloadedOrders: Order[]
}

const ClientPage: NextPage<ClientPageProps> = ({ client, preloadedOrders }) => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [orders, setOrders] = useState<Order[] | undefined>(preloadedOrders)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const navigateToHomePage = async () => {
    await router.push(Pages.Home)
  }

  const handleLogOut = async () => {
    await logOut(navigateToHomePage)
  }

  useEffect(() => {
    listenClientOrders(client.id, setOrders).on()
    return () => {
      listenClientOrders(client.id, setOrders).off()
    }
  }, [client.id])

  return (
    <div className={Styles.pageContainer}>
      <Head>
        <title>Meus orçamentos - Concert Fast</title>
      </Head>
      <GrettingHeader name={client.name} haveOrders={orders !== undefined} />
      {orders && <ClientOrdersList orders={orders} />}
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <ClientForm client={client} closeModal={closeModal} />
      </Modal>
      <FloatingActionButton onClick={openModal} Icon={HiPlus} />
      <FloatingActionButton
        onClick={handleLogOut}
        Icon={HiLogout}
        position="left"
      />
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

    if (uid) {
      const client = await getClient(uid)
      const preloadedOrders = await getClientOrders(uid)

      return {
        props: {
          client,
          preloadedOrders
        }
      }
    }
  } catch (_) {}
  return {
    props: {},
    redirect: {
      destination: Pages.SignIn
    }
  }
}

export default ClientPage
