import React from "react";

export const FlexWrapper = ({
   children,
   className,
   between,
   center,
   start,
}) => {
   return (
      <div
         className={`${className} d-flex gap-md-3 gap-sm-2 align-items-center ${
            between && "justify-content-between"
         } ${start && "justify-content-start"} ${
            center && "justify-content-center"
         }`}>
         {children}
      </div>
   );
};
