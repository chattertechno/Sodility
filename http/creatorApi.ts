import { baseUrl } from "./index";
import { errorToast, successToast } from "../helper/toster";
import { getLocaleData } from "@/service/localStorageService";
const SEARCH_CREATOR =`${baseUrl}/creator/search`;
const GET_CREATOR_BY_ID =`${baseUrl}/user`;
const GET_CREATOR_BY_CATEGORY =`${baseUrl}/creator/get/category`;
const FOLLOW_CREATOR = `${baseUrl}/creator/follow`;
const UN_FOLLOW_CREATOR = `${baseUrl}/creator/unfollow`;
const GET_CREATOR_FOLLOWERS = `${baseUrl}/creator`;
const token = getLocaleData("token");

export const searchCreatorApi = async (search:string, limit: number) => {
    try {
      const res = await fetch(`${SEARCH_CREATOR}?search=${search}&limit=${limit}`, {
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

export const getCreatorByCategoryApi = async (category:string) => {
  try {
    const res = await fetch(`${GET_CREATOR_BY_CATEGORY}/${category}`, {
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

export const followACreator = async (userId:string) => {
  try {
    const res = await fetch(`${FOLLOW_CREATOR}/${userId}`, {
      method: "POST",
      headers: {
        'Authorization' : `Bearer ${token}`
      }
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

export const UnfollowACreator = async (userId:string) => {
  try {
    const res = await fetch(`${UN_FOLLOW_CREATOR}/${userId}`, {
      method: "DELETE",
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    });
    if (!res.ok) {
      const err = await res.json();
      console.log(err)
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

export const getCreatorFollowers = async (id:string) => {
  try {
    const res = await fetch(`${GET_CREATOR_FOLLOWERS}/${id}/followers/`, {
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


