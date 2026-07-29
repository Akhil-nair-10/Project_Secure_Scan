import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom'

const About_user = () => {

  const [popup, setPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dbStatus, setDbStatus] = useState('Not Connected');

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/getUser`,
                {
                    withCredentials: true
                }
            );
            setUsername(response.data.username);
            setEmail(response.data.email);
        } catch (error) {
            console.log(error);
            alert("Something went wrong Cannot get the User Data");
        }
    }
    fetchUser();
}, []);

  async function logoutMe(){
    try{
      await axios.post(
         `${import.meta.env.VITE_API_URL}/logout`,
         {},
         { withCredentials: true }
      )

      navigate('/');
      console.log("User Logged Out");
    }
    catch(error){
      alert("Something went wrong");
    }

  }

  async function deleteMyAccount(){
    try{
      await axios.delete(
         `${import.meta.env.VITE_API_URL}/deleteUser`,
         { withCredentials: true }
      )

      navigate('/');
      console.log("User account deleted");
    }
    catch(error){
      console.log(error);
      alert("Something went wrong");
    }
  }

  return (
    <div className='about_bg h-screen w-screen flex justify-center items-center select-none'>
      <div className='wrapper lg:h-4/6 lg:w-4/6 h-8/9 w-5/6'> 
        <div className='user_frame_top h-1/8 w-full'>
          <Link to='/scan_page' className='back_btnx flex justify-center items-center h-8 w-fit text-cyan-500 font-bold active:scale-97'>Back</Link>
        </div>
        <div className='user_frame_main h-7/8 flex flex-col lg:flex-row justify-center items-center'>
          <div className='framer1 h-full lg:w-1/2 w-full flex flex-col justify-center items-center gap-1'>
            <div className='user_icon h-40 w-40 border-2 lg:h-60 lg:w-60 bg-gray-500'/>
            <div className='user_name text-center text-white w-fit items-center font-extrabold font-serif'>{username}</div>
            <div className='email_txt text-center lg:h-8 lg:w-fit text-white items-center font-serif opacity-30 font-light lg:font-extrabold'>{email}</div>
          </div>
          <div className='framer2 h-full lg:w-1/2 w-full flex items-center flex-col'>
            <div className='basic_info text-sky-300 opacity-30 text-center text-xs lg:text-xl lg:font-bold'>
              <p>SECURE_SCAN_v2.0</p>
              <p>DB STATUS : {dbStatus}</p>
              <p>THIS IS NON-FUNCTIONAL PAGE</p>
            </div>
            <div className='hist_wrap h-full w-full flex justify-center items-end'>
              <button className='history_btn lg:h-15 h-9 w-full border-2 font-extrabold rounded-2xl bg-sky-500 active:scale-97 cursor-pointer' onClick={() => setPopup(true)}>SCAN HISTORY</button>
            </div>
            {popup && (
              <div className='fixed bg-black/50 h-screen z-10 w-screen flex justify-center items-center top-0 left-0'>
                <div className='history_popup h-2/3 w-3/4 lg:h-2/4 lg:w-2/4 border-2'>
                  <div className='cross_bar h-1/10 w-full bg-cyan-400 flex justify-end items-center'><button className='cross_btn font-bold bg-red-500 h-full w-fit cursor-pointer' onClick={() => setPopup(false)}>✕</button></div>
                  <div className='history_content text-white'>
                    NO HISTORY AVAILABLE TO SHOW
                  </div>
                </div>
              </div>
            )}
            <div className='tri_btn w-full flex justify-center items-center lg:flex-row flex-col gap-2'>
              <button className='change_pwd_btn lg:h-15 w-full border-2 font-extrabold rounded-2xl bg-sky-500 active:scale-97 cursor-pointer'>Change Password</button>
              <button className='logout_btn lg:h-15 w-full border-2 font-extrabold rounded-2xl bg-sky-500 active:scale-97 cursor-pointer' onClick={logoutMe}>Log-Out</button>
              <button className='del_acc_btn lg:h-15 w-full border-2 font-extrabold rounded-2xl bg-red-600 active:scale-97 cursor-pointer' onClick={() => setDeletePopup(true)}>Delete Account</button>
              {deletePopup && (
                <div className='fixed bg-black/50 h-screen z-10 w-screen flex justify-center items-center top-0 left-0'>
                  <div className='delete_popup bg-slate-900 h-60 w-2/3 lg:w-100 md:w-3/4 flex items-center flex-col justify-end rounded-2xl'>
                    <div className='content text-white h-1/2 w-full flex items-start justify-center'>ARE YOU SURE?</div>
                    <div className='yes_no_wrapper flex h-1/2 w-full items-end justify-center gap-10'><button className='yes_btn bg-teal-400 h-10 w-30 lg:w-25 cursor-pointer active:scale-97' onClick={deleteMyAccount}>YES</button><button className='no_btn bg-teal-400 h-10 w-30 lg:w-25 cursor-pointer active:scale-97'onClick={() => setDeletePopup(false)}>NO</button></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About_user