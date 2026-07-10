import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Login_page = () => {
  return (
    <div className='login_page_bg h-screen w-screen bg-sky-100 flex justify-center items-center'>
        <div className='login_frame h-2/4 w-4/5 lg:h-2/4 lg:w-2/5 bg-sky-950 rounded-2xl flex flex-col'>
            <div className='Welcome_txt flex justify-center items-center h-1/6'>
                <p className='text-white font-extrabold lg:text-3xl text-center'>Welcome Back</p>
            </div>
            <div className='enter_fields flex flex-col justify-center items-center gap-4 h-3/6'>
                <input type='email' className='bg-white border-2 h-10 lg:w-2/3' placeholder='E-mail'/>
                <input type='password' className='bg-white border-2 h-10 lg:w-2/3' placeholder='Password' />
            </div>
            <div className='flex justify-center items-start h-2/6'>
                <button className='login_btn h-10 w-2/3 text-white font-bold cursor-pointer active:scale-97'>LOG-IN</button>             
            </div>
            <div className='flex justify-center items-center flex-col lg:flex-row'>
               <p>New to Secure Scan?</p><Link to='/register_page' className='text-blue-500 underline active:scale-97 hover:text-blue-700'>Click here to create an account</Link>
            </div>
        </div>
    </div>
  )
}

export default Login_page
