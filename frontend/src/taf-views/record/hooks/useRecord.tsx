import React, { useState } from 'react'
import { ReadingInterface } from '../../../interface/reading-interface'
import useUtils from '../../../hooks/useUtils'

const useRecord = () => {

    const [readingData, setReadingData] = useState<ReadingInterface>({
        machine: "",
        new_record: 0.00,
    })

    const handleRecordInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { type, name, value } = event.target
        
        setReadingData({
            ...readingData,
            [name]: value
        })
    }


    // Hide the submit unless all required fields are set
    const canSubmit= [...Object.values(readingData)].every(Boolean)

    


  return {
    readingData,
    handleRecordInputChange,
    canSubmit
  }
}

export default useRecord