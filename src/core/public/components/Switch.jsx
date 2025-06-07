import { useState } from "react";

const Switch = ({ checked = false, onCheckedChange = () => {} }) => {
  return (
    <div
      onClick={() => onCheckedChange(!checked)}
      className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        checked ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-gray-50 w-5 h-5 rounded-full shadow-md transform duration-300 ${
          checked ? "translate-x-3.5" : ""
        }`}
      />
    </div>
  );
};

export default Switch;
