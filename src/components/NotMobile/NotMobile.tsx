"use client";

import { useEffect, useState } from "react";


interface props{
    setIsMobile: (isMobile:boolean) => void;
}

const NotMobile = (props:props) => {
    const [render, setRender] = useState<boolean>(false);
    useEffect(() => {
        const handleResize = () => {
          props.setIsMobile(window.innerWidth <= 768 ? true : false);
          setRender(window.innerWidth <= 768 ? true : false);
        };
    
        handleResize();
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    return (
        render ? 
        
        <div className="flex justify-center items-center text-center text-xl h-full w-full mt-[50%]">
            <h1>Sorry, this page is not available on mobile</h1>
        </div> 
        
        : 
        
        <></>
        
    )
};

export default NotMobile;