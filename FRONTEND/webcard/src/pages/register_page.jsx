import axios from 'axios';
import React, { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Register_page = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    async function registerMe(){
        try{
            setError('');
            const userDetails = await axios.post(
                `${import.meta.env.VITE_API_URL}/register`,
                {username, email, password}
            )

            console.log("User Registered");
            navigate('/')
        }
        catch(error){
        setError(
            error.response?.data?.message || "Something went wrong."
        );
        }

    }

  return (
    <div className='register_page_bg h-screen w-screen bg-sky-100 flex justify-center items-center'>
        <div className='register_frame h-2/4 w-4/5 lg:h-2/4 lg:w-2/5 bg-sky-950 rounded-2xl flex flex-col'>
            <div className='Register_txt flex justify-center items-center h-1/6'>
                <p className='text-white font-extrabold lg:text-3xl text-center'>Create Account</p>
            </div>
            <div className='enter_fields flex flex-col justify-center items-center gap-4 h-3/6'>
                <input type='text' className='bg-white border-2 h-10 lg:w-2/3' placeholder='Username' onChange={(e)=>{setUsername(e.target.value)}}/>
                <input type='email' className='bg-white border-2 h-10 lg:w-2/3' placeholder='E-mail' onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type='password' className='bg-white border-2 h-10 lg:w-2/3' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div className='flex justify-center items-start h-2/6'>
                <button className='register_btn h-10 w-2/3 text-white font-bold cursor-pointer active:scale-97' onClick={registerMe} >Register</button>             
            </div>
            {
                error && (
                    <p className="text-red-500 font-semibold mt-2 flex justify-center">
                        {error}
                    </p>
                )
            }
            <div className='flex justify-center items-center flex-col lg:flex-row'>
               <p>Already have an account?</p><Link to='/login_page' className='text-blue-500 underline active:scale-97 hover:text-blue-800'>Click here to Login</Link>
            </div>
        </div>
    </div>
  )
}

export default Register_page
