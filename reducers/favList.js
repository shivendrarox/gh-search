const favListReducer = (state = [],action)=>{
    switch(action.type){
        case  "ADD":
            return [...state,action.payload]
        case "REMOVE":
            return state.filter(function(ele){return ele.name!=action.payload.name})
        default:
            return state
    }
}

export default favListReducer