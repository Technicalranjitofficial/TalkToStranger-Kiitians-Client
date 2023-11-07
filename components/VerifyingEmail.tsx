import { handleOnVerifyEmail } from '@/ServerActions/User'
import React from 'react'

const VerifyingEmail = async({token,otp}:{token:string,otp:string}) => {

    const response =await handleOnVerifyEmail(token,otp);
    
  return (
   <div className='flex flex-col justify-center items-center text-white'>

   
   <p>{(await response).message}</p>

   </div>
  )
}

export default VerifyingEmail