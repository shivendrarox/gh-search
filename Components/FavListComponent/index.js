import {useState,useEffect} from 'react'
import styles from "./styles.module.css"
import {useDispatch} from "react-redux"
import {removeItem} from "../../actions"
const FavListComponent  = ({favListProp}) => {
    const [favList, setFavList] = useState([...favListProp])

    const dispatch = useDispatch()
    useEffect(() => {
         setFavList(JSON.parse(window.localStorage.getItem('favListLocalStorage'))??[])
      }, [favList])

    function containsObject(obj, list) {
        let i;
        for (i = 0; i < list.length; i++) {
            if (list[i].url === obj.url) {
                return true;
            }
        }
    
        return false;
    }

    const favListHandler = (actionForList,value)=>{
        // if(actionForList==="ADD"){
        //     dispatch(addItem({name:value.name,url:value.html_url}))
        //     setFavList([...favList,{name:value.name,url:value.html_url}])
        //     window.localStorage.setItem('favListLocalStorage',JSON.stringify([...favList,{name:value.name,url:value.html_url}]))
        // }

        if(actionForList==="REMOVE"){
            dispatch(removeItem({name:value.name,url:value.html_url}))
            setFavList(favList.filter(function(ele){return ele.name!=value.name}))
            window.localStorage.setItem('favListLocalStorage',JSON.stringify(favList.filter(function(ele){return ele.name!=value.name})))
        }
    }



  return(<>
    <div>

        {favList.length != 0 && (
        <div className="dataResult">
          {favList.map((value) => {
            return (<>
                        {!containsObject({"name":value.name,"url":value.html_url},favList)?
              <div key={value.id} className={styles.dataItem} >
                <a href={value.html_url} target="_blank" >{value.name} </a>
                <div>

                <button onClick={()=>favListHandler("REMOVE",value)} >X</button>

                </div>
             
              </div>
              :
            <></>}
            </>)
          })}
        </div>
      )}
    </div>
  </>)
}

export default FavListComponent