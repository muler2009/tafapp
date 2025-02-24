import React from 'react'
import * as VscIcons from 'react-icons/vsc'
import { ModalBody, ModalContainer, ModalWrapper, ModalFooter, ModalHeader } from '../../components/reusable'
import { Text, Div, FlexBox } from '../../components/reusable/StyledComponent'
import { ModalComponentPropsInterface } from '../../interface/modal-interface'
import InputWithDesc from '../../components/reusable/InputWithDesc'

const ForgotPasswordComponent = ({open, handleIsOpenCloseMenuModal, title}:ModalComponentPropsInterface) => {
    return (
        open ? (
            <ModalWrapper>
                <ModalContainer className={`w-[30%] mx-auto flex flex-col relative top-[20%] shadow-2xl rounded-[3px]`}>
                    <ModalHeader className='flex justify-between items-center px-2 py-[10px] font-Poppins rounded-t-md border-b bg-gray-50 text-[#333]'>
                      <Text className='font-Poppins text-left px-5 text-[14px] flex-grow text-[#333] text-opacity-50'>{title}</Text>
                      <Div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-md hover:bg-gray-100 hover:text-red-600 text-[#333]" onClick={handleIsOpenCloseMenuModal} > 
                          <VscIcons.VscClose size={15} />
                      </Div>
                    </ModalHeader>
                    <ModalBody className='px-5 h-[25vh] py-2 bg-gray-50'>
                        <FlexBox className={`flex flex-col space-y-2 py-5`}>
                            <InputWithDesc 
                                label={`Old Password *`}
                                type={`text`}
                                id={`old_passowrd_input`}
                                placeholder={`Your old Password`}
                                className={`input-md`}
                                name={`old_password`}
                                desc={`Your previous password must be given - Manadatory`}
                            />
                            <InputWithDesc 
                                label={`New Password *`}
                                type={`text`}
                                id={`new_passowrd_input`}
                                placeholder={`Your new Password`}
                                desc={`Your New password- Manadatory`}
                                className={`input-md`}
                                name={`new_password`}
                            />
                        </FlexBox>
                    </ModalBody>
                    <ModalFooter className={`flex justify-start px-5 border-t py-2 bg-gray-50`}>
                      <button 
                            className={`px-5 py-2 text-[12px] rounded-md bg-taf-color text-white disabled:bg-gray-100`} 
                           >
                          Change Password
                      </button>
                    </ModalFooter>
                </ModalContainer>  
    
            </ModalWrapper>
      ) : null
    )
}

export default ForgotPasswordComponent