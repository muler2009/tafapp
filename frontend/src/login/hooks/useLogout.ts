import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearAuthData, access, refresh, isAuthenticated } from '../../api/auth'
import { useLogoutUserMutation } from '../../services/loginAPI'

const useLogout = () => {

  const dispatch = useDispatch();
  const [ logoutUser ] = useLogoutUserMutation();
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>("");

  const onUserLogoutClicked = async() => {
    try{
        await logoutUser({refresh})

        dispatch(clearAuthData({
          access,
          refresh,
          isAuthenticated
        }))
        navigate('/')
    }catch(error){
      console.log("error occired")
        // console.log(error.message)
        // setError(error.message);
    }
  }

  return {
    onUserLogoutClicked
  }
}

export default useLogout

