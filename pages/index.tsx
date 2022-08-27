import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { Home as HomePage } from '../components/home/Home'

export default function Home() {
  return (
    <>
    <Head>
      <title>
        {process.env.NEXT_PUBLIC_WEBSITE_NAME}
      </title>
    </Head>

    <HomePage />
    </>
  )
}
