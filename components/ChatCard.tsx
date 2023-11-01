import { Message } from '@/redux/slice/SocketSlice'
import { Merriweather, Montserrat, Roboto } from 'next/font/google'
import React from 'react'

const roboto = Merriweather({
    weight: '900',
    subsets:['cyrillic']
  })
  const montSerrat = Montserrat({
    weight: '500',
    subsets:['cyrillic']
  })

const ChatCard = ({message}:{message:Message}) => {
  return (
    <div className={` ${message.isSender?"justify-end":""} mt-5 h-auto flex `}>
       <div className='w-auto min-w-[100px] py-3 px-5 rounded-md bg-transparent border border-gray-800 flex flex-col '>
       <div>
            <h1 style={roboto.style} className='text-gray-400'>{message.isSender?"Me":"Stranger"}</h1>

        </div>
        <div>
            <h1 style={montSerrat.style} className='text-gray-400 mt-1'>
                {message.message}
                </h1>
            </div>

       </div>
    </div>
  )
}

export default ChatCard