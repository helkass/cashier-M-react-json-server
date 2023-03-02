import React from "react";
import { Image } from "react-bootstrap";
import { FlexWrapper } from "../templates/Flex";

import { AiOutlinePlus } from "react-icons/ai";
import { currencyFormater } from "../func/currencyFormater";

const CardProduct = ({ image, price, title, onClick, quantity }) => {
   return (
      <div
         className={`bg-white  rounded-md ${
            quantity ? " " : "shadow-xl card"
         } p-2`}>
         <FlexWrapper className="h-75" start>
            <Image
               src={image}
               alt="product-image"
               fluid
               className={`${quantity ? "w-25" : "w-50"}`}
               rounded
            />
            <div className="d-flex flex-column">
               <h6 className="font-weight-bold text-capitalize">{title}</h6>
               {quantity && (
                  <p>
                     Qty : <span>{quantity}</span>
                  </p>
               )}
            </div>
         </FlexWrapper>
         {!quantity && (
            <FlexWrapper between>
               {price !== undefined ? (
                  <p className="position-relative my-3 text-bold">
                     Rp. {currencyFormater(price)}
                  </p>
               ) : (
                  <p>size</p>
               )}
               <button
                  onClick={onClick}
                  className="bg-blue rounded px-4 py-2 d-flex align-items-center text-white">
                  <AiOutlinePlus size={19} />
               </button>
            </FlexWrapper>
         )}
      </div>
   );
};

export default CardProduct;
