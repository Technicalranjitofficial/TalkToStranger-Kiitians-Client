import React from 'react'

const EmailFallBack = ({msg}:{msg:string}) => {
  return (
    <div className='flex flex-col text-white justify-center items-center'>
   <p className='mt-2'>{msg}</p>
   </div>
  )
}

export default EmailFallBack