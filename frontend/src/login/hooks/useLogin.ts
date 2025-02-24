import React, { useState } from 'react'
import { username } from '../../api/auth'
import { LoginRequiredData } from '../../interface/login-interface'

const useLogin = () => {

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
      console.log(loginData)
    }

  return {
    loginData,
    activateLoginBtn,
    handleLoginInputChange,
    onLoginButtonClicked
  }
}

export default useLogin