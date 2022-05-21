import {useState} from 'react'
import styles from "./styles.module.scss"
// import axios from "axios"
const SearhBar  = ({placeholder,inputData}) => {
    const [filteredRepos,setFilteredRepos] = useState([])
    const [userInput,setUserInput] = useState("")

    const handleFilter = (event)=>{
        const searchTerm = event.target.value
        setUserInput(searchTerm)

        const filterRepos = data.filter( async (value)=>{
            // let dataFromGh = await axios.get("")
        })
    }
}

export default SearhBar