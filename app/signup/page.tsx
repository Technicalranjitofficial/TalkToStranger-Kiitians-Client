
"use client";
import { TSignUpSchema, signupSchema } from "@/utils/zod/zod";
import React from "react";

import {SubmitHandler, useForm} from "react-hook-form";

import {zodResolver} from "@hookform/resolvers/zod";
import { signup } from "@/ServerActions/User";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsLoading, setMessage } from "@/redux/slice/AuthSlice";
import { redirect } from 'next/navigation'



const statusCodeMessage ={
    "201":"Account Created Successfully!",
    "500":"Internal Server Error!",
    "409":"Already Exist Email!"
}

const page = () => {



    const {
        handleSubmit,
        register,
        reset,
        formState:{errors},
        setError,

    } = useForm<TSignUpSchema>(
        {
            resolver:zodResolver(signupSchema)
        }
    )

    const dispatch = useAppDispatch();

    const loading = useAppSelector((state)=>state.AuthSlice.loading);



    const submit: SubmitHandler<TSignUpSchema> = async (data) => {
        console.log(data);

        dispatch(setIsLoading(true));
        const res = await signup(data);

        if (res.errors) {
            Object.keys(res.errors).map((key: string) => {
                setError(key as "email" | "password" | "confirmPassword", {
                    message: res.errors[key as keyof typeof res.errors],
                    type: "server",
                });
            });
        }else{
            if(res.status==201){
                reset();
            }
            dispatch(setMessage({msg:statusCodeMessage[res.status as unknown as "201" |"500" |"409"],type:res.status==201?"success":"error",open:true}))
        }

        dispatch(setIsLoading(false));

        
    };

  return (
    <main className="flex overflow-y-hidden gap-5 px-3 py-5 justify-center rounded-md   h-full z-50  flex-col mx-auto max-w-2xl">
      <div className=" border px-5 py-10 rounded-md  gap-5 flex flex-col border-slate-800">
        <div className=" ">
          <h1 className="text-white text-xl">Register and Start Chatting </h1>
        </div>
        <form  onSubmit={handleSubmit(submit)} className="text-red-500">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your name
            </label>
            <input
            {...register("name")}
              type="text"
              id="name"
              placeholder="Your name here.."
              className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
             {errors.name && (
            <span>
                {errors.name.message}
            </span>
        )}
          </div>
          <div className="mb-6 ">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
                {...register("email")}
              type="email"
              id="email"
              className=" text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="name@gmail.com"
              required
            />

            {errors.email && (
            <span>
                {errors.email.message}  
            </span>
        )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
                {...register("password")}
              type="password"
              id="password"
              placeholder="Password"
              className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />

            {errors.password && (
            <span>
                {errors.password.message}
            </span>
        )}


          </div>

          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <input
                {...register("confirmPassword")}
              type="password"
              id="confirm-password"
              className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm password"
              required
            />
                {errors.confirmPassword && (
            <span>
                {errors.confirmPassword.message}
            </span>
        )}

          </div>

         

          <button
            type="submit"
            disabled={loading}
            className="text-white flex items-center justify-center focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-green-600 hover:bg-green-700 focus:ring-green-800"
          >
             {loading?<div role="status">
    <svg aria-hidden="true" className="w-8 h-8 mr-2  animate-spin text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>:"Register"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default page;
