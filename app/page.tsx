import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <main className='text-white h-full w-full  flex justify-center items-center'>
      <Link className='px-10 py-2 bg-transparent border border-gray-800' href="/chat">Goto Chat Page</Link>
    </main>
  )
}

export default page