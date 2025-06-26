import React, { useState } from 'react'
import { MachineInterface } from '../../../interface/machine-interface'

const useMachine = () => {
    const [machineData, setMachineData] = useState<MachineInterface>({
        machine_name: "",
        machine_code: 0,
        nedaj_type: ""
    })

    const handleMachineInputChanges = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const {type, name, value } = event.target
        setMachineData({
            ...machineData,
            [name]: value
        })
    }

    const canSubmit= [...Object.values(machineData)].every(Boolean)

    const reset = () => {
      setMachineData({
        machine_name: "",
        machine_code: 0,
        nedaj_type: ""
      })
    }

  return {
    machineData,
    handleMachineInputChanges,
    canSubmit,
    reset
  }
}

export default useMachine