import React, { useState } from 'react'
import Table from './Table';

const Schedule = () => {
  const [menu, setMenu] = useState(1);

  const handleClick = (id) => {
    setMenu(id);
  }
  return (
    <div className='w-[70%] mx-auto flex flex-col items-center my-14'>
      <h1 className='text-4xl font-extrabold mb-2'>Our Class Schedule</h1>
      <img src="circle-line.png" alt="" className="mb-14" />
      <div className='flex flex-wrap bg-purple-100 py-2 font-bold justify-center rounded-xl md:gap-16 text-sm w-full'>
        <button onClick={() => handleClick(1)} className={`px-4 py-2 ${menu === 1 ? 'bg-accent rounded-md shadow-md shadow-accent text-white' : 'bg-transparent text-black'}`}>Monday</button>
        <button onClick={()=>handleClick(2)} className={`px-4 py-2 ${menu === 2 ? 'bg-accent rounded-md shadow-md shadow-accent text-white' : 'bg-transparent text-black'}`}>Tuesday</button>
        <button onClick={()=>handleClick(3)} className={`px-4 py-2 ${menu === 3 ? 'bg-accent rounded-md shadow-md shadow-accent text-white' : 'bg-transparent text-black'}`}>Wednesday</button>
        <button onClick={()=>handleClick(4)} className={`px-4 py-2 ${menu === 4 ? 'bg-accent rounded-md shadow-md shadow-accent text-white' : 'bg-transparent text-black'}`}>Thursday</button>
        <button onClick={()=>handleClick(5)} className={`px-4 py-2 ${menu === 5 ? 'bg-accent rounded-md shadow-md shadow-accent text-white' : 'bg-transparent text-black'}`}>Friday</button>
        <button onClick={()=>handleClick(6)} className={`px-4 py-2 ${menu === 6 ? 'bg-accent rounded-md shadow-md shadow-accent text-white' : 'bg-transparent text-black'}`}>Saturday</button>
        <button onClick={()=>handleClick(7)} className={`px-4 py-2 ${menu === 7 ? 'bg-accent rounded-md shadow-md shadow-accent text-white' : 'bg-transparent text-black'}`}>Sunday</button>
      </div>
      <div className={`w-full flex justify-center items-center ${menu === 1 ? 'block' : 'hidden'}`}>
        <Table />
      </div>
      <div className={`w-full flex justify-center items-center ${menu === 2 ? 'block' : 'hidden'}`}>
        <Table />
      </div>
      <div className={`w-full flex justify-center items-center ${menu === 3 ? 'block' : 'hidden'}`}>
        <Table />
      </div>
      <div className={`w-full flex justify-center items-center ${menu === 4 ? 'block' : 'hidden'}`}>
        <Table />
      </div>
      <div className={`w-full flex justify-center items-center ${menu === 5 ? 'block' : 'hidden'}`}>
        <Table />
      </div>
      <div className={`w-full flex justify-center items-center ${menu === 6 ? 'block' : 'hidden'}`}>
        <Table />
      </div>
      <div className={`w-full flex justify-center items-center ${menu === 7 ? 'block' : 'hidden'}`}>
        <Table />
      </div>
    </div>
  )
}

export default Schedule;