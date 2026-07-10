import React from 'react'
import {Routes, Route } from 'react-router-dom';
import Input from './components/LHS/input';
import Lock_icon from './components/RHS/lock_icon';
import Result from './pages/result';
import About_user from './pages/about_user';
import Login_page from './pages/login_page';
import Register_page from './pages/register_page';

const App = () => {
  return (
    <Routes>

      <Route path='/' element={
    <div className='mainFrame h-screen w-screen flex flex-col'>
      <div className='innerFrame lg:h-4/6 w-2/3 flex flex-col lg:flex-row'>
        <Input/>
        <Lock_icon/>
      </div>
    </div>
      }/>

      <Route path='/result' element={<Result/>} />
      <Route path='/about_user' element={<About_user/>} />
      <Route path='/login_page' element={<Login_page/>} />
      <Route path='/register_page' element={<Register_page/>} />

    </Routes>
  )
}

export default App
