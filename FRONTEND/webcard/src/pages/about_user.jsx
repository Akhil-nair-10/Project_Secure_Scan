import React from 'react'
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'

const About_user = () => {

  const [popup, setPopup] = useState(false);

  const navigate = useNavigate();

  function toLogin(){
    navigate('/login_page')
  }

  return (
    <div className='about_bg h-screen w-screen flex justify-center items-center select-none'>
      <div className='wrapper lg:h-4/6 lg:w-4/6 h-8/9 w-5/6'> 
        <div className='user_frame_top h-1/8 w-full'>
          <Link to='/' className='back_btnx text-center h-8 w-fit text-cyan-500 items-center font-bold active:scale-97'>Back</Link>
        </div>
        <div className='user_frame_main h-7/8 flex flex-col lg:flex-row justify-center items-center'>
          <div className='framer1 h-full lg:w-1/2 w-full flex flex-col justify-center items-center gap-1'>
            <div className='user_icon h-40 w-40 border-2 lg:h-60 lg:w-60 bg-gray-500'/>
            <div className='user_name text-center text-white w-fit items-center font-extrabold font-serif'>USERNAME</div>
            <div className='email_txt text-center lg:h-8 lg:w-fit text-white items-center font-serif opacity-30 font-light lg:font-extrabold'>xyz@gmail.com</div>
          </div>
          <div className='framer2 h-full lg:w-1/2 w-full flex items-center flex-col'>
            <div className='basic_info text-sky-300 opacity-30 text-center text-xs lg:text-xl lg:font-bold'>
              <p>SECURE_SCAN_v2.0</p>
              <p>DB STATUS : CONNECTED</p>
            </div>
            <div className='hist_wrap h-full w-full flex justify-center items-end'>
              <button className='history_btn lg:h-15 h-9 w-full border-2 font-extrabold rounded-2xl bg-sky-500 active:scale-97 cursor-pointer' onClick={() => setPopup(true)}>SCAN HISTORY</button>
            </div>
            {popup && (
              <div className='fixed bg-black/50 h-screen z-10 w-screen flex justify-center items-center top-0 left-0'>
                <div className='history_popup bg-slate-900 h-2/3 w-3/4 lg:h-2/4 lg:w-2/4 border-2'>
                  <div className='cross_bar h-1/10 w-full bg-blue-400 flex justify-end items-center'><button className='cross_btn font-bold bg-red-500 h-full w-fit cursor-pointer' onClick={() => setPopup(false)}>✕</button></div>
                  <div className='history_content text-white'>
                    NO HISTORY AVAILABLE TO SHOW
                  </div>
                </div>
              </div>
            )}
            <div className='tri_btn w-full flex justify-center items-center lg:flex-row flex-col gap-2'>
              <button className='change_pwd_btn lg:h-15 w-full border-2 font-extrabold rounded-2xl bg-sky-500 active:scale-97 cursor-pointer'>Change Password</button>
              <button className='logout_btn lg:h-15 w-full border-2 font-extrabold rounded-2xl bg-sky-500 active:scale-97 cursor-pointer' onClick={toLogin}>Log-Out</button>
              <button className='del_acc_btn lg:h-15 w-full border-2 font-extrabold rounded-2xl bg-red-600 active:scale-97 cursor-pointer'>Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About_user