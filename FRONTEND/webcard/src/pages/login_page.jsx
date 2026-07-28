import axios from 'axios';
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Login_page = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    async function loginMe(){
        try{
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setError('');
            
            if (!emailRegex.test(email)) {
                setError("Please enter a valid email.");
            return;
}
            await axios.post(
                `${import.meta.env.VITE_API_URL}/login`,
                {email, password},
                {
                    withCredentials:true
                }
            );

            console.log("User Logged in");
            navigate('/scan_page');
        }
        catch(error){

        console.log("Inside catch");
        console.log(error);
        console.log(error.response);
        console.log(error.response?.data);


            setError(
            error.response?.data?.message || "Something went wrong."
        );
        }

    }


  return (
    <div className='login_page_bg h-screen w-screen bg-sky-100 flex justify-center items-center'>
        <div className='login_frame h-2/4 w-4/5 lg:h-2/4 lg:w-2/5 bg-sky-950 rounded-2xl flex flex-col'>
            <div className='Welcome_txt flex justify-center items-center h-1/6'>
                <p className='text-cyan-400 font-extrabold lg:text-3xl text-center'>Welcome Back</p>
            </div>
            <div className='enter_fields flex flex-col justify-center items-center gap-4 h-3/6'>
                <input type='email' className='input_email bg-[#07172e] border border-cyan-700 rounded-lg h-10 lg:w-2/3 placeholder:text-white placeholder:opacity-50' placeholder='E-mail' required onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type='password' className='input_pwd bg-[#07172e] border border-cyan-700 rounded-lg h-10 lg:w-2/3 placeholder:text-white placeholder:opacity-50' placeholder='Password' required onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div className='flex justify-center items-start h-2/6'>
                <button className='login_btn h-10 w-2/3 text-white font-bold cursor-pointer active:scale-97' onClick={loginMe}>LOG-IN</button>             
            </div>
            {
                error && (
                    <p className="text-red-500 font-semibold mt-2 flex justify-center">
                        {error}
                    </p>
                )
            }
            <div className='flex justify-center items-center flex-col lg:flex-row'>
               <p className='text-white'>New to Secure Scan?</p><Link to='/register_page' className='text-blue-500 underline active:scale-97 hover:text-blue-700'>Click here to create an account</Link>
            </div>
        </div>
    </div>
  )
}

export default Login_page
