import '../styles/globals.css'
import {createStore} from 'redux'
//import favListReducer from "../reducers/favList"
import {Provider} from "react-redux"
import allReducer from "../reducers"
const myStore  = createStore(allReducer)

function MyApp({ Component, pageProps }) {
  return(<>
    <Provider store={myStore} >
      <Component {...pageProps} />
    </Provider>
  </>)
}

export default MyApp
