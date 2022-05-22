import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SearhBar from '../Components/SearchBar/SearchBar'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Searh repo here</title>
        <meta name="description" content="Searh repo here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome
        </h1>

        <p className={styles.description}>
        search a repo using the searh bar
        <br/>
        Mark favourites and visit them <a href="/favourites">here</a>
        </p>
          <SearhBar/>

      </main>
    </div>
  )
}
