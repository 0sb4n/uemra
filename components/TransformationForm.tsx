"use client"

import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { startTransition, useState } from "react"
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
  const [transforming, settransforming] = useState(false);
  const [isSumbiting, setIsSumbiting] = useState(false);
  const [transformationConfig, setTransformationConfig] = useState(config)
  const [newTransformation, setNewTransformation] = useState<Transformations | null >(null)
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
  function onSubmit(values: z.infer<typeof formSchema>) {
   
    console.log(values)
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
setNewTransformation(transformationType.config)
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
  settransforming(true);
  setTransformationConfig(
    deepMergeObjects(newTransformation,transformationConfig)
  )
  setNewTransformation(null)
  startTransition(async()=>{
    // await updateCredits(userId,creditFee)
  })
 }
  
  return (
    <section className="flex-1">
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
  <SelectTrigger className="Select-field w-[200px]">
    <SelectValue placeholder="Select size"/>

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
          <div className="prompt-field">
<CustomField 
control={form.control}
name="prompt"
formLabel={
  type === "remove" ? "object to remove" : "object to recolor"
}
className="w-full"
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
        <div className="media-uploader">
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


        </div>
        <div  className=" w-full flex gap-4 flex-col py-4">

        <Button type="button" className="bg-pink-400 font-semibold text-white hover:bg-pink-600 w-full rounded-full "   onClick={onTransformHandler}>{
transforming ? "Transforming..." : "Apply transformation"
      } </Button>
        <Button type="submit" disabled={isSumbiting} className="bg-pink-700 w-full hover:bg-pink-800 rounded-full py-4">Submit</Button>
        </div>
      </form>
    </Form>
   </section>
  )
}

export default TransformationForm;