"use client"

import React, { ReactNode, useState } from "react";

interface props {
    wpm: number;
    accuracy: number;
    time: number;
    children: ReactNode;
}

const Tooltip: React.FC<props> = ({ wpm,accuracy,time, children }) => {

  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  return (
    <div className="relative inline-block cursor-pointer "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>

      {isVisible && wpm !== 0 && 
      <span className="text-center absolute z-50 left-[50%] bottom-[0] -translate-x-1/2 whitespace-nowrap opacity-0 transition-opacity rounded-lg hover:visible hover:opacity-100 bg-slate-800">
        <div className="flex flex-col text-left text-xs p-6 px-8 gap-2">
          <div>Wpm: {wpm}</div>
          <div>Acc: {accuracy}%</div>
          <div>Time: {time}s</div>
        </div>
      </span>}
      {children}
    </div>
  );
};

export default Tooltip;