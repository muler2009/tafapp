import React, { useState } from 'react'
import { StockInterface } from '../../../interface/stock-interface'

const useStock = () => {

    const [stockData, setStockData] = useState<StockInterface>({
        nedaj_type: "", 
        total_liters: 0.00,
        unit_price: 0.00 
    })

    const handleStockInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const {type, name, value} = event.target
        setStockData({
            ...stockData,
            [name]: value
        })
    }

    const canSave = [...Object.values(stockData)].every(Boolean)

  return{
    stockData,
    canSave,
    handleStockInputChange
  }
}

export default useStock