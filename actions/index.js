export const addItem = (listItem) =>{
    return {
        type:"ADD",
        payload:listItem
    }
}

export const removeItem = (listItem) =>{
    return {
        type:"REMOVE",
        payload:listItem
    }
}