import { ADD_POST, SEARCH_CONTENT,baseUrl } from "./index";
import { errorToast, successToast } from "../helper/toster";
const GET_CONTENT_BY_CREATOR_ID = `${baseUrl}/creator/all/content`
export const AddContentApi = async (_token:string, data:any) => {
    try {
      const res = await fetch(ADD_POST, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${_token}`
          },
      });
      console.log(res)
      if (!res.ok) {
        const err = await res.json();
        errorToast(err.msg)
        return false
      }
      console.log(res.ok,"res.okres.okres.okres.ok")
      const post = await res.json();
      console.log(post,"postpostpostpost")
      successToast("Add successfully")
      return true
    } catch (error:any) {
      errorToast(error.toString())
      console.log("error", JSON.stringify(error));
      return false
    }
  };

export const searchContentApi = async (search:string) => {
    try {
      const res = await fetch(`${SEARCH_CONTENT}/${search}`, {
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json",
        //   "Authorization": `Bearer ${_token}`
        // },
      });
      if (!res.ok) {
        const err = await res.json();
        errorToast(err.msg)
        return null
      }
      const result = await res.json();
      // successToast("Fetched successfully")
      return result.data
    } catch (error:any) {
      errorToast(error.toString())
      console.log("error", JSON.stringify(error));
      return null
    }
  };

  export const getContentByCreatorIdApi = async (id:string) => {
    try {
      const res = await fetch(`${GET_CONTENT_BY_CREATOR_ID}/${id}`, {
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json",
        //   "Authorization": `Bearer ${_token}`
        // },
      });
      if (!res.ok) {
        const err = await res.json();
        errorToast(err.msg)
        return []
      }
      const result = await res.json();
      // successToast("Fetched successfully")
      return result.data
    } catch (error:any) {
      errorToast(error.toString())
      console.log("error", JSON.stringify(error));
      return []
    }
  };