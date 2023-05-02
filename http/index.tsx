import { errorToast,successToast } from "../helper/toster";
const baseUrl = `https://sodality-api.herokuapp.com/api/v1`;
const LOGIN = `${baseUrl}/user/login`;
const REGISTER = `${baseUrl}/user/register`;
const GET_PROFILE =`${baseUrl}/user/profile/`
const UPDATE_PROFILE =`${baseUrl}/user/update`
import { getLocaleData, setLocaleData } from "../service/authService";

// ================================= CONTENT ======================================
const CREATE_CONTENT =`${baseUrl}/content/post`

const token = getLocaleData("token")

export const signInApi = async (data: any) => {
  try {
    const res = await fetch(LOGIN, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
        const err = await res.json();
        throw err.msg;
      }
    const post = await res.json();
    const user = await getProfileApi(post.msg)

    setLocaleData("token", post.msg);
    setLocaleData("user", user);
    successToast("sign in successfully")
    return {token:post.msg,user}
  } catch (error:any) {
    errorToast(error.toString())
    console.log("error", error.toString());
    return null 
  }
};

export const registerApi = async (data: any) => {
  try {
    const res = await fetch(REGISTER, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw err.msg;
    }
    // const post = await res.json();
    successToast("Register successfully")
    return true
  } catch (error:any) {
    errorToast(error.toString())
    console.log("error", JSON.stringify(error));
    return false
  }
};

export const getProfileApi = async (_token:string) => {
  try {
    const res = await fetch(GET_PROFILE, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${_token}`
      },
    });
    if (!res.ok) {
      const err = await res.json();
      throw err.msg;
    }
    const result = await res.json();
    // successToast("Fetched successfully")
    return result.data
  } catch (error:any) {
    errorToast(error.toString())
    console.log("error", JSON.stringify(error));
  }
};

export const updateProfileApi = async (_token:string,data: any) => {
  try {
    const res = await fetch(UPDATE_PROFILE, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${_token}`
      },
    });
    if (!res.ok) {
        const err = await res.json();
        throw err.msg;
      }
      const post = await res.json();
      const user = await getProfileApi(post.msg)
      setLocaleData("token", post.msg);
      setLocaleData("user", user.data);
      successToast("updated successfully")
    return user.data
  } catch (error:any) {
    errorToast(error.toString())
    console.log("error", error);
  }
};

// =================================== ontent ================================================


export const contentApi = async (_token:string , data: any) => {
  try {
    const res = await fetch(CREATE_CONTENT, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${_token}`
      },
    });
    if (!res.ok) {
      const err = await res.json();
      throw err.msg;
    }
    // const post = await res.json();
    return true
  } catch (error:any) {
    errorToast(error.toString())
    console.log("error", JSON.stringify(error));
  }
};