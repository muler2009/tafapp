import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useGetStockQuery } from "../../../services/stockAPI";
import { useGetSalesInformationQuery } from "../../../services/salesAPI";
import CircularStockProgress from "./CircularStockProgress";
// Sample stock data


const StockProgressChart = () => {

  const {data: stock} = useGetStockQuery()  
  // Filter stock data for "Gasoil"
  const gasoilStock = stock?.filter((item) => item.nedaj_type === "Gasoil") ?? [];

  // Get the first gasoil stock item (if available)
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
  
  return (
    <div className="border rounded-md">
      {/* <div className="border-b py-2 px-5 bg-gray-50">
        <h1 className="font-IBMPlexSans font-semibold text-[#245187]">{fuelType}</h1>
      </div> */}
      <div className="flex space-x-5 px-5 py-5">
        <CircularStockProgress totalStock={totalStock} remaining={remaining} />
        <div className=" flex flex-col space-y-2">
          <div className="flex-grow border-b">
            <div className="flex flex-col space-y-1">
              <p className="text-[#69b2f8] text-sm font-Poppins uppercase font-semibold text-opacity-95">Sold Quantity</p>
              <h1 className="font-IBMPlexSans text-black text-xl ">{Number(soldQty).toFixed(2)} 
              <span className="text-[#333] text-opacity-80 pl-1 text-[13px] uppercase">Liters</span>
              </h1>
              <p className="text-[#333] text-[12px] font-Poppins text-opacity-50 text-nowrap">Total sold quantity from the current stock</p>
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex flex-col space-y-1">
              <p className="text-[#69b2f8] text-sm font-Poppins uppercase font-semibold text-opacity-95">SALE</p>
              <h1 className="text-green-500 text-xl font-IBMPlexSans">{totalPrice.toFixed(2)}
                <span className="text-[#333] text-opacity-80 pl-1 text-[13px]">ETB</span>
              </h1>
              <p className="text-[#333] text-[12px] font-Poppins text-opacity-50">Total sales in money for the current stock</p>
            </div>
          </div>
        </div>
      </div>     
    </div>
  );
};

export default StockProgressChart;


{/* <div className="relative w-full h-[25px] bg-gray-300 overflow-hidden py-2"> 
        <div className="absolute top-0 left-0 w-full h-full bg-gray-300" /> {/* Total Stock (Background) */}
        // <div className="absolute top-0 left-0 h-full bg-[#69b2f8] transition-all duration-500" style={{ width: `${remainingPercentage}%` }} />  {/* Remaining Stock (Foreground) */}
        // <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center font-semibold text-black">
        //   {Number(remainingPercentage).toFixed(2)} %
        // </div>
     // </div>       */}

   {/* Foreground Bar (Remaining Stock) */}


        
        {/* <ResponsiveContainer width="100%" height={100}>
          <BarChart data={stockData} layout="vertical" >
              <CartesianGrid vertical={true} horizontal={false} opacity={0.3} />
              <XAxis type="number" domain={[0, totalStock]}  fontFamily="Poppins" fontSize={10} tickLine={false} tickMargin={5} axisLine={false} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tickMargin={10} fontFamily="Poppins"
                  fontSize={10}/>
              <Tooltip />
          

              <Bar dataKey="total" stackId="stock" fill="#ddd" barSize={15} />
        
              <Bar dataKey="remaining" stackId="stock" fill="#4CAF50" barSize={15} />
          </BarChart>
        </ResponsiveContainer> */}