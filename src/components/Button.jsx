import React from "react";

export const Button = ({ type, value, color }) => {
  return (
    <button
      className={`bg-${color}-300 rounded-md p-2 border-2 border-${color}-500 text-slate-700 text-md font-bold`}
    >
      {value}
    </button>
  );
};
