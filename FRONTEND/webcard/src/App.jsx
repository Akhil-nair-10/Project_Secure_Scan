import React from 'react'
import {Routes, Route } from 'react-router-dom';
import Input from './components/LHS/input';
import Lock_icon from './components/RHS/lock_icon';
import Result from './pages/result';
import About_user from './pages/about_user';
import Login_page from './pages/login_page';
import Register_page from './pages/register_page';
import Combo from './components/BHS/combo';

const App = () => {
  return (
    <Routes>

      <Route path='/' element={<Login_page/>} />

      <Route path='/result' element={<Result/>} />
      <Route path='/about_user' element={<About_user/>} />
      <Route path='/scan_page' element={<Combo/>} />
      <Route path='/register_page' element={<Register_page/>} />

    </Routes>
  )
}

export default App
