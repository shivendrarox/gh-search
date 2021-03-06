import {useState,useEffect} from 'react'
import styles from "./styles.module.css"
import {useSelector,useDispatch} from "react-redux"
import {addItem,removeItem} from "../../actions"
import axios from 'axios';
const SearhBar  = ({placeholder}) => {
    const [filteredRepos,setFilteredRepos] = useState([])
    const [userInput,setUserInput] = useState("")
    const [favList, setFavList] = useState([])

    const favListRedux  = useSelector(state=>state.favList)
    const dispatch = useDispatch()
    useEffect(() => {
         setFavList(JSON.parse(window.localStorage.getItem('favListLocalStorage'))??[])
      }, [])

    // useEffect(()=>{
    //      //window.localStorage.setItem('favListLocalStorage',JSON.stringify(favList))
    // },[favList])

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
        if(actionForList==="ADD"){
            dispatch(addItem({name:value.name,url:value.html_url}))
            setFavList([...favList,{name:value.name,url:value.html_url}])
            window.localStorage.setItem('favListLocalStorage',JSON.stringify([...favList,{name:value.name,url:value.html_url}]))
        }

        if(actionForList==="REMOVE"){
            dispatch(removeItem({name:value.name,url:value.html_url}))
            setFavList(favList.filter(function(ele){return ele.name!=value.name}))
            window.localStorage.setItem('favListLocalStorage',JSON.stringify(favList.filter(function(ele){return ele.name!=value.name})))
        }
    }

    const handleFilter = async (event)=>{
        const searchTerm = event.target.value
        setUserInput(searchTerm)
        try{
              
            let dataFromGh = await axios.post('https://fierce-json-maker.glitch.me/search', {
              'searchTerm': searchTerm,
            })

            const newFilteredRepos = dataFromGh.data.items.filter((value)=>{
                return value.name.toLowerCase().includes(searchTerm.toLowerCase());
            })
            if (searchTerm === "") {
                setFilteredRepos([]);
              } else {
                setFilteredRepos(newFilteredRepos);
              }
        }
        catch(error){
            console.log(error)
        }
   
    }

  const resetSearchBar = () =>{
    setFilteredRepos([])
    setUserInput("")
  }

  return(<>
    <div>
        <div className={styles.searchField} >
        <input
          type="text"
          placeholder={placeholder}
          value={userInput}
          onChange={handleFilter}
        />
        {filteredRepos.length === 0 ? (
            // <SearchIcon />
            <div style={{marginLeft:"10px",cursor:"pointer"}}  >&#128269;</div>
          ) : 
          (
            <div style={{marginLeft:"10px",cursor:"pointer"}} onClick={resetSearchBar} >X</div>
          )}
        </div>
        {filteredRepos.length != 0 && (
        <div className={styles.dataResult}>
          {filteredRepos.map((value) => {
            return (
              <div key={value.id} className={styles.dataItem} >
                <a href={value.html_url} rel="noreferrer" target="_blank" >{value.name} </a>
                <div>
                {containsObject({"name":value.name,"url":value.html_url},favList)?
                <button onClick={()=>favListHandler("REMOVE",value)} >X</button>
                :
                <button onClick={()=>favListHandler("ADD",value)}>&#10084;</button>}

                </div>
             
              </div>
            );
          })}
        </div>
      )}
    </div>
  </>)
}

export default SearhBar