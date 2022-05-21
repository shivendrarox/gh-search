import {useState} from 'react'
import styles from "./styles.module.css"
import { Octokit, App } from "octokit";

const SearhBar  = ({placeholder}) => {
    const [filteredRepos,setFilteredRepos] = useState([])
    const [userInput,setUserInput] = useState("")
    const [favList, setFavList] = useState([])

    function containsObject(obj, list) {
        let i;
        for (i = 0; i < list.length; i++) {
            if (list[i].name === obj.name) {
                return true;
            }
        }
    
        return false;
    }

    const favListHandler = (actionForList,value)=>{
        if(actionForList==="ADD"){
            setFavList([...favList,{name:value.name,url:value.html_url}])
        }

        if(actionForList==="REMOVE"){
            setFavList(favList.filter(function(ele){return ele.name!=value.name}))
        }
    }

    const handleFilter = async (event)=>{
        const searchTerm = event.target.value
        setUserInput(searchTerm)
        try{
              const octokit = new Octokit({
                auth: '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'
              })
              
            let dataFromGh = await octokit.request(`GET /search/repositories?q=${searchTerm}&per_page=10`, {})

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
            <div>SearchIcon</div>
          ) : 
          (
            <div onClick={resetSearchBar} >Clear</div>
          )}
        </div>
        {filteredRepos.length != 0 && (
        <div className="dataResult">
          {filteredRepos.map((value) => {
            return (
              <div key={value.id} className={styles.dataItem} >
                <a href={value.html_url} target="_blank" >{value.name} </a>
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