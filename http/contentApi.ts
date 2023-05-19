import { ADD_POST, SEARCH_CONTENT,baseUrl } from "./index";
import { errorToast, successToast } from "../helper/toster";
const GET_CONTENT_BY_CREATOR_ID = `${baseUrl}/creator/all/content`
const UPLOAD_CONTENT = 'http://18.117.99.208:3000/api/v1/file/upload';
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
      if (!res.ok) {
        const err = await res.json();
        errorToast(err.msg)
        return false
      }
      successToast("Post has been created successfully")
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
      if(!result.data) return []
      else return result.data
    } catch (error:any) {
      errorToast(error.toString())
      console.log("error", JSON.stringify(error));
      return []
    }
  };

  export const UploadContentForPost = async (file: any, token: string) => {
    try {
      const res = await fetch(`${UPLOAD_CONTENT}`, {
        method: "POST",
        body: file,
        headers: {
          "Authorization": `Bearer ${token}`,
          "mode": "no-cors",
        },
      });
  
      if (!res.ok) {
        const err = await res.json();
        errorToast(err.msg);
        return [];
      }
  
      try {
        const result = await res.json();
        if (!result.data) return [];
        else return result.data;
      } catch (error) {
        console.log("Invalid JSON response:", error);
        return [];
      }
    } catch (error: any) {
      errorToast(error.toString());
      console.log("error", JSON.stringify(error));
      return [];
    }
  };