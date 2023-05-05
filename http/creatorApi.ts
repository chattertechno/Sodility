import { baseUrl } from "./index";
import { errorToast, successToast } from "../helper/toster";
const SEARCH_CREATOR =`${baseUrl}/creator`
const GET_CREATOR_BY_ID =`${baseUrl}/user`

export const searchCreatorApi = async (search:string) => {
    try {
      const res = await fetch(`${SEARCH_CREATOR}/${search}`, {
        method: "GET",
      });
      if (!res.ok) {
        const err = await res.json();
        errorToast(err.msg)
        return []
      }
      const result = await res.json();
      return result.data
    } catch (error:any) {
      errorToast(error.toString())
      console.log("error", JSON.stringify(error));
      return []
    }
};

export const getCreatorByIdApi = async (id:string) => {
  try {
    const res = await fetch(`${GET_CREATOR_BY_ID}/${id}`, {
      method: "GET",
    });
    if (!res.ok) {
      const err = await res.json();
      errorToast(err.msg)
      return null
    }
    const result = await res.json();
    return result.data
  } catch (error:any) {
    errorToast(error.toString())
    console.log("error", JSON.stringify(error));
    return null
  }
};