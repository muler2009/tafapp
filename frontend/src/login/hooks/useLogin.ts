import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { username } from '../../api/auth'
import { LoginRequiredData } from '../../interface/login-interface'
import { ErrorResponseInterface } from '../../interface/error_interface'
import { useLoginMutation } from '../../services/loginAPI'
import { useNavigate } from 'react-router-dom'
import { setAuthData, clearAuthData } from '../../api/auth'
import useErrorState from '../../hooks/useError'


const useLogin = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userLogin, { isError, error } ] = useLoginMutation()
  const {triggerMessageModal, setTriggerMessageModal, errorMessage, setErrorMessage, setErrors} = useErrorState()

  const [loginErrorMessage, setLoginErrorMessage] = useState<ErrorResponseInterface | null>(null);
  const [loginError, setLoginError] = useState<boolean>(false);
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

    const [loginData, setLoginData] = useState<LoginRequiredData>({
        username: "",
        password: ""
    })

    const handleLoginInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const {name, value} = event.target
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    const activateLoginBtn = [...Object.values(loginData)].every(Boolean)

    const onLoginButtonClicked = async() => {  
      try {
        setIsLoggingIn(true); // Start the animation
        const response = await userLogin(loginData).unwrap()
        // destructure the access and refresh token
        const { access, refresh, username, group, is_active, full_name } = response
        // Clear existing auth data before setting new data
        dispatch(clearAuthData({ isAuthenticated: false, access, refresh, username, group}));
        dispatch(setAuthData({isAuthenticated: true, access, refresh, username, group, full_name }));
        
        navigate('/taf')
  
      } catch (error: any) {
        setIsLoggingIn(false);
          if (!error) {
            console.log(error);
          } else if (error.data.status_code === 401) {
            setLoginErrorMessage({
              error_type: error.data?.error_type,
              message: error.data?.message,
              status_code: error.status_code
            });
            setLoginError(true);
            setLoginFailed(prev => !prev);
          } else if (error.status === 403) {
            setLoginErrorMessage({
              error_type: error.data?.error_type,
              message: error.data?.message,
              status_code: error.status_code
            });
            setLoginError(true);
            setLoginFailed(prev => !prev);
          } else if (error.status === 400) {
            setLoginErrorMessage({
              error_type: error.data?.error_type,
              message: error.data?.message,
              status_code: error.status_code
            
            });
            setLoginError(true);
            setLoginFailed(prev => !prev);
          }else {
            setLoginErrorMessage({
              error_type: error.response?.data?.error_type || "Unknown Error",
              message: error.response?.data?.message || "An error occurred. Please try again.",
              status_code: error.status
            });
            setLoginError(true);
            setLoginFailed(prev => !prev);
          }
        }
    };

  return {
    loginData,
    setLoginData,
    handleLoginInputChange,
    onLoginButtonClicked,
    isLoggingIn,
    setIsLoggingIn,
    isError,
    error,
    loginError,
    loginErrorMessage,
    loginFailed,
    setLoginFailed,
    activateLoginBtn
  }
}

export default useLogin