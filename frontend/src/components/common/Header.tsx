import React from 'react'
import { FlexInnerContainer, FlexBox, FlexBoxInner, Text, Div} from '../reusable/StyledComponent';
import { Link } from 'react-router-dom';
import { LiaPowerOffSolid } from "react-icons/lia";
import { TfiBell } from "react-icons/tfi";
import taf_logo from "../../assets/images/taf-logo.png"



const AppHeader = () => {
    return (
        <FlexInnerContainer className="flex justify-between items-center px-8 shadow-sm">
            <FlexBox className="flex space-x-3 items-center cursor-pointer px-8">
                {/* <Text className="text-[30px] text-primary-green">edms</Text> */}
                <img src={taf_logo} className='w-[70px] h-[70px]' />
                <FlexBoxInner className="flex ">
                  <Text className="text-[30px] text-taf-color font-semibold pt-1 tracking-wider">
                      TAF <span className="text-[13px]  block -mt-3 pl-1 text-green-500 tracking-normal">Oil ethiopia</span>                
                    </Text>   
                </FlexBoxInner>
            </FlexBox>
    
            <FlexBox className={`flex justify-between items-center space-x-3 px-8`}>
              {/* <Link to={`notification`} className="relative"> */}
                <Div className="text-[20px] w-8 h-8 bg-white flex justify-center items-center rounded-full relative">
                  <TfiBell />
                  <div className={`absolute -top-[6px] -right-1 text-[12px] w-4 h-4 flex justify-center items-center rounded-full text-white`}>Text</div> 
                </Div>
              
              {/* </Link> */}
              <button className="py-2 flex items-center hover:bg-taf-color rounded-md bg-gray-200 hover:text-white space-x-2 ml-5 px-5 cursor-pointer" >
                <LiaPowerOffSolid />
                <Text className="text-[12px]">Logout</Text>
              </button>
            </FlexBox>
        </FlexInnerContainer>
    );
 };

export default AppHeader

