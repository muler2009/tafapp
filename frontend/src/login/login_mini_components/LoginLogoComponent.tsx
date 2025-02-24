import React from 'react'
import { FlexBox, FlexBoxInner } from '../../components/reusable/StyledComponent'
import logo from '../../assets/images/taf-logo.png'

const LoginLogoComponent = () => {
  return (
    <FlexBox className='flex w-[30%] bg-gray-50 shadow-md items-center pl-5 '>
        <img src={logo} alt="Taf Oil Ethiopia logo"className={`w-[120px] h-[120px]`} />
        <FlexBoxInner className='flex flex-col'>
            <h1 className='text-[35px] uppercase text-taf-color font-bold tracking-[0.20em]'>Taf
                <span className='block text-[15px] -mt-3 pl-2 lowercase text-green-500 tracking-widest'>Oil Ethiopia</span>
            </h1>
            <p className='text-sm font-Poppins hover:text-blue-500 hover:underline pl-2 pt-2 text-[#333] text-opacity-50'>www.taf.com</p>
        
        </FlexBoxInner>
    </FlexBox>
  )
}

export default LoginLogoComponent