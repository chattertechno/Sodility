"use client";
import { useForm } from 'react-hook-form';
import {registerApi} from '../../http'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Console } from 'console';
// ==========================================================
// LOGIN PAGE COMPONENT =================================
// ==========================================================
export default function Register() {
  const router = useRouter();
  const { register, handleSubmit,  formState:{ errors } } = useForm();
  const [loading, setLoading] = useState(false)

  const onSubmit = (data:any) => {
    setLoading(true)
    registerApi(data).then((result)=>{
      setLoading(false)
      if(result)router.push("/login")
    })
  };
  return (
    <>
      <div className="h-full mt-5  bg-white-200  flex items-center  align-middle w-full justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white-500 shadow-xl shadow-gray-500/20  border w-96 h-3/6 border-gray-400 rounded-md mt-5 px-4 pt-4 pb-8">
        <div className='flex justify-center  font-medium text-2xl  mb-4'>Registeration</div>
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
            <input
              autoComplete="off"
              id="role"
              type="role"
              placeholder="Role"
              className={`shadow  border w-full border border-gray-300 hover:shadow-lg hover:shadow-gray-500/20 font-small  text-black px-3 py-3 rounded-md  leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-lg focus:shadow-gray-500/20
              ${
                (errors&&errors.role) ? 'border-red-500' : ''
              }
              `}
              {...register("role", { required: true })}
            />
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
            <label htmlFor="dash" className="block text-gray-700  font-medium mb-2">
              Dash
            </label>
            <input
              autoComplete="off"
              id="dash"
              type="dash"
              placeholder="Dash"
              className={`shadow  border w-full border border-gray-300 hover:shadow-lg hover:shadow-gray-500/20 font-small  text-black px-3 py-3 rounded-md  leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-lg focus:shadow-gray-500/20
              ${
                (errors&&errors.dash) ? 'border-red-500' : ''
              }
              `}
              {...register("dash", { required: true })}
            />
            {  errors.dash && (
              <p className="text-red-500 text-xs italic">Please enter an dash</p>
            )}
          </div>
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
