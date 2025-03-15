import React from 'react'
import { FaDownload } from "react-icons/fa6";

const DownloadDashboard = () => {
  return (
    <div className='bg-[#fff] border py-3 px-5 rounded-md'>
        <div className='flex space-x-5'>
            <div className='text-4xl text-[#333] text-opacity-50'>
                <FaDownload />
            </div>
            <div className=''>
                <p className='font-semibold font-Poppins'>Download Report in CSV format.
                    <span className='font-normal block text-[11px] text-[#333] text-opacity-70'>
                        Open it in a spreadsheet and perform your own calculations, graphing etc. The CSV file contains additional details, such as the buyer location. 
                    </span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default DownloadDashboard