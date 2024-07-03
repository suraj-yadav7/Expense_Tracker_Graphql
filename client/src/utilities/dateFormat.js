export const dateformat=(dateVal)=>{
    const date = new Date(parseInt(dateVal))
    const option = {day:'2-digit', month:'short', year:"numeric"}
    return date.toLocaleDateString('en-US', option)
}

