import { getLocaleData } from "@/service/localStorageService"

export const getRedirectRouteByRole = (id:string, username: string)=>{
    const user = getLocaleData("user");
    let str = ""
    if(user?.role == "creator")
    {
        str = `${str}/${username}`
    } else{
        str = `${str}/${username}`
    }
    return str
}