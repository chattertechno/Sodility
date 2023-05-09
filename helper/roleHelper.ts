import { getLocaleData } from "@/service/localStorageService"

export const getRedirectRouteByRole = (id:any)=>{
    const user = getLocaleData("user");
    let str = ""
    if(user?.role == "creator")
    {
        str = `${str}/creator-creator?key=${id}`
    } else{
        str = `${str}/creator?key=${id}`
    }
    return str
}