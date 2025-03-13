import React, {useState, useEffect} from 'react'
import { useGetStockQuery } from "../../../services/stockAPI";

interface CircularStockProgressProps {
    totalStock: number;
    remaining: number;
    size?: number;
    strokeWidth?: number;
  }

const CircularStockProgress = ({totalStock, remaining, size= 180, strokeWidth=20}: CircularStockProgressProps) => {

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const remainingPercentage = (remaining / totalStock) * 100;
    const progress = (remaining / totalStock) * circumference;

      // 🔹 Change color dynamically based on stock percentage
  const getStrokeColor = () => {
    if (remaining / totalStock < 0.3) return "#FF4D4D"; // Red if below 30%
    if (remaining / totalStock < 0.6) return "#FFA500"; // Orange if below 60%
    return "#245187"; // Green for 60% and above
  };
    
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    // Animate progress when component mounts
    const animationTimeout = setTimeout(() => {
      setAnimatedProgress((remaining / totalStock) * circumference);
    }, 300); // Delay for smooth effect

    return () => clearTimeout(animationTimeout);
  }, [remaining, totalStock, circumference]);
  
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Circle (Total Stock) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#ddd"
          strokeWidth={strokeWidth}
          fill="none"
        />
  
        {/* Foreground Circle (Remaining Stock) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getStrokeColor()}
          strokeOpacity={0.7}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - animatedProgress}
          strokeLinecap="butt"
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // Rotates to start from the top
          style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }}
        />
  
        {/* Text Label */}
        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="25" fontWeight="bold" fill={getStrokeColor()} fontFamily='Poppins'>
          {`${Number(remainingPercentage).toFixed(2)} %`} 
        </text>
        <text x="50%" y="50%" textAnchor="middle" dy="2em" fontSize="12" fill="#000" fontFamily='Poppins' opacity={0.7}>
         Remaining 
        </text>
      </svg>
    );
  };

export default CircularStockProgress