"use client";
import { handleOnVerifyEmail } from '@/ServerActions/User';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setErrorMessage, setIsLoading, setMessage } from '@/redux/slice/AuthSlice';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'

const VerifyEmail = ({token}:{otp:string,token:string}) => {

    const loading = useAppSelector((state)=>state.AuthSlice.loading);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const otpRef = useRef<HTMLInputElement>(null);
    const errorMessage = useAppSelector((state)=>state.AuthSlice.errMessage);

    const handleOnVerify=async()=>{
      if(!otpRef.current?.value) return dispatch(setErrorMessage("Please Enter OTP"));
      dispatch(setErrorMessage(""));
              dispatch(setIsLoading(true));
        const res = await handleOnVerifyEmail(token,otpRef.current?.value);

        dispatch(setIsLoading(false));
      
        dispatch(setMessage({msg:res.message,type:res.statusCode==201?"success":"error",open:true}))
        if(res.statusCode==201){
          setTimeout(() => {
            router.replace(`/api/auth/signin`);
          }, 2000);
     
      }else{
        dispatch(setErrorMessage(res.message));
      }

   
  
      

    }
  return (
    <div className="min-h-screen flex items-center justify-center">
    <div className="bg-transparent border border-gray-600 rounded-lg shadow-md p-8 max-w-sm w-full">
      <h2 className="text-2xl font-semibold text-gray-300  mb-4">
        Verify OTP
      </h2>
      <form>
        <div className="my-4">
          <label htmlFor="otp" className="block  text-gray-300">
           <span className='text-green-500'> Check your email</span>, We have sent you a verification code.Code will be expired in 5 min.
          </label>
          <input
            type="number"
          ref={otpRef}
            id="otp"
            name="otp"
            className="w-full border text-white rounded-md py-2 px-3 bg-gray-800"
          />
        
        </div>
        {errorMessage && errorMessage.length>0 && <span className='my-2 text-red-500'>
          {errorMessage}
          </span>}

        <button
            onClick={handleOnVerify}
            disabled={loading}
            className="text-white flex items-center justify-center focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-green-800"
          >
             {loading?<div role="status">
    <svg aria-hidden="true" className="w-8 h-8 mr-2  animate-spin text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>:"Verify"}
          </button>
      </form>
    </div>
  </div>
  )
}

export default VerifyEmail