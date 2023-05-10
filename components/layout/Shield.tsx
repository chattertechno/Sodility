"use client";

const allAccess = ["/", "/search", "/explore", "/about"]
const auth = ["/profile"]
const creator = ["/creator-creator"]
const creatorAll = ["/dashboard", ...creator, ...allAccess, ...auth]
const dynamicRouteForCreator = ["/creator-creator", "/explore"]
const supporter = ["/supporter"]
const supporterAll = ["/creator", ...supporter,...allAccess, ...auth]
const dynamicRouteForSupporter = ["/creator", "/explore"]
const unAuth = ["/login", "/register"]
const unAuthAll = ["/creator", ...unAuth, ...allAccess]
const Shield = ({children,role,pathname}:any) => {

    const call = (role:string, path:string)=>{
        let permisson = false
        if(role == "creator" ){
            if(creatorAll.includes(path) ){
                permisson = true
            }else if(dynamicRouteForCreator.find((itm)=>(path.startsWith(itm)))){
                permisson = true
            }else if(supporter.includes(path)){
                console.log("not found supporter")
            }else if(unAuth.includes(path)){
                console.log("/dashboard")
            }else{
                console.log("no rout match")
            }
    
        }else if(role == "supporter"){
            if(supporterAll.includes(path) ){
                permisson = true
            }else if( !creator.find((itm)=>(path.startsWith(itm)))&&dynamicRouteForSupporter.find((itm)=>(path.startsWith(itm)))){
                permisson = true
            }else if(creator.includes(path)){
                console.log("not found creator")
            }else if(unAuth.includes(path)){
                console.log("/supported")
            }else{
                console.log("no rout match")
            }
        }else {
            if(unAuthAll.includes(path)){
                permisson = true
            }else if(!creator.find((itm)=>(path.startsWith(itm)))&&dynamicRouteForSupporter.find((itm)=>(path.startsWith(itm)))){
                permisson = true
            }else if(auth.includes(path)){
                console.log("unothorize")
            }else if(creator.includes(path)){
                console.log("unothorize")
            }else if(supporter.includes(path)){
                console.log("unothorize")
            }else{
                console.log("no rout found")
            }
        }
    
        return permisson
    
    }

    if(!call(role,pathname)) return <>Loading</>
  return (
    <>
      {children}
    </>
  );
};

export default Shield;
