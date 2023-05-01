const baseUrl = `https://sodality-api.herokuapp.com/api/v1`;
const LOGIN = `${baseUrl}/user/login`;
const REGISTER = `${baseUrl}/user/register`;
const GET_PROFILE =`${baseUrl}/user/profile/`
const UPDATE_PROFILE =`${baseUrl}/user/update`

// ================================= CONTENT ======================================
const CREATE_CONTENT =`${baseUrl}/content/post`

const token = localStorage.getItem("token")

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
    localStorage.setItem("token", post.msg);
    localStorage.setItem("user", JSON.stringify(user.data));
    return {token:post.msg,user:user.data}
  } catch (error) {
    alert(error)
    console.log("error", error);
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
    return true
  } catch (error) {
    alert(error)
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
    return result
  } catch (error) {
    alert(error)
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
      localStorage.setItem("token", post.msg);
      localStorage.setItem("user", JSON.stringify(user.data));
    return user.data
  } catch (error) {
    alert(error)
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
  } catch (error) {
    alert(error)
    console.log("error", JSON.stringify(error));
  }
};