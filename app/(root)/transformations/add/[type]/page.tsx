import Header from '@/components/Header'
import React from 'react'
import TransformationForm from '@/components/TransformationForm'
import { transformationTypes } from '@/constants'
import {auth} from "@clerk/nextjs"
import { redirect } from 'next/navigation'
import { getUserById } from '@/lib/actions/user.actions'


const addPage = async ({params: {type }}: SearchParamProps) => {
const {userId} = auth();
// // console.log(userId)
  const transformation = transformationTypes[type];
 if(!userId) redirect ('/sign-in')
  const user = await getUserById(userId); 

  return (
  <>
  <Header title={transformation.title} subtitle={transformation.subTitle} />
  <TransformationForm action="Add" userId={user._id} type={transformation.type as TransformationTypeKey} creditBalance={user.creditBalance} />
  </>
  )
}

export default addPage