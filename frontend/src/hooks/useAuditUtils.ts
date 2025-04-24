import React from 'react'

const useAuditUtils = () => {
  // Generic type guard to check if data is an array of any type T
  const isArrayOfType = <T>(data: unknown): data is T[] => {
    return Array.isArray(data);
  };

  return {
    isArrayOfType,
  };

  

  
};

export default useAuditUtils