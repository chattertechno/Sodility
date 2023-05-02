export const getLocaleData = (key:string) => {
  const user = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
  return user ? JSON.parse(user) : null;
};

export const setLocaleData = (key:string,data:any) => {
    if(typeof window !== "undefined")
      window.localStorage.setItem(key,JSON.stringify(data))
  };

  export const removeLocaleData = (key:string) => {
    if(typeof window !== "undefined")
       window.localStorage.removeItem(key)
  };


