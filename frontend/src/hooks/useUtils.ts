import React, {useCallback, useState} from 'react'
import { file_menu } from '../constants/salesfilterOption';

const useUtils = () => {
    const [drop, setDrop] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<{[key: string]: boolean}>({})  
    const [activeLabel, setActiveLabel] = useState<string | null>(null);
    
    const [triggerModal, setTriggerModal] = useState<string | null>(null) // modal state inside the dropdown
    const [open, setOpen] = useState<boolean>(false)   // state for button based modal
    const [dropdown, setDropDown] = useState<boolean>(false) // state for dropdown menu 


    const handleIsOpenCloseMenu = (label: string) => {
        setIsOpen(prevState => ({
          ...prevState,
          [label]: !prevState[label],
        }));
      };

    // simple modal handler
    const handleIsOpenCloseMenuModal = useCallback(() => {
      setOpen(prevOpen => !prevOpen)
    }, [])

    // dropdown handler
    const handledropdownMenu = useCallback(() => {
      setDropDown(prevDropDown => !prevDropDown)
    }, [])

    const handleModalInDropDown = (path: string) => {
      setTriggerModal(path)
    }


    const wrapText = (text: string, maxLineLength: number = 10): string => {
      let wrappedText = '';
      for (let i = 0; i < text.length; i += maxLineLength) {
        wrappedText += text.substring(i, i + maxLineLength) + '\n';
      }
      return wrappedText;
    }


  return {
    isOpen,
    open,
    dropdown,
    activeLabel,
    setIsOpen,
    triggerModal,
    handleModalInDropDown,
    handledropdownMenu,
    handleIsOpenCloseMenu,
    handleIsOpenCloseMenuModal,
    setActiveLabel,
    wrapText,
    setOpen,
    setTriggerModal,
    setDropDown,

  


  }
}

export default useUtils