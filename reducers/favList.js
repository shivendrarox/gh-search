const favListReducer = (state = [],action,listItem)=>{
    switch(action.type){
        case  "ADD":
            return state.push(listItem)
        case "REMOVE":
            return state.filter(function(ele){return ele.name!=listItem.name})
        default:
            return state
    }
}

export default favListReducer