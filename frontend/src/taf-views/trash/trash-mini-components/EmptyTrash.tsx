import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'

const EmptyTrash = () => {
  return (
    <div className={`flex justify-center items-center h-full`}>
        <div className={`flex flex-col items-center space-y-3`}>
            <FaTrashAlt size={100} color='gray' opacity={0.5} />
            <h2 className='font-Poppins text-[30px] text-center font-semibold'>
                Empty
                <span className='block font-normal text-[16px] text-[#333] text-opacity-50'>No deleted Item</span>
            </h2>
        </div>
    </div>
  )
}

export default EmptyTrash