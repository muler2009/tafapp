import React from 'react'
import * as VscIcons from 'react-icons/vsc'
import { ModalBody, ModalContainer, ModalWrapper, ModalFooter, ModalHeader } from '../../components/reusable'
import { Text, Div, FlexBox } from '../../components/reusable/StyledComponent'
import { ModalComponentPropsInterface } from '../../interface/modal-interface'
import InputWithDesc from '../../components/reusable/InputWithDesc'
import { RoleModalPropsInterface } from '../../interface/modal-interface'
import useChangePassword from '../hooks/useChangePassword'

const ChangePasswordComponent = ({onRequestClose, title, isOpen, link_identifier}: RoleModalPropsInterface) => {

    const {changePassord, handleChangeInputPassword, activateButton} = useChangePassword()

    const onChangePasswordBtnClicked = async() => {
        console.log(changePassord)
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
                    <InputWithDesc 
                        label={`Old Password *`}
                        type={`password`}
                        id={`old_passowrd_input`}
                        placeholder={`Your old Password`}
                        className={`input-md text-[13px]`}
                        desc={`Your previous password must be given - Manadatory`}
                        name={`old_password`}
                        value={changePassord?.old_password}
                        onChange={handleChangeInputPassword}
                    />
                    <div className='flex space-x-2'>
                        <InputWithDesc 
                            label={`New Password *`}
                            type={`password`}
                            id={`new_passowrd_input`}
                            placeholder={`Your new Password`}
                            desc={`Your New password- Manadatory`}
                            className={`input-md text-[13px]`}
                            name={`new_password`}
                            value={changePassord?.new_password}
                            onChange={handleChangeInputPassword}
                        />
                        <InputWithDesc 
                            label={`Confirm Password *`}
                            type={`password`}
                            id={`confirm_passowrd_input`}
                            placeholder={`Confirm Password`}
                            desc={`Confirm Password`}
                            className={`input-md text-[13px]`}
                            name={`confirm_new_password`}
                            value={changePassord?.confirm_new_password}
                            onChange={handleChangeInputPassword}
                        />
                    </div>
                </FlexBox>
            </ModalBody>
            <ModalFooter className={`flex justify-end px-5 border-t py-2 bg-gray-50`}>
                <button 
                    className={`px-5 py-2 text-[12px] rounded-md bg-taf-color text-white disabled:bg-gray-100 disabled:text-gray-50`} 
                    disabled={!activateButton}
                    onClick={onChangePasswordBtnClicked}
                    >
                    Change Password
                </button>
            </ModalFooter>
        </ModalContainer>  
    )
}

export default ChangePasswordComponent