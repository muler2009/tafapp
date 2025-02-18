import React from 'react'
import { ModalProps } from '../../interface/modal-interface'

const ModalContainer = ({children, className}: ModalProps) => {
    return (
      <div className={className} >
          {children}
      </div>
    )
  }

export default ModalContainer