import React, {useState} from 'react'
import { ErrorResponseInterface } from '../interface/error_interface';
import { APIInterface } from '../interface/login-interface';

const useSuccess = () => {
    const [successMessage, setSuccessMessage] = useState<APIInterface | null>(null); // message container upon 
    const [success, setSuccess] = useState<boolean>(false); // for triggering modal on success

    const onSuccessClose = (event: React.ChangeEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setSuccess(prev => !prev)
    }

  return{
    success,
    setSuccess,
    successMessage,
    setSuccessMessage,
    onSuccessClose
  }
}

export default useSuccess