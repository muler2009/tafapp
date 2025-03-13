import React from 'react'

const HorizontalProgressBar = () => {
  return (
    <div className={`flex flex-col space-y-2 border py-5 px-5`}>
        <div className="relative w-full h-[20px] bg-gray-300 overflow-hidden py-2 rounded-full"> 
            <div className="absolute top-0 left-0 w-full h-full bg-gray-300" /> {/* Total Stock (Background) */}
            <div className="absolute top-0 left-0 h-full bg-[#69b2f8] transition-all duration-500" />  {/* Remaining Stock (Foreground) */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center font-semibold text-black">
            100 %
            </div>
        </div> 
        <div className={`flex space-x-3 py-1`}>
           <div className="flex-grow">
            <div className="flex flex-col space-y-1 justify-center items-center">
              {/* <p className="text-[#69b2f8] text-sm font-Poppins uppercase font-semibold text-opacity-95">SALE</p> */}
              <h1 className="text-green-500 text-xl font-IBMPlexSans">0.00$
                <span className="text-[#333] text-opacity-80 pl-1 text-[13px]">ETB</span>
              </h1>
              <p className="text-[#333] text-[12px] font-Poppins text-opacity-50">Total sales in money for the current stock</p>
            </div>
           </div>
           <div className="flex-grow border-l px-4">
            <div className="flex flex-col space-y-1 justify-center items-center">
              {/* <p className="text-[#69b2f8] text-sm font-Poppins uppercase font-semibold text-opacity-95">SALE</p> */}
              <h1 className="text-green-500 text-xl font-IBMPlexSans">2589
                <span className="text-[#333] text-opacity-80 pl-1 text-[13px]">ETB</span>
              </h1>
              <p className="text-[#333] text-[12px] font-Poppins text-opacity-50">Total sales in money for the current stock</p>
            </div>
           </div>
        </div> 
    </div>
  )
}

export default HorizontalProgressBar