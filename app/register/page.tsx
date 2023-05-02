"use client";
import { useForm } from 'react-hook-form';
import {registerApi} from '../../http'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { errorToast, successToast} from '@/helper/toster';
import { getLocaleData } from "../../service/authService";
import { getDashAccount, getMnemonic } from '../utils'
import PasswordStrengthBar from 'react-password-strength-bar'

// ==========================================================
// LOGIN PAGE COMPONENT =================================
// ==========================================================
export default function Register() {
  const [userType , setUserType] = useState("")
  const router = useRouter();
  const { register, handleSubmit, getValues, formState:{ errors } } = useForm();
  const [loading, setLoading] = useState(false)
  const [accountInfo, setAccountInfo] = useState<any>({})
  const [isAccountCreated, setAccountCreated] = useState(false)
  const [password , setPassword] = useState("")

  useEffect(() => {
    const mnemonic = getMnemonic()
    getDashAccount(mnemonic || null)
      .then((account) => {
        setAccountInfo(account)
        const {
          mnemonic:any,
          balance: { confirmed: balance },
        } = account
        if (balance === 0) {
          successToast(`Please charge your account`)
        }
        localStorage.setItem('mnemonic', mnemonic || "")
        setAccountCreated(true)
      })
      .catch((e) => {
        errorToast(e.toString())
      })
  }, [])
  useEffect(()=>{
    const data = getLocaleData("user") as any
    if(data) {
      if(data?.role=="creator"){
        setUserType("creator")
        router.push("/dashboard")
      }else if(data?.role=="supporter"){
        setUserType("supporter")
        router.push("/supporter")
      }else{
        errorToast("invalid role")
        router.push("/")
      }
    }
    else if(!data){
      if(userType){
        setUserType("")
      }
      }
  },[userType])

  const onSubmit = (data:any) => {
    setLoading(true)
    if(data.password!=data.confirmpassword){
      errorToast("Confirm password doesn't match with the Password")
      return
    }
    registerApi(data).then((result)=>{
      setLoading(false)
      if(result)router.push("/login")
    })
  };

  if(userType=="creator" || userType=="supporter") return <></>
  return (
    <>
      <div className="h-full mt-5  bg-white-200  flex items-center  align-middle w-full justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white-500 shadow-xl shadow-gray-500/20  border w-96 h-3/6 border-gray-400 rounded-md mt-5 px-4 pt-4 pb-8">
        <div className='flex justify-center  font-medium text-2xl  mb-4'>Registeration</div>
        <h4>Your Dash Address is</h4>
            <div>{accountInfo?.address}</div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700  font-medium mb-2">
              Email
            </label>
            <input
              autoComplete="off"
              id="username"
              type="username"
              placeholder="Email"
              className={`shadow  border w-full border border-gray-300 hover:shadow-lg hover:shadow-gray-500/20 font-small  text-black px-3 py-3 rounded-md  leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-lg focus:shadow-gray-500/20
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
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700  font-medium mb-2">
              Role
            </label>
            <select
              autoComplete="off"
              id="role"
              placeholder="Role"
              className={`shadow  border w-full border border-gray-300 hover:shadow-lg hover:shadow-gray-500/20 font-small  text-black px-3 py-3 rounded-md  leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-lg focus:shadow-gray-500/20
              ${
                (errors&&errors.role) ? 'border-red-500' : ''
              }
              `}
              {...register("role", { required: true })}
            >
              <option value="creator">Creator</option>
              <option value="supporter">Supporter</option>
            </select>
            {  errors.role && (
              <p className="text-red-500 text-xs italic">Please enter an role</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700  font-medium mb-2">
              Password
            </label>
            <input
              autoComplete="off"
              id="password"
              type="password"
              placeholder="Password"
              onInput={(e:any)=>{
                setPassword(e.target.value)}
              }
              className={`shadow  border w-full border border-gray-300 hover:shadow-lg hover:shadow-gray-500/20 font-small  text-black px-3 py-3 rounded-md  leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-lg focus:shadow-gray-500/20
                ${(errors.password) ? 'border-red-500' : ''
              }`}
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">Please enter a password</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700  font-medium mb-2">
              Confirm Password
            </label>
            <input
              autoComplete="off"
              id="confirmpassword"
              type="password"
              placeholder="Confirm Password"
              className={`shadow  border w-full border border-gray-300 hover:shadow-lg hover:shadow-gray-500/20 font-small  text-black px-3 py-3 rounded-md  leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-lg focus:shadow-gray-500/20
                ${(errors.password) ? 'border-red-500' : ''
              }`}
              {...register("confirmpassword", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">Please enter a password</p>
            )}
          </div>
          <PasswordStrengthBar
                      style={{ marginTop: 12 }}
                      password={getValues('password')}
                    />
          <div className="mb-4 pt-3">
            <button
              type="submit"
              className={ `text-white font-bold py-2 px-4 rounded w-full ${loading?"bg-blue-200":"bg-primary hover:bg-blue-500  rounded text-white font-bold py-2 hover:shadow-blue-500 hover:shadow-md focus:outline-none focus:bg-primary focus:shadow-outline"}`}
            >
              Register
            </button>
          </div>
          
        </form>
      </div>
    </>
  );
}
