import { getLocaleData } from "@/service/localStorageService"

export const getRedirectRouteByRole = (id:string, username: string)=>{
    const user = getLocaleData("user");
    let str = ""
    if(user?.role == "creator")
    {
        str = `${str}/${username}?key=${id}`
    } else{
        str = `${str}/${username}?key=${id}`
    }
    return str
}