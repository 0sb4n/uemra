"use client"

import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { startTransition, useState,useTransition } from "react"
// import { updateCredits } from "@/lib/actions/user.actions"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Form,

} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { aspectRatioOptions, defaultValues } from "@/constants"
import { CustomField } from "./CustomField"
import { transformationTypes } from "@/constants"
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils"
import { updateCredits } from "@/lib/actions/user.actions"
import MediaUploader from "./MediaUploader"
import TransformedImage from "./TransformedImage"
import { getCldImageUrl } from "next-cloudinary"
import { addImage, updateImage } from "@/lib/actions/image.actions"



 export const formSchema = z.object({
 title:z.string(),
 aspectRatio:z.string().optional(),
 color:z.string().optional(),
 prompt:z.string().optional(),
 publicId:z.string(),



})


const TransformationForm = ({action,data=null,userId, type, creditBalance,config=null}:TransformationFormProps) => {
  const transformationType =  transformationTypes[type];
  const [image, setImage] = useState(data)
  const [transforming, setTransforming] = useState(false);
  const [isSumbiting, setIsSumbiting] = useState(false);
  const [transformationConfig, setTransformationConfig] = useState(config)
  const [newTransformation, setNewTransformation] = useState<Transformations | null >(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const initialValues = data && action === "Update" ? {
    title: data?.title,
    aspectRatio: data.aspectRatio,
    color: data?.color,
    prompt: data?.prompt,
    publicId: data?.publicId

  } :defaultValues
  // 1. Define your form.

   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  })
 
  // 2. Define a submit handler.
 async function onSubmit(values: z.infer<typeof formSchema>) {

   setIsSumbiting(true);
   if(data || image){
    const transformationUrl = getCldImageUrl({
     width:image?.width,
     height:image?.height,
     src:image?.publicId,
     ...transformationConfig

    })
    const imageData = {
      title: values.title,
      publicId: image?.publicId,
      transformationType: type,
      width: image?.width,
      height: image?.height,
      config: transformationConfig,
      secureURL: image?.secureURL,
      transformationURL: transformationUrl,
      aspectRatio: values.aspectRatio,
      prompt: values.prompt,
      color: values.color,
    }
    if(action === "Add"){
      try {
        const newImage = await addImage({
          image:imageData,
          userId,
          path:'/'
        })
        if(newImage){
          form.reset()
          setImage(data)
          router.push(`/transformations?${newImage._id}`)
        }
      } catch (error) {
        console.log(error)
      }
    }
  if(action === 'Update'){
    try {
      const updatedImage = await updateImage({
        image:{
          ...imageData,
          _id:data._id
        },
        userId,
        path:`/transformations/${data._id}`
      })
      if(updatedImage){
       
        router.push(`/transformations?${updatedImage._id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  }
   
   
setIsSumbiting(false)
  }
  const onSelectFieldHandler = (value:string,onChangeField:(value:string)=>void)=>{
const imageSize=  aspectRatioOptions [value as AspectRatioKey]
setImage((prevState :any)=>({
  ...prevState,
  aspectRatio:imageSize.aspectRatio,
  width:imageSize.width,
  height:imageSize.height,
}
))
setNewTransformation(transformationType.config);

return onChangeField(value)
  }
const onInputChangeHandler=(fieldName:string,value:string, type:string,onChangeField:(value:string)=>void)=>{
  debounce(()=>{
setNewTransformation((prevState :any)=>({
  ...prevState ,[type]:{
    ...prevState?.[type],
  

[fieldName === 'prompt' ? 'prompt' :'to']: value
  }
}))
return onChangeField(value);
  },1000);

}
 const onTransformHandler = async ()=>{
  setTransforming(true);
  setTransformationConfig(
    deepMergeObjects(newTransformation,transformationConfig)
  )
  setNewTransformation(null)
  startTransition(async()=>{
    await updateCredits(userId,-1)
  })
 }
  
  return (
    
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
   <CustomField 
   control={form.control}
   name="title"
   formLabel="image Title"
   className=" w-full"
   render={({field})=><Input {...field} type="text"/>}
   />
   {type === "fill" && (
<CustomField
control={form.control}
name="aspectRatio"
formLabel="Aspect Ratio"
className="w-full p-0"
render={({field})=>(
<Select onValueChange={(value)=>onSelectFieldHandler(value,field.onChange)} 
value={field.value}>
  <SelectTrigger className="Select-field w-[300px]">
    <SelectValue placeholder="Select size" />

  </SelectTrigger>
  <SelectContent>
  {Object.keys(aspectRatioOptions).map((key)=>(
    <SelectItem key={key} value={key} className="select-item">
      {aspectRatioOptions[key as AspectRatioKey].label}

    </SelectItem>
    ))}
   
  </SelectContent>
</Select>

)}

/>

   )}
        {(type==='remove' || type ==="recolor") && (
          <div className="flex flex-col gap-5 lg:flex-row lg:gap-2">
<CustomField 
control={form.control}
name="prompt"
formLabel={
  type === "remove" ? "object to remove" : "object to recolor"
}
className="w-[400px]"
render={(({field})=>(
  <Input value={field.value}
   className="input-field" 
   onChange={(e)=>onInputChangeHandler("prompt",e.target.value, type, field.onChange)}/>
))}
/>
{type === 'recolor' && (
  <CustomField
  control={form.control}
  name='color'
  formLabel="Replacement color"
  render={({field})=>(
    <Input value={field.value}
    className="input-field" 
    onChange={(e)=>onInputChangeHandler("color",e.target.value, "recolor", field.onChange)} />
  )}
  />
)}



          </div>
        )}  
        <div className=" grid h-fit min-h-[200px] grid-cols-1 gap-5 py-4 md:grid-cols-2">
          <CustomField
          control={form.control}
          name="publicId"
          className="flex size-full flex-col "
          render={({field})=>(
            <MediaUploader 
            onValueChange={field.onChange}
            setImage={setImage}
            publicId={field.value}
            image={image}
            type={type}
            />
          )}
          />
          <TransformedImage
         image={image}
         type={type}
title={form.getValues().title}
isTransforming={transforming}
setIsTransforming={setTransforming}
transformationConfig={transformationConfig}
/>


        </div>
        <div  className=" w-full flex gap-4 flex-col py-4">

        <Button type="button" className="bg-pink-400 font-semibold text-white hover:bg-pink-600 w-full rounded-full "   onClick={onTransformHandler}>{
transforming ? "Transforming..." : "Apply transformation"
      } </Button>
        <Button type="submit" disabled={isSumbiting} className="bg-pink-700 w-full hover:bg-pink-800 rounded-full py-4">Submit</Button>
        </div>
      </form>
    </Form>
   
  )
}

export default TransformationForm;