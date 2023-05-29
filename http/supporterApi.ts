import { errorToast } from "@/helper/toster";
import { baseUrl } from "./index";

const GET_SUPPORTER_LATEST_SUBSCRIPTION =`${baseUrl}/creator`


export const getSupporterLatestSubscription = async (_token:string, creatorName: string) => {
    try {
      const res = await fetch(`${GET_SUPPORTER_LATEST_SUBSCRIPTION}/${creatorName}/supporter/recent_subscription`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${_token}`
        },
      });
      
      if (!res.ok) {
        const err = await res.json();
        console.log(err.msg,"rerr.msg")
        errorToast(err.msg||res.statusText)
        return null
      }
      const result = await res.json();
      return result.data
    } catch (error:any) {
      errorToast(error.message)
      console.log("error", JSON.stringify(error));
      return null
    }
  };