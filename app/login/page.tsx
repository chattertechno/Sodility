"use client";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import {signInApi} from '../../http'
import Link from 'next/link';
import { errorToast } from "../../helper/toster";
import { useRouter } from "next/navigation";
import { getLocaleData, removeLocaleData } from "../../service/authService";



// ==========================================================
// LOGIN PAGE COMPONENT =================================
// ==========================================================
export default function Login() {
  const [userType , setUserType] = useState("")
  const route = useRouter()
  const { register, handleSubmit,  formState:{ errors } } = useForm();
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    const data = getLocaleData("user") as any
    if(data) {
      if(data?.role=="creator"){
        setUserType("creator")
        route.push("/dashboard")
      }else if(data?.role=="supporter"){
        setUserType("supporter")
        route.push("/supporter")
      }else{
        errorToast("invalid role")
        route.push("/")
      }
    }
    else if(!data){
      if(userType){
        setUserType("")
      }
      }
  },[userType])
  //
  const onSubmit = (data:any) => {
    setLoading(true)
    signInApi(data).then((result)=>{
      if(!result){
        setLoading(false)
        // errorToast("erro")
        return
      }
      setLoading(false)
      if(result?.user?.role == "supporter") {
        if(typeof window !== "undefined")
          window.location.href = '/supporter';
        // router.push("/supporter")
      }
      else if(result?.user?.role == "creator") {
        // router.push("/dashboard")
        if(typeof window !== "undefined")
          window.location.href = '/dashboard';
      }else{
        errorToast("invalid role")
        removeLocaleData("token")
        removeLocaleData("user")
      }
      
    })
  };
  if(userType=="creator" || userType=="supporter") return <></>
  return (
    <>
    
      <div className="h-full mt-5  bg-white-200  flex items-center  align-middle w-full justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="  bg-white-500 shadow-xl shadow-gray-500/20  border w-96 h-3/6 border-gray-400 rounded-md mt-5 px-4 pt-4 pb-8">
          <div className='flex justify-center  font-medium text-2xl  mb-4'>Login</div>
          <div className="mb-4  " >
            <label htmlFor="username" className=" block text-gray-700  font-medium mb-2">
              Email
            </label>
            <input
            
              autoComplete="off"
              id="username"
              type="username"
              placeholder="Email"
              className={` shadow  border w-full border border-gray-300 hover:shadow-lg hover:shadow-gray-500/20 font-small  text-black px-3 py-3 rounded-md  leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-lg focus:shadow-gray-500/20 
              ${
                (errors&&errors.username) ? 'border-red-500' : ''
              }
              `}
              {...register("username", { required: true })}
            />
            {  errors.username && (
              <p className="text-red-500 text-xs italic">Please enter an email</p>
            )}
          </div>
          <div className="mb-4 shadow-sm ">
            <label htmlFor="password" className="block block text-gray-700  font-medium mb-2 ">
              Password
            </label>
            <input
              autoComplete="off"
              id="password"
              type="password"
              placeholder="Password"
              className={`shadow appearance-none border border-gray-300 hover:shadow-lg hover:shadow-gray-500/20 rounded-md w-full py-3 px-3  leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-lg focus:shadow-gray-500/20 
                ${(errors.password) ? 'border-red-500' : ''
              }`}
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">Please enter a password</p>
            )}
          </div>
          <div className=" pt-4 flex justify-center ">
            <button
              disabled={loading}
              type="submit"
              // className={`${loading?"bg-blue-200 text-white font-bold py-2 px-4 rounded":"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"}`}
              className={`font-bold py-2 w-full  text-white rounded  ${loading?"bg-blue-200 " : "bg-primary hover:bg-blue-500  hover:shadow-blue-500 hover:shadow-md focus:outline-none focus:bg-primary focus:shadow-outline"}`}
            >
              Sign In
            </button>
          </div>
          <div className="mb-4 pt-2 flex justify-center ">
            <Link
              
              href='/register'
              className="bg-gray-400 hover:bg-gray-500 text-center btn rounded text-white font-bold w-full py-2 hover:shadow-gray-500 hover:shadow-md focus:outline-none focus:bg-gray-400 focus:shadow-outline"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}