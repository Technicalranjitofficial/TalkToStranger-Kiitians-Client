import { handleOnVerifyEmail } from '@/ServerActions/User'
import React from 'react'

const SetNewPassword = async({token}:{token:string}) => {

    // const response =await handleOnVerifyEmail(token);
    
  return (
   <div className='flex flex-col justify-center items-center text-white'>

   
   {/* <p>{(await response).message}</p> */}

   </div>
  )
}

export default SetNewPassword