import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Fragment>
        <div>
          <Head>
            <title>NextJS 101</title>
            <meta name="keywords" content="Intro to nextjs" />
          </Head>
        </div>
        <h1>NextJS 101</h1>
        <ul>
          {/* Using "a" tag will refresh the page, this sends a request to fetch a new page */}
          <li><a href="/news/1">Page 1 (Simple anchor tag)</a></li>
          <li><Link href="/news/2">Page 2 (Using next/link)</Link></li>
        </ul>
      </Fragment>
    </div>
  )
}
