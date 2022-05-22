import styles from '../styles/Home.module.css'
import Head from 'next/head'
import FavListComponent from '../Components/favListComponent/index'
import axios from "axios"
import {useState, useEffect} from "react"
const Favourites = ()=>{
    const [exportError,setExportError] = useState(false)
    const [favListLocal, setFavListLocal] = useState([])
    // useEffect(() => {
    //     setFavListLocal(JSON.parse(window.localStorage.getItem('favListLocalStorage'))??[])
    //   }, [])

      

     const settingsImport = (e) => {
         e.preventDefault()
         const fileReader = new FileReader();
         fileReader.readAsText(e.target.files[0], "UTF-8");
         fileReader.onload = e => {
           
           const resobj = JSON.parse(e.target.result)
           console.log("e.target.result", typeof resobj.userFavListExport);
           setFavListLocal((resobj.userFavListExport));

           window.localStorage.setItem('favListLocalStorage',resobj.userFavListExport)
         };
         console.log(favListLocal)
      }

    const exportFavs = () =>{
        let data = localStorage.getItem("favListLocalStorage");
          
          var config = {
            method: 'post',
            url: 'https://fierce-json-maker.glitch.me/generate-settings',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            setExportError(true)
            console.log(error);
          });
          
    }

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
        <div>
        <form action="https://fierce-json-maker.glitch.me/generate-settings" method="post" target="_blank">
            <input hidden defaultValue={JSON.stringify(favListLocal)} type="text" id="userFavListExport" name="userFavListExport"/>
            <input type="submit" value="export your favs"/>
        </form>
            {/* <button onClick={()=>{exportFavs()}} >export your favs</button> */}
            {/* {exportError&&<p styles={{color:"red"}} >Please Try Again</p>} */}
        </div>

        <div>
        {/* <form target="_blank" onSubmit={} action="https://fierce-json-maker.glitch.me/import-settings" method="post" enctype="multipart/form-data">
            <input type="file" id="settingsfile" name="settingsfile"/>
            <input type="submit" value="import your favs"/>
        </form> */}
        <input type="file" onChange={(e)=>settingsImport(e)} />

            {/* <button onClick={()=>{exportFavs()}} >export your favs</button> */}
            {/* {exportError&&<p styles={{color:"red"}} >Please Try Again</p>} */}
        </div>

        <FavListComponent/>

      </main>
    </div>
    </>)
}

export default Favourites