import React, { useState, useEffect } from "react";
import useChart from "../hooks/useChart";

const HorizontalProgressBar = () => {
  const {
    petrolRemaining,
    petrolFuelType,
    petrolSoldQty,
    petrolTotalStock,
    petrolUnitPrice,
    getBarColor,
  } = useChart();

  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Animate the width of the remaining stock bar on mount
    const timer = setTimeout(() => {
      setWidth((petrolRemaining / petrolTotalStock) * 100);
    }, 100); // Delay to trigger animation

    return () => clearTimeout(timer);
  }, [petrolRemaining, petrolTotalStock]);

  console.log(petrolTotalStock);

  return (
    <div className={`flex flex-col  bg-white`}>
      <div className="border-b py-2 px-5 bg-gray-50">
        <h1 className="font-IBMPlexSans font-semibold text-[#245187]">
          Gasoil
        </h1>
      </div>
      <div className={`px-5 py-5 h-[300px]`}>
        <div className=" flex items-center justify-start font-semibold text-black">
          <p
            className="text-[25px] font-Poppins"
            style={{ color: getBarColor() }}
          >
            {`${
              isNaN(Number((petrolRemaining / petrolTotalStock) * 100))
                ? "0.0"
                : Number((petrolRemaining / petrolTotalStock) * 100).toFixed(2)
            } %`}
            <span className="font-normal text-[12px] font-Poppins block py-2">
              Remaining {petrolFuelType}
            </span>
          </p>
        </div>
        <div className="relative w-full h-[20px] bg-gray-300 overflow-hidden py-2 rounded-full">
          {/* Total Stock Background - always full gray */}
          <div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-full" />

          {/* Filled Portion - only show if width > 0 */}
          {width > 0 && (
            <div
              className="absolute top-0 left-0 h-full transition-all duration-1000 ease-out rounded-full"
              style={{ width, backgroundColor: getBarColor(), opacity: 0.7 }}
            />
          )}
        </div>
        <div className={`flex space-x-1 py-1`}>
          <div className="flex-grow">
            <div className="flex flex-col space-y-1 justify-center items-center">
              <h1 className="text-green-500 text-xl font-IBMPlexSans">
                {Number(petrolSoldQty).toFixed(2)}
                <span className="text-[#333] text-opacity-80 pl-1 text-[13px]">
                  Liters
                </span>
              </h1>
              <p className="text-[#333] text-[12px] font-Poppins text-opacity-50">
                {petrolFuelType} Sold Quantity
              </p>
            </div>
          </div>
          <div className="flex-grow px-4">
            <div className="flex flex-col space-y-1 justify-center items-center">
              <h1 className="text-green-500 text-xl font-IBMPlexSans">
                {(petrolSoldQty * petrolUnitPrice).toFixed(2)}
                <span className="text-[#333] text-opacity-80 pl-1 text-[13px]">
                  ETB
                </span>
              </h1>
              <p className="text-[#333] text-[12px] font-Poppins text-opacity-50">
                {petrolFuelType} Total Income in ETB
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HorizontalProgressBar;
