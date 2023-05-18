import { ADD_POST, SEARCH_CONTENT } from "./index";
import { errorToast, successToast } from "../helper/toster";
import { baseUrl } from "./index";

const AUTH_GENRATE_URL =`${baseUrl}/auth/generate`
const VERIFY_OTP_URL =`${baseUrl}/auth/verify`
const UPDATE_2FA =`${baseUrl}/auth/2fa/update`
// =================================== Security Api ================================================


export const getGenerateUrlApi = async (_token:string) => {
  try {
    const res = await fetch(AUTH_GENRATE_URL, {
      method: "POST",
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

export const PostVarifyOTPApi = async (_token:string,data:any) => {
  try {
    const res = await fetch(VERIFY_OTP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${_token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json();
      throw err.msg;
      return false
    }
    const result = await res.json();
    const update2fa = await update2FAApi(_token)
    if (update2fa) {
      successToast("Verify successfully")
    }
    return result.data
  } catch (error:any) {
    errorToast(error.toString())
    console.log("error", JSON.stringify(error));
    return false
  }
};

export const update2FAApi = async (_token:string) => {
  try {
    const res = await fetch(UPDATE_2FA, {
      method: "PUT",
      body: JSON.stringify({
        "otp_enabled": true
    }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${_token}`
      },
    });
    if (!res.ok) {
        const err = await res.json();
        errorToast(err.toString())
        return false
      }
      const update = await res.json();
    return true
  } catch (error:any) {
    errorToast(error.toString())
    console.log("error", error);
    return false
  }
};