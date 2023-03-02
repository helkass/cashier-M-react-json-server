import React from "react";

import "../styles/sliderContainer.css";

const SliderContainer = ({ children }) => {
   return (
      <div className="my-2 d-flex flex-nowrap gap-2 slider-container">
         {children}
      </div>
   );
};

export default SliderContainer;
