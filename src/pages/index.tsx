import React, { useEffect } from "react";
import type { NextPage } from 'next'
import Head from 'next/head'
import Contact from '../features/contact/Contact'
import styles from '../styles/Home.module.css'
import {
    getAllAsync
} from '../features/contact/contactSlice'
import {useAppDispatch} from "../app/hooks";
import {Link} from "../components/Link";
const IndexPage: NextPage = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getAllAsync())
    }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Angel test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Link href="/contacts/add" className="btn btn-sm btn-success mb-2">Add User</Link>
      <header className={styles.header}>
        <Contact />
      </header>
    </div>
  )
}

export default IndexPage
