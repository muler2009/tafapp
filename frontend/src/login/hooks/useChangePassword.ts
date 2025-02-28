import React, { useState} from 'react'

const useChangePassword = () => {
   const [changePassord, setChangePassword] = useState({
    old_password: "",
    new_password: "",
    confirm_new_password: ""
   })

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

  return {changePassord, handleChangeInputPassword, activateButton}
}

export default useChangePassword