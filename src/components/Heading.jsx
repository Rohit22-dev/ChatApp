import React from "react";

export const Heading = ({ text }) => {
  return (
    <p className="text-2xl text-black pr-5 cursor-pointer hover:animate-bounce ease-in-out">
      {text}
    </p>
  );
};
