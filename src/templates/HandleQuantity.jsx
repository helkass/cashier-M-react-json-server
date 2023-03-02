import React from "react";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import { FlexWrapper } from "./Flex";

const HandleQuantity = ({ onMinus, onPlus, quantity }) => {
   return (
      <FlexWrapper className="w-50" between>
         <ButtonQuantity onClick={onPlus}>
            <AiOutlinePlus color="white" />
         </ButtonQuantity>
         <span>{quantity}</span>
         <ButtonQuantity onClick={onMinus}>
            <AiOutlineMinus />
         </ButtonQuantity>
      </FlexWrapper>
   );
};

const ButtonQuantity = ({ children, onClick }) => {
   return (
      <button
         onClick={onClick}
         className="p-2 bg-primary text-white rounded-circle d-flex align-middle">
         {children}
      </button>
   );
};

export default HandleQuantity;
