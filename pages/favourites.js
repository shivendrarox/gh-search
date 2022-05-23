import styles from '../styles/Fav.module.css'
import Head from 'next/head'
import FavListComponent from '../Components/FavListComponent/FavListComponent'
import { useRouter } from 'next/router'
import {useState, useEffect} from "react"
const Favourites = ()=>{
  const router = useRouter()
    const [favListLocal, setFavListLocal] = useState([])

    useEffect(() => {
      if(window){
        setFavListLocal(JSON.parse(window.localStorage.getItem('favListLocalStorage')))
      }
    }, [])

     const settingsImport = (e) => {
         e.preventDefault()
         const fileReader = new FileReader();
         fileReader.readAsText(e.target.files[0], "UTF-8");
         fileReader.onload = e => {
           
           const resobj = JSON.parse(e.target.result)
           setFavListLocal(JSON.parse(resobj.userFavListExport));

           window.localStorage.setItem('favListLocalStorage',resobj.userFavListExport)
         };
         router.reload()
      }



return(<>
          <div className={styles.container}>
      <Head>
        <title>Your Favs</title>
        <meta name="description" content="Your Favs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.titl1e}>
        Your Favs
        </h1>
        {(favListLocal?.length??0) >0&&
        <div>
        <form className={styles.form_container} action="https://fierce-json-maker.glitch.me/generate-settings" method="post" target="_blank">
            <input hidden defaultValue={JSON.stringify(favListLocal)} type="text" id="userFavListExport" name="userFavListExport"/>
            <p>Download your favs</p>
            <input style={{display:"block",margin:'auto'}} type="submit" value="Download"/>
        </form>
        </div>}

        <div className={styles.form_container} >
        <p style={{textAlign:"center"}} >Import your favs</p>
        <input accept="application/JSON"  type="file" onChange={(e)=>settingsImport(e)} />
        </div>

        {favListLocal&&  <FavListComponent favListProp={favListLocal} />}

      </main>
    </div>
    </>)
}

export default Favourites