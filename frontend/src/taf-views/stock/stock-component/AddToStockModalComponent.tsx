import React from 'react'
import * as VscIcons from 'react-icons/vsc'
import * as AiIcons from 'react-icons/ai'
import { ModalComponentPropsInterface, ModalProps } from '../../../interface/modal-interface'
import { ModalBody, ModalContainer, ModalFooter, ModalHeader, ModalWrapper } from '../../../components/reusable'
import { Text, Div, FlexBoxInner, FlexBox } from '../../../components/reusable/StyledComponent'
import useErrorState from '../../../hooks/useError'
import useStock from '../hooks/useStock'
import ErrorNotifierModal from '../../../components/errors/ErrorNotifierModal'
import { useGeFuelTypeQuery } from '../../../services/fuelTypeAPI'
import { useAddStockMutation } from '../../../services/stockAPI'

const AddToStockModalComponent = ({open, handleIsOpenCloseMenuModal, title}: ModalComponentPropsInterface) => {

    const {data: fuel_type, isSuccess} = useGeFuelTypeQuery()
    const {stockData, canSave, handleStockInputChange} = useStock()
    const [addStock] = useAddStockMutation()
    const {setErrorMessage, setErrors, setTriggerMessageModal, triggerMessageModal, errorMessage} = useErrorState()

    
    const onReadingSubmitClicked = async() => {
        try{
           const response = await addStock(stockData).unwrap()
           if(response.status_code === 201){
             handleIsOpenCloseMenuModal()
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
    open ? (
        <ModalWrapper>
            <ModalContainer className={`w-[30%] mx-auto flex flex-col relative top-[20%] shadow-2xl rounded-[3px] animate-fade-in-up`}>
                <ModalHeader className='flex justify-between items-center px-2 py-[10px] font-Poppins rounded-t-md border-b bg-taf-color text-white'>
                  <Text className='font-Poppins text-left px-5 text-[14px] flex-grow '>{title}</Text>
                  <Div className="w-5 h-5 flex justify-center items-center cursor-pointer rounded-md hover:bg-gray-100 hover:text-red-600 text-[#333]" onClick={handleIsOpenCloseMenuModal} > 
                      <VscIcons.VscClose size={15} />
                  </Div>
                </ModalHeader>
                <ModalBody className='px-5 h-[25vh] py-2 bg-gray-50'>
                    <FlexBoxInner className='px-5 flex flex-col space-y-2 py-4'>
                        <label className='text-[13px] text-opacity-50'>Select Specific Machine:</label>
                            <Div className='relative'>
                                <select 
                                    id={`nedaj_type_input`}
                                    className={`select-md rounded-sm font-Poppins w-full text-[12px]`} 
                                    name={`nedaj_type`}
                                    value={stockData?.nedaj_type} 
                                    onChange={handleStockInputChange}         
                                >
                                    <option >--Select Fuel --</option>
                                      {
                                        isSuccess ? (
                                            fuel_type.length && (
                                                fuel_type?.map((fuel, index) => {
                                                    return(
                                                        <option key={index}>{fuel.type_name}</option>
                                                    )
                                                })
                                            )
                                        ) : (
                                            <Text>Empty</Text>
                                        )
                                    }
                                    
                                </select>   
                                <span className='flex justify-center items-center absolute top-0 border right-0 text-gray-500 bg-gray-50 h-full w-[30px] pointer-events-none '>
                                    <AiIcons.AiOutlineCaretDown  />
                                </span>
                            </Div>

                            <Div className='flex space-x-3 py-5'>
                                <div className='flex space-y-2 flex-col'>
                                    <Text className='text-[13px] text-text-primary text-opacity-75 font-semibold'>Total Tank in Liter</Text>
                                    <div className="relative flex border border-gray-300 rounded">
                                        <input 
                                            type="number" 
                                            id="total_liters_input" 
                                            className={`input-md border-none rounded text-sm focus:border-gray-300 w-full`}  required 
                                            placeholder='0.00'
                                            name={`total_liters`}
                                            value={stockData?.total_liters}
                                            onChange={handleStockInputChange} 
                                        />
                                        <div className='bg-gray-100 flex items-center px-3 text-[13px] text-[#333] text-opacity-50'>
                                            <h1>Liters</h1>
                                        </div>  

                                    </div>
                                </div>
                                <div className='flex space-y-2 flex-col'>
                                    <Text className='text-[13px] text-text-primary text-opacity-75 font-semibold'>Unit Price </Text>
                                    <div className="relative flex border border-gray-300 rounded">
                                        <input 
                                            type="number" 
                                            id="unit_price_input" 
                                            className={`input-md border-none rounded text-sm focus:border-gray-300 w-full`}  
                                            name={`unit_price`}
                                            placeholder='0.00'
                                            value={stockData?.unit_price}
                                            onChange={handleStockInputChange} 
                                        />
                                        <div className='bg-gray-100 flex items-center px-3 text-[13px] text-[#333] text-opacity-50'>
                                            <h1>ETB</h1>
                                        </div>  
                                    </div>
                                </div>

                            </Div>

                    </FlexBoxInner>
                </ModalBody>
                <ModalFooter className={`flex justify-end pr-10 border-t py-2 bg-gray-50`}>
                  <button 
                        className={`px-5 py-2 text-[12px] rounded-md bg-taf-color text-white disabled:bg-gray-100`} 
                        disabled={!canSave} onClick={onReadingSubmitClicked}>
                      Save-To-Stock
                  </button>
                </ModalFooter>
            </ModalContainer>

            <ErrorNotifierModal 
              triggerMessageModal={triggerMessageModal} 
              errorMessage={errorMessage}
              setTriggerMessageModal={setTriggerMessageModal}
            />



        </ModalWrapper>
  ) : null
)
}


export default AddToStockModalComponent



   