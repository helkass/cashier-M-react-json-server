import React, { memo } from "react";
import { Badge } from "react-bootstrap";

import "../../styles/card.css";
const CardSlide = ({ orderStatus, orderName, orderId }) => {
   return (
      <div className="shadow-sm h-25 card-slide-order rounded w-25 bg-white p-2">
         <div className="d-flex justify-content-between">
            <h6>{orderName}</h6>
            <span className="text-muted small">{orderId}</span>
         </div>
         <Badge
            className="py-1 px-2"
            bg={orderStatus === "success" ? "primary" : "warning"}>
            {orderStatus}
         </Badge>
      </div>
   );
};

export default memo(CardSlide);
