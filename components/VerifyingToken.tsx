import { hadleOnVerifyToken, handleOnVerifyEmail } from '@/ServerActions/User'
import { redirect } from 'next/navigation';

import React from 'react'

const VerifyingToken = async({token}:{token:string}) => {

    const response =await hadleOnVerifyToken(token);
    if(response.statusCode===200){
        redirect(`/reset/${token}/setnewpassword`);
    }
    
  return (
   <div className='flex flex-col justify-center items-center text-white'>

   
   <p>{(await response).message}</p>

   </div>
  )
}

export default VerifyingToken