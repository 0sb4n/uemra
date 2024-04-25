"use client";
import React from 'react'
import { useToast } from './ui/use-toast'
import {CldImage, CldUploadWidget} from "next-cloudinary"
import Image from 'next/image'
import { dataUrl, getImageSize } from '@/lib/utils'
// import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
type MediaUploaderProps = {
  onValueChange: (value: string) => void,
  setImage:React.Dispatch<any>
publicId:string;
image:any,
type:string
}
const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type
}:MediaUploaderProps) => {
    const {toast} = useToast();
const onUploadSuccessHandler=(result:any)=>{
  setImage((prevState:any)=>({
    ...prevState,
    publicId: result?.info?.public_id,
    width: result?.info?.width,
    height: result?.info?.height,
    secureUrl:result?.info?.secure_url

  }))
  onValueChange(result?.info?.public_id);
  toast({
    title:"image Uploaded SuccessFully",
    description:"1 credit was deducted from your account",
    duration:5000,
    className:'bg-pink-400'
  })
}
const onUploadErrorHandler=()=>{
  toast({
    title:"something went wrong",
    description:"please re-upload the image",
    duration:5000,
className:"bg-red-700"
  })

}
  return (
<CldUploadWidget
uploadPreset='zdisufwg'
options={{
  multiple:false,
  resourceType:"image"
}}
onSuccess={onUploadSuccessHandler}
onError={onUploadErrorHandler}
>
{({open})=>(
  <div className='flex flex-col gap-4 '>
<h3 className='text-3xl font-bold text-pink-700'>Original</h3>
{publicId ? (
<div className='cursor-pointer overflow-hidden rounded-[10px]'>
<CldImage 
width={getImageSize(type,image,"width")}
height={getImageSize(type,image,"height")}
src={publicId}
alt='image'
sizes={"(max-width:767px),100vw, 50vw"}
placeholder={dataUrl as PlaceholderValue}
className='h-fit min-h-72 w-full rounded-[10px] border border-dashed bg-purple-100/20 object-cover p-2'/>

</div>

) : (
<div className='justify-center items-center flex h-72 cursor-pointer flex-col gap-5 rounded-[16px] border border-dashed bg-purple-100/20 shadow-inner' onClick={()=>open()}>
<div className=' rounded-[16px] bg-white  p-5 shadow-sm shadow-purple-200/50' ><Image src="/assets/icons/add.svg" alt="add image" width={24} height={24}/>
</div>
<p> click here to upload image</p>
</div> )}
  </div>
)}

</CldUploadWidget>
  )
}

export default MediaUploader