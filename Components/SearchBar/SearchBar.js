import {useState} from 'react'
import styles from "./styles.module.css"
import { Octokit, App } from "octokit";

const SearhBar  = ({placeholder}) => {
    const [filteredRepos,setFilteredRepos] = useState([])
    const [userInput,setUserInput] = useState("")

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
                <button>X</button>
                <button>&#10084;</button>
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