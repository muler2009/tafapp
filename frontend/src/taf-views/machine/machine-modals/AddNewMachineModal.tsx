import React from 'react'
import { ModalComponentPropsInterface, ModalProps } from '../../../interface/modal-interface'
import { ModalBody, ModalContainer, ModalFooter, ModalHeader, ModalWrapper } from '../../../components/reusable'
import { Text, Div, FlexBoxInner, FlexBox } from '../../../components/reusable/StyledComponent'
import * as VscIcons from 'react-icons/vsc'
import * as AiIcons from 'react-icons/ai'
import InputWithDesc from '../../../components/reusable/InputWithDesc'

const AddNewMachineModal = ({open, handleIsOpenCloseMenuModal, title}: ModalComponentPropsInterface) => {
  return (
    open ? (
        <ModalWrapper>
            <ModalContainer className={`w-[30%] mx-auto bg-gray-50 flex flex-col relative top-[20%] shadow-2xl rounded-[3px]`}>
                <ModalHeader className='flex justify-between items-center px-2 py-[10px] font-Poppins rounded-t-md border-b'>
                    <Text className='font-Poppins text-left px-5 text-[14px] flex-grow text-[#333]'>{title}</Text>
                    <Div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-full hover:bg-red-400 hover:text-white text-[#333]" onClick={handleIsOpenCloseMenuModal} > 
                        <VscIcons.VscClose size={15} />
                    </Div>
                </ModalHeader>
                <ModalBody className={`px-5 h-[30vh]`}>
                    <FlexBox className={`px-5 py-5 flex flex-col space-y-2`}>
                       <InputWithDesc 
                            label='Machine Name'
                            type='text'
                            id='machine_name_input'
                            name='machine_name'
                            placeholder='Enter machine name'
                            className='input-md'
                       />
                        <InputWithDesc 
                            label='Machine Code'
                            type='text'
                            id='machine_code_input'
                            name={`machine_code`}
                            placeholder={`Enter machine Code`}
                            className={`input-md text-[12px]`}
                            desc={`example: MAC-002`}
                       />

                         <Div className='relative'>
                            <select 
                                id={`label_input`}
                                className="select-md rounded-sm font-Poppins py-2 w-full text-[12px]" 
                                // value={selectedResource??""} 
                                // onChange={handleSelectChange}         
                            >
                                <option className='text-[#333] text-opacity-50 bg-gray-100'><p className='text-[#333] text-opacity-50'>--Select--</p></option>
                                <option value="" disabled>Select a resource</option>
                                <option value="app_level">App level Permission</option>
                                <option value="model_level">Model level Permission</option>
                            
                            </select>   
                            <span className='flex justify-center items-center absolute top-0 border right-0 text-gray-500 bg-gray-50 h-full w-[30px] pointer-events-none '>
                                <AiIcons.AiOutlineCaretDown  />
                            </span>
                        </Div>

                    </FlexBox>
                </ModalBody>
                <ModalFooter className={`flex justify-end pr-10 border-t py-2`}>
                    <button className={`px-5 py-2 text-[12px] rounded-md bg-taf-color text-white`}>
                        Submit
                    </button>
                </ModalFooter>
            </ModalContainer>

        </ModalWrapper>
  ) : null
)
}

export default AddNewMachineModal