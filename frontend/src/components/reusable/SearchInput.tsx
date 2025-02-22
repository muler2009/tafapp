import React, { useState, useRef } from "react";
import { FlexBox, FlexInnerContainer } from "./StyledComponent";
import { InputInterface } from "../../interface/Input-select.interface";
import { CiSearch } from "react-icons/ci";

const SearchInput = ({id, type, name, placeholder, onChange, value, label, className, disabled }: InputInterface) => {
  return (
    <FlexInnerContainer className="flex flex-col text-sm">
      <FlexBox className="flex flex-col gap-0">
        <label htmlFor={name} className="flex items-center text-[15px] whitespace-nowrap font-Rubik text-[#333] text-opacity-80">
          {label}
        </label>
      </FlexBox>
      <FlexBox className="flex flex-col gap-1">
        <div className="relative">
          {/* Search icon */}
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <CiSearch className="w-5 h-5 text-gray-400" />
          </span>
            {/* Input field */}
            <input
              id={id}
              type={type}
              name={name}
              className={`${className} pl-10 w-full`} // Add padding to the left to avoid overlapping
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              disabled={disabled}
            />
        </div>
      </FlexBox>
    </FlexInnerContainer>
  );
};

export default SearchInput;