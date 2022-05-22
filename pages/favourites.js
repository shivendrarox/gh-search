import styles from '../styles/Home.module.css'
import Head from 'next/head'
import FavListComponent from '../Components/favListComponent/index'

const Favourites = ()=>{
return(<>
          <div className={styles.container}>
      <Head>
        <title>Your Favs</title>
        <meta name="description" content="Your Favs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
        Your Favs
        </h1>
        <FavListComponent/>

      </main>
    </div>
    </>)
}

export default Favourites