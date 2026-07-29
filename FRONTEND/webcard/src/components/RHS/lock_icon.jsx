import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Lock_icon = () => {

  const navigate = useNavigate();

  function myDashboard(){
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/getUser`,
                {
                    withCredentials: true
                }
            );
            navigate('/about_user')
        } catch (error) {
            console.log(error);
            alert("Cannot GET userData Please Login");
        }
  }

  return (
    <div className='RHS h-full lg:w-1/2 flex flex-col aspect-square'>
      <div className='icon_frame h-2/4 w-2/4 flex flex-col active:scale-97' onClick={myDashboard}>
        <div className='key_hole lg:h-5 h-3 w-3 lg:w-5 bg-black flex'>
            <div className='key_hole_bottom lg:h-8 h-3 lg:w-2 w-1 bg-black'/>
        </div>
      </div>
    </div>
  )
}

export default Lock_icon
