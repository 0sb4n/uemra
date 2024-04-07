import React from 'react'

const Header = ({title,subtitle}:{title:string, subtitle?: string}) => {
  return (
    <>
    <section className='flex flex-col  p-4'>
<h2 className='text-pink-700 font-bold text-3xl'>{title}</h2>
{subtitle && <p className='text-xl font-semibold text-pink-600'>{subtitle}</p>}
</section>
    </>
  )
}

export default Header