import EmailFallBack from '@/components/EmailFallBack';
import VerifyEmail from '@/components/VerifyEmail';
import VerifyingEmail from '@/components/VerifyingEmail';
import React, { Suspense } from 'react'


export interface PageProps{
  // searchParams: { [key: string]: string | string[] | undefined },
  
  searchParams:{
        token:string,
        otpMode:string,
        otp?:string
    }
}
const page = (props:PageProps) => {

  

  if(!props.searchParams.token) throw new Error("Unauthorized Access");
  if(props.searchParams.otpMode==="false")
  {
    if(!props.searchParams.otp) throw new Error("Unauthorized Access Invalid Otp");
    return <div className="h-full flex items-center justify-center">
    <div className="bg-transparent border border-gray-600 rounded-lg shadow-md p-8 max-w-sm w-full">
      <h2 className="text-2xl font-semibold text-gray-300  mb-4">
        Verifying Your Account
      </h2>
     <Suspense fallback={<EmailFallBack msg='Please Wait while we are verifying your account' />}>
     <VerifyingEmail otp={props.searchParams.otp} token={props.searchParams.token} />
     </Suspense>
    </div>
  </div>
  }

  return (
    <VerifyEmail otp={`${props.searchParams.otp}`} token={props.searchParams.token}/>
  )

}

export default page