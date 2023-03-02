import React, { useState } from "react";

const NavCategory = ({ onSelect, cats, isActive }) => {
   return (
      <div className="bg-gray-md rounded-xl w-75 mx-auto p-1 my-4 flex-wrap gap-2">
         {cats.map((cat, idx) => (
            <button
               key={idx}
               onClick={() => onSelect(cat)}
               className={`${
                  isActive === cat
                     ? "bg-white shadow-sm"
                     : "bg-transparent text-gray"
               } px-4 py-1 w-25 rounded-xl`}>
               {cat}
            </button>
         ))}
      </div>
   );
};

export default NavCategory;
