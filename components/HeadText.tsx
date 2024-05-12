import React from 'react'
import { ReactTyped } from 'react-typed'

const HeadText = () => {
  return (
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
  )
}

export default HeadText