import React from 'react'

const Combo = () => {
  return (
      <div className='mainFrame h-screen w-screen flex flex-col'>
        <div className='innerFrame lg:h-4/6 w-2/3 flex flex-col lg:flex-row'>
          <Input/>
          <Lock_icon/>
        </div>
      </div>
  )
}

export default Combo
