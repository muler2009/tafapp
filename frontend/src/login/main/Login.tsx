import React from 'react'
import LoginInputs from '../login_mini_components/LoginInputs'
import { FlexBox } from '../../components/reusable/StyledComponent'
import LoginLogoComponent from '../login_mini_components/LoginLogoComponent'


const Login = () => {
  return (
    <FlexBox className='w-full mx-auto h-full flex flex-col items-center justify-center bg-watermark-img bg-no-repeat'>
      <LoginInputs />     
    </FlexBox>
  )
}

export default Login
