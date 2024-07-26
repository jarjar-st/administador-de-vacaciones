import Login from '@/components/Login'
import React from 'react'

type Props = {
  searchParams?: Record<"callbackUrl"|"error", string>
}

const SignInPage = (props: Props) => {
  return (
    <div className='flex justify-center items-center min-h-screen bg-slate-800'>
      <Login error={props.searchParams?.error}/>
    </div>
  )
}

export default SignInPage