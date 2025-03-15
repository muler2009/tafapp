import React from 'react'
import { useDailySalesSummaryQuery } from '../../../services/salesAPI'

const useCard = () => {

  const {data: summary} = useDailySalesSummaryQuery()

// List of fuel types to filter dynamically
const fuelTypes = ["Gasoil", "Petrol", "Diesel", "Kerosene"];

// Create a dynamic object where keys are fuel types and values are filtered stock
const stockByType = fuelTypes.reduce((acc, fuelType) => {
    acc[fuelType] = summary?.filter((item) => item.fuel_type === fuelType) ?? [];
    return acc;
}, {} as Record<string, typeof summary>);

const gasoilStock = stockByType["Gasoil"] ?? []
const petrolStock = stockByType["Petrol"] ?? []


  return{
    stockByType,
    gasoilStock,
    petrolStock
    
  }
}

export default useCard