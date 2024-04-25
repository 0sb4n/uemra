"use client"
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { ReactTyped} from "react-typed";

const Owais = () => {
  return (
    <div className='flex-1 bg-[#fdd5c8]'>
      <h3 className='font-bold text-3xl text-pink-700 mt-2'>
        UEMRA i really &nbsp;
        <ReactTyped
        strings={[' Love You 🥰',
          ' Miss you 😔',
          ' Waiting for You'
          
        ]}
        typeSpeed={100}
        backSpeed={60}
        loop
         className='text-3xl font-bold text-yellow-500 '
        />

      </h3>
      <div className='py-4'>
< ReactTyped
strings={[
"I really Love You UEMRA",
"UEMRA, your Grace and Charm Captivate My soul",
"In your Eyes ,I Find a Home, where Love Takes Control",
"Let's Write Our story, With Each Chapter filled With Delight",
"Forever Together, Our Love Shining Bright"

]}
typeSpeed={120}
backSpeed={100}
loop
className='text-3xl mt-0 font-bold text-pink-700'
/>

      </div>
      </div>
  )
}

export default Owais