"use client";
import { Controller, useForm } from 'react-hook-form';
import {registerApi} from '../../http'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { errorToast, successToast} from '@/helper/toster';
import { getLocaleData } from "../../service/localStorageService";
import { getDashAccount, getMnemonic } from '../utils'
import PasswordStrengthBar from 'react-password-strength-bar'
import { Modal } from "../../components/shared";

// ==========================================================
// LOGIN PAGE COMPONENT =================================
// ==========================================================
export default function Register() {
  const [userType , setUserType] = useState("")
  const router = useRouter();
  const { control,register, handleSubmit, getValues,  formState:{ errors } } = useForm();
  const [loading, setLoading] = useState(false)
  const [accountInfo, setAccountInfo] = useState<any>({})
  const [isAccountCreated, setAccountCreated] = useState(false)
  const [password , setPassword] = useState("")
  const [passowordStrength , setPassowordStrength] = useState(0)
  const [showModal , setShowModal] = useState(false)
  const [mnemonicPhrase , setMnemonic] = useState("")
  useEffect(() => {
    const mnemonic = getMnemonic()
    getDashAccount(mnemonic || null)
      .then((account) => {
        setAccountInfo(account)
        const {
          mnemonic:any,
          balance: { confirmed: balance },
        } = account
        setMnemonic(account.mnemonic || "")
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userType])

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userType])

  const onSubmit = (data:any) => {
    console.log(data)
    setLoading(true)
    console.log({data})
    if(data.password!=data.confirmpassword){
      errorToast("Confirm password doesn't match with the Password")
      setLoading(false)
      return
    }
    if(data.username.length>20){
      errorToast("Username must not be greater than 20 characters")
      setLoading(false)
      return
    }
    console.log({passowordStrength})
    if(passowordStrength<2){
      errorToast("Password is weak")
      setLoading(false)
      return
    }
    data.dash=accountInfo?.address
    registerApi(data).then((result)=>{
      setLoading(false)
      if(result){
        setShowModal(true)     
      }else{
        console.log("RESULT",result)
      }
    })
  };

  if(userType=="creator" || userType=="supporter") return <></>
  return (
    <>
      <div className="h-full mt-3  bg-white-200  flex items-center  align-middle w-full justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white-500 shadow-xl shadow-gray-500/20  border w-1/3 h-3/6 border-gray-400 rounded-md mt-5 px-4 pt-4 pb-8">
        <div className='flex justify-center  font-medium text-2xl  mb-2'>Registration</div>
        <h4 >Your Dash Address is:<div className='font-bold text-blue-500'>{accountInfo?.address}</div></h4>
            <hr className='my-2 border-black-500 border'/>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700  font-medium mb-2">
              Username
            </label>
            <input
              autoComplete="off"
              id="username"
              type="username"
              placeholder="Username"
              className={`shadow w-full border border-gray-300 hover:shadow-lg hover:shadow-gray-500/20 font-small  text-black px-3 py-3 rounded-md  leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-lg focus:shadow-gray-500/20
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
          <label htmlFor="role" className="block text-gray-700  font-medium mb-2">Select a Role:</label>
          <Controller
            name="role"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <select
              className={`shadow w-full border border-gray-300 hover:shadow-lg hover:shadow-gray-500/20 font-small  text-black px-3 py-3 rounded-md  leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-lg focus:shadow-gray-500/20
              ${
                (errors&&errors.role) ? 'border-red-500' : ''
              }`}
              {...field}>
                <option value="">Select a Role</option>
                <option value="creator">Creator</option>
                <option value="supporter">Supporter</option>
              </select>
            )}
            />
            {  errors?.role && (
              <p className="text-red-500 text-xs italic">Please enter an role</p>
            )}
            {/* <label htmlFor="role" className="block text-gray-700  font-medium mb-2">
              Role
            </label>
            <select
              autoComplete="off"
              id="role"
              placeholder="Role"
              className={`shadow w-full border border-gray-300 hover:shadow-lg hover:shadow-gray-500/20 font-small  text-black px-3 py-3 rounded-md  leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-lg focus:shadow-gray-500/20
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
            )} */}
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
              className={`shadow w-full border border-gray-300 hover:shadow-lg hover:shadow-gray-500/20 font-small  text-black px-3 py-3 rounded-md  leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-lg focus:shadow-gray-500/20
                ${(errors.password) ? 'border-red-500' : ''
              }`}
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">Please enter a password</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmpassword" className="block text-gray-700  font-medium mb-2">
              Confirm Password
            </label>
            <input
              autoComplete="off"
              id="confirmpassword"
              type="password"
              placeholder="Confirm Password"
              className={`shadow w-full border border-gray-300 hover:shadow-lg hover:shadow-gray-500/20 font-small  text-black px-3 py-3 rounded-md  leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-lg focus:shadow-gray-500/20
                ${(errors.confirmpassword) ? 'border-red-500' : ''
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
                      minLength={6}
                      onChangeScore={(score)=>setPassowordStrength(score)}
                    />
          <div className="mb-4 pt-3">
            <button
              type="submit"
              className={ `text-white font-bold py-2 px-4 rounded w-full ${loading?"bg-blue-200":"bg-primary hover:bg-blue-500  rounded text-white font-bold py-2 hover:shadow-blue-500 hover:shadow-md focus:outline-none focus:bg-primary focus:shadow-outline"}`}
            >
              Create
            </button>
          </div>
          
        </form>
      </div>
      {showModal && (
        <Modal
        >
          <div>
            <h1>Back up mnemonic phrase </h1>
            <hr className='my-3'/>
            <p>Write down or copy these words in the right order and keep them in a safe place. You are advised to write them down</p>
            <p className='mt-3 font-bold text-blue-500'>{mnemonicPhrase}</p>
            <button
              type="submit"
              className={"text-white font-bold mt-4 py-2 px-4 rounded w-full bg-primary hover:bg-blue-500  rounded text-white font-bold py-2 hover:shadow-blue-500 hover:shadow-md focus:outline-none focus:bg-primary focus:shadow-outline"}
              onClick={()=>{
                navigator.clipboard.writeText(mnemonicPhrase)
                router.push("/login")
              }}
            >
              Copy
            </button>
            </div>      
        </Modal>
      )}
    </>
  );
}
