import React, { Suspense } from 'react'
import EmailFallBack from '@/components/EmailFallBack';
import VerifyEmail from '@/components/VerifyEmail';
import VerifyingEmail from '@/components/VerifyingEmail';
import VerifyingToken from '@/components/VerifyingToken';


const page = ({params}:{params:{token:string}}) => {

  if(!params.token) throw new Error("Unauthorized Access");

    return <div className="min-h-screen flex items-center justify-center">
    <div className="bg-transparent border border-gray-600 rounded-lg shadow-md p-8 max-w-sm w-full">
      <h2 className="text-2xl font-semibold text-gray-300  mb-4">
        Verifying Your Account
      </h2>
     <Suspense fallback={<EmailFallBack msg='Please Wait while we are verifying your account' />}>
     <VerifyingToken token={params.token} />
     </Suspense>
     
      
    </div>
  </div>
  }

  



export default page