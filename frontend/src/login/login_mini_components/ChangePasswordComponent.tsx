import React, {useState} from 'react'
import * as VscIcons from 'react-icons/vsc'
import { ModalBody, ModalContainer, ModalWrapper, ModalFooter, ModalHeader } from '../../components/reusable'
import { Text, Div, FlexBox } from '../../components/reusable/StyledComponent'
import InputWithDesc from '../../components/reusable/InputWithDesc'
import { ModalPropsInterface } from '../../interface/modal-interface'
import useChangePassword from '../hooks/useChangePassword'
import * as IoIcons from 'react-icons/io'
import { useChangePasswordMutation } from '../../services/loginAPI'
import useErrorState from '../../hooks/useError'
import ErrorNotifierModal from '../../components/errors/ErrorNotifierModal'
import ConfirmationModal from '../../components/confirmation/ConfirmationModal'
import useSuccess from '../../hooks/useSuccess'

const ChangePasswordComponent = ({onRequestClose, title, isOpen, link_identifier}: ModalPropsInterface) => {

    const {success, setSuccessMessage, setSuccess, successMessage} = useSuccess()
    const [passwordChange] = useChangePasswordMutation()
    const {changePassord, handleChangeInputPassword, activateButton, showPassword, passwordtoggleHandler, cleanField} = useChangePassword()
    const {setErrorMessage, setErrors, setTriggerMessageModal, triggerMessageModal, errorMessage} = useErrorState()



    const onChangePasswordBtnClicked = async() => {
        try{
            const response = await passwordChange(changePassord).unwrap()
            if(response.status_code === 201){
               cleanField();
               setSuccess(true);
               setSuccessMessage({
                error_type: response?.error_type,
                message: response?.message,
                status_code: response?.status_code
              })
            }
         }catch(error: any){
             console.log(error)
             if(!error) {
               console.log(error)
             } else if(error.data.status_code === 409 ){
               setErrorMessage({
                 error_type: error.data?.error_type,
                 message: error.data?.message,
                 status_code: error.status_code
               });
               setErrors(true);
               setTriggerMessageModal(prev => !prev);
             } else if(error.data.status_code === 400 ){
               setErrorMessage({
                 error_type: error.data?.error_type,
                 message: error.data?.message,
                 status_code: error.status_code
               });
               setErrors(true);
               setTriggerMessageModal(prev => !prev);
             }
           }
     }


    return (
        <ModalContainer className={`w-[35%] mx-auto flex flex-col relative top-[20%] shadow-2xl rounded-[3px]`}>
            <ModalHeader className='flex justify-between items-center px-2 py-[10px] font-Poppins rounded-t-md border-b bg-gray-50 text-[#333]'>
                <Text className='font-Poppins text-left px-5 text-[14px] flex-grow text-[#333] text-opacity-50'>{title}</Text>
                <Div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-md hover:bg-gray-100 hover:text-red-600 text-[#333]" onClick={onRequestClose} > 
                    <VscIcons.VscClose size={15} />
                </Div>
            </ModalHeader>
            <ModalBody className='px-5 h-[30vh] py-2 bg-gray-50'>
                <FlexBox className={`flex flex-col space-y-2 py-5`}>
                    <div className={`relative`}>
                        <InputWithDesc 
                            label={`Old Password *`}
                            type={showPassword?.show_old_password ? "text" : "password"}
                            id={`old_passowrd_input`}
                            placeholder={`Your old Password`}
                            className={`input-md text-[13px]`}
                            desc={`Your previous password must be given - Manadatory`}
                            name={`old_password`}
                            value={changePassord?.old_password}
                            onChange={handleChangeInputPassword}
                        />

                        <button
                            type="button"
                            onClick={() => passwordtoggleHandler("show_old_password")}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition-all duration-300 ease-in-out"
                            aria-label="Toggle password visibility"
                        >
                            <span className={`transform transition-all duration-300 ease-in-out ${showPassword?.show_old_password ? "opacity-0 scale-75" : "opacity-100 scale-100"}`}>
                                <IoIcons.IoMdEye size={20} />
                            </span>
                            <span className={`absolute transform transition-all duration-300 ease-in-out ${showPassword?.show_old_password ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
                                <IoIcons.IoMdEyeOff size={20} />
                            </span>
                        </button>

                    </div>
                    <div className='flex space-x-2'>
                        <div className={`relative`}>
                            <InputWithDesc 
                                label={`New Password *`}
                                type={showPassword?.show_new_password ? "text" : "password"}
                                id={`new_passowrd_input`}
                                placeholder={`Your new Password`}
                                desc={`Your New password- Manadatory`}
                                className={`input-md text-[13px]`}
                                name={`new_password`}
                                value={changePassord?.new_password}
                                onChange={handleChangeInputPassword}
                            />
                            <button
                                type="button"
                                onClick={() => passwordtoggleHandler("show_new_password")}
                                className="absolute  inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition-all duration-300 ease-in-out"
                                aria-label="Toggle password visibility"
                            >
                                <span className={`transform transition-all duration-300 ease-in-out ${showPassword?.show_new_password ? "opacity-0 scale-75" : "opacity-100 scale-100"}`}>
                                    <IoIcons.IoMdEye size={20} />
                                </span>
                                <span className={`absolute transform transition-all duration-300 ease-in-out ${showPassword?.show_new_password ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
                                    <IoIcons.IoMdEyeOff size={20} />
                                </span>
                            </button>
                        </div>
                       
                        <div className="relative">
                            {/* Password Input */}
                            <InputWithDesc 
                                label={`Confirm Password *`}
                                type={showPassword?.show_confirm_new_password ? "text" : "password"}
                                id={`confirm_passowrd_input`}
                                placeholder={`Confirm Password`}
                                desc={`Confirm Password`}
                                className={`input-md text-[13px]`}
                                name={`confirm_new_password`}
                                value={changePassord?.confirm_new_password}
                                onChange={handleChangeInputPassword}
                            />

                            {/* Eye Icon Button */}
                            <button
                                type="button"
                                onClick={() => passwordtoggleHandler("show_confirm_new_password")}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition-all duration-300 ease-in-out"
                                aria-label="Toggle password visibility"
                            >
                                <span className={`transform transition-all duration-300 ease-in-out ${showPassword?.show_confirm_new_password ? "opacity-0 scale-75" : "opacity-100 scale-100"}`}>
                                    <IoIcons.IoMdEye size={20} />
                                </span>
                                <span className={`absolute transform transition-all duration-300 ease-in-out ${showPassword?.show_confirm_new_password ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
                                    <IoIcons.IoMdEyeOff size={20} />
                                </span>
                            </button>
                        </div>
                    </div>
                </FlexBox>
            </ModalBody>
            <ModalFooter className={`flex justify-end px-5 border-t py-2 bg-gray-50`}>
                <button 
                    className={`px-5 py-2 text-[12px] rounded-md bg-taf-color text-white disabled:bg-gray-100 disabled:text-gray-50`} 
                    disabled={!activateButton}
                    onClick={onChangePasswordBtnClicked}>
                    Change Password
                </button>
            </ModalFooter>

            <>
                <ErrorNotifierModal    
                    triggerMessageModal={triggerMessageModal} 
                    errorMessage={errorMessage}
                    setTriggerMessageModal={setTriggerMessageModal}
                />

                <ConfirmationModal 
                    success={success}
                    successMessage={successMessage}
                />
            </>


        </ModalContainer>  
    )
}

export default ChangePasswordComponent