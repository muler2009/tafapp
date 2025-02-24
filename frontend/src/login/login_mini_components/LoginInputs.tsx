import React, {useState} from 'react'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import { ErrorResponseInterface } from '../../interface/error_interface'
import { FlexBox, FlexBoxInner, Div, Text } from '../../components/reusable/StyledComponent'
import ErrorNotifierModal from '../../components/errors/ErrorNotifierModal'
import useErrorState from '../../hooks/useError'
import logo from '../../assets/images/taf-logo.png'
import useLogin from '../hooks/useLogin'
import useUtils from '../../hooks/useUtils'
import ForgotPasswordComponent from './ForgotPasswordComponent'


const LoginInputs = () => {

  const { triggerMessageModal, errorMessage, setTriggerMessageModal} = useErrorState()
  const { loginData, handleLoginInputChange, activateLoginBtn, onLoginButtonClicked } = useLogin()
  const {handleIsOpenCloseMenuModal, open} = useUtils()
  
  return (
    <FlexBox className={`py-5 w-[30%] my-[2px] mx-auto bg-gray-50 shadow-md`}>  
      <div className='flex border-b'>
          <img src={logo} alt="Taf Oil Ethiopia logo"className={`w-[120px] h-[120px]`} />
          <div className='flex flex-col'>
              <h1 className='text-[35px] uppercase text-taf-color font-bold tracking-[0.20em]'>Taf
                  <span className='block text-[15px] -mt-3 pl-2 lowercase text-green-500 tracking-widest'>Oil Ethiopia</span>
              </h1>
              <p className='text-sm font-Rubik hover:text-blue-500 hover:underline pl-2 pt-2 text-[#333] text-opacity-50'>+251-910-857711</p>
          
          </div>
      </div>
      <div className={`px-10 flex flex-col space-y-5 justify-center py-5`}>
        <Text className='text-[30px] font-Poppins text-[#5e2f05] font-semibold text-center text-opacity-65'> Login to System</Text>
          <div className="relative font-Poppins">
            <label className='relative cursor-pointer py-2 flex flex-row items-center'>
                <input 
                  id='username'
                  type='text' 
                  name='username'
                  placeholder='username'
                  className='w-full pl-6 pr-10 pt-4 text-black input-md rounded-md border-opacity-50 focus:bg-white placeholder-gray-300 placeholder-opacity-0 transition duration-200' 
                  value={loginData.username}
                  onChange={handleLoginInputChange}
                />
                <FaUserAlt color="gray" className="absolute right-2 mr-3 "/>
                <span className='text-black text-[15px] bg-white text-opacity-80 absolute left-5 top-5 px-1 transition duration-200 input-text border-none'>Username</span>
            </label>  
          </div>
          {/* Password Field */}
          <div className="relative font-Poppins">
            <label className='relative cursor-pointer py-2 flex flex-row items-center'>
              <input 
                id='password'
                type='password' 
                name={`password`}
                placeholder={`password`}
                className={`w-full pl-6 pr-10 pt-4 text-black input-md border-opacity-50 focus:outline-none focus:border-green-600 focus:bg-white placeholder-gray-300 placeholder-opacity-0 transition duration-200 focus:border-inherit`}    
                value={loginData.password}
                onChange={handleLoginInputChange} 
              />
              <FaLock color="gray" className={`absolute right-2 mr-3`} />
              <span className={`text-black text-[15px] bg-white text-opacity-80 absolute left-5 top-5 px-1 transition duration-200 input-password border-none`}>Password</span>
            </label>  
          </div>
          <div className={`flex flex-col space-y-1 items-start`}>
            <Text className={`text-[13px] text-text-primary font-Poppins float-right`}>Forgot your password</Text>
            <Text className={`block font-Poppins text-[11px]`}>
              Click here to <span className='text-blue-600 hover:underline cursor-pointer' onClick={handleIsOpenCloseMenuModal}>change password</span>
            </Text>
          </div>
         
            <button  
              className={`btn-md py-2 bg-taf-color font-Poppins text-white rounded-[4px] disabled:bg-gray-50 disabled:text-gray-50`} 
              disabled={!activateLoginBtn}
              onClick={onLoginButtonClicked}
            > Login </button>           
      </div>
      
      <ErrorNotifierModal 
        triggerMessageModal={triggerMessageModal} 
        errorMessage={errorMessage}
        setTriggerMessageModal={setTriggerMessageModal}
      />

      <ForgotPasswordComponent 
        open={open}
        handleIsOpenCloseMenuModal = {handleIsOpenCloseMenuModal}
        title={`Change Password`}
      />

    </FlexBox>
  )
}
      
         
    


export default LoginInputs

