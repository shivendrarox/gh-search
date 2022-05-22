import favListReducer from "./favList"
import {combineReducers} from "redux"

const allReducers = combineReducers({
    favList: favListReducer
})

export default allReducers;