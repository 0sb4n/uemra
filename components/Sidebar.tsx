"use client"
import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className=' hidden h-screen w-72 bg-white p-5 shadow-md shadow-purple-200/50 lg:flex'>
  <div className='flex size-full flex-col gap-4'>
  <Link href='/' className='w-full  flex items-center justify-center'>
    <Image src="/assets/images/logo-1.png" alt='logo' className='object-contain ' width={125} height={10} />
  </Link>
  <nav className='h-full w-full flex-col justify-between md:flex md:gap-4'>
  <SignedIn>
 <ul className=' hidden w-full flex-col items-start gap-2 md:flex ' >
  {navLinks.slice(0,6).map((link)=>{
    
    const  isActive = link.route === pathname;
    return(
      <li key={link.label} className={`flex items-center justify-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover  transition-all  hover:shadow-inner overflow-hidden  hover:border-[1px] hover:border-pink-400`}>
        <Link href={link.route} className={`  font-semibold text-[16px] leading-[140%] flex size-full gap-4 p-[12px] ${isActive ? 'bg-pink-600  text-slate-200' : 'brightness-100 text-pink-600' } tracking-wider font-semibold hover:text-slate-400 `} >
          <Image src={link.icon} alt="icon" height={20} width={20} />
          {link.label}
        </Link>
      </li>
      )
    
  })}

 
  
    


   
 </ul>
  <ul className=' hidden w-full flex-col items-start gap-2 md:flex ' >
  {navLinks.slice(6,9).map((link)=>{
    
    const  isActive = link.route === pathname;
    return(
      <li key={link.label} className={` flex items-center justify-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover  transition-all  hover:shadow-inner overflow-hidden  hover:border-[1px] hover:border-pink-400`}>
      <Link href={link.route} className={`font-semibold text-[16px] leading-[140%] flex size-full gap-4 p-[12px] ${isActive ? 'bg-pink-600 text-slate-200' : ' text-pink-600' }  font-semibold`} >
        <Image src={link.icon} alt="icon" height={20} width={20} className='brightness-120' />
        {link.label}
      </Link>
    </li>
    )
  })}
   <li className=' w-full flex justify-center border-[1px] border-pink-400 rounded-full items-center cursor-pointer gap-2 p-4'>
<UserButton afterSignOutUrl='/' showName  />
  </li>
  </ul>
  </SignedIn>
   <SignedOut>
   <button className='w-full p-[0.8rem] bg-black text-white rounded-full font-semibold hover:bg-slate-800'>
    <Link href='/sign-in'>
Login    
    </Link>
   </button>
    
   </SignedOut>
   </nav>
   </div>
    </aside>
    
  )
}

export default Sidebar