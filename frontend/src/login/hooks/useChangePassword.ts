import React, { useState} from 'react'

const useChangePassword = () => {
  
   const [changePassord, setChangePassword] = useState({
    old_password: "",
    new_password: "",
    confirm_new_password: ""
   })

  // password visibility state 
  const [showPassword, setShowPassword] = useState({
    show_old_password: false,
    show_new_password: false,
    show_confirm_new_password: false
  })

  const passwordtoggleHandler = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field], // Toggle only the selected field
    }));
  };

// activate button only when all input values entered
const activateButton = [...Object.values(changePassord)].every(Boolean)

const handleChangeInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const {name, value} = event.target
    setChangePassword({
        ...changePassord,
        [name]: value
    }) 
}

const cleanField = () => {
  setChangePassword({
    old_password: "",
    new_password: "",
    confirm_new_password: ""
  })
}

  return {
    changePassord, 
    showPassword,
    activateButton,
    handleChangeInputPassword,
    passwordtoggleHandler,
    cleanField
  }


}

export default useChangePassword