import { useGetStockQuery } from "../../../services/stockAPI";


const useChart = () => {

    const {data: stock} = useGetStockQuery()  
    // Filter stock data for "Gasoil"
    const gasoilStock = stock?.filter((item) => item.nedaj_type === "Gasoil") ?? [];
    const petrolStock = stock?.filter(petrol => petrol.nedaj_type === "Petrol") ?? []
  
    // G;et the first gasoil stock item (if available)
    const firstGasoilStock = gasoilStock[0];
  
    // Extract soldQty and unit_price with default values
    const soldQty = firstGasoilStock?.sold_qty ?? 0;
    const unitPrice = firstGasoilStock?.unit_price ?? 0;
    const totalStock = firstGasoilStock?.total_liters ?? 0;
    const remaining = firstGasoilStock?.remaining ?? 0;
    const fuelType = firstGasoilStock?.nedaj_type ?? 0;
    // Calculate total price
    const totalPrice = soldQty * unitPrice;
    const remainingPercentage = (remaining / totalStock) * 100;


    // Relevant data of the petrol

    const petrolSoldQty = petrolStock[0]?.sold_qty ?? 0;
    const petrolUnitPrice = petrolStock[0]?.unit_price ?? 0;
    const petrolTotalStock = petrolStock[0]?.total_liters ?? 0;
    const petrolRemaining = petrolStock[0]?.remaining ?? 0;
    const petrolFuelType = petrolStock[0]?.nedaj_type ?? 0;


    const getBarColor = () => {
    if (petrolRemaining / petrolTotalStock < 0.3) return "#FF4D4D"; // Red if below 30%
    if (petrolRemaining / petrolTotalStock < 0.6) return "#FFA500"; // Orange if below 60%
    return "#245187"; // Green for 60% and above
    };

    // 🔹 Change color dynamically based on stock percentage
    const getCircularChartColor = () => {
    if (remaining / totalStock < 0.3) return "#FF4D4D"; // Red if below 30%
    if (remaining / totalStock < 0.6) return "#FFA500"; // Orange if below 60%
    return "#245187"; // Green for 60% and above
    };
        

    return{
        soldQty,
        unitPrice,
        totalStock,
        totalPrice,
        remainingPercentage,
        fuelType,
        remaining,
        petrolSoldQty,
        petrolRemaining,
        petrolFuelType,
        petrolTotalStock,
        petrolUnitPrice,
        getBarColor,
        getCircularChartColor

    }
}

export default useChart;