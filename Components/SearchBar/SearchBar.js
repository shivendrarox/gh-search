import {useState} from 'react'
import styles from "./styles.module.scss"
import axios from "axios"
const SearhBar  = ({placeholder,inputData}) => {
    const [filteredRepos,setFilteredRepos] = useState([])
    const [userInput,setUserInput] = useState("")

    const handleFilter = async (event)=>{
        const searchTerm = event.target.value
        setUserInput(searchTerm)
        try{
            let dataFromGh = await axios.get(`https://api.github.com/search/repositories?q=mozilla&per_page=10`)
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
  
  </>)
}

export default SearhBar