"use client";
import { useEffect,useState, useRef } from "react";
import style from './PopUpText.module.css';

interface props{
    text: string;
    rerender: boolean;
}

const PopUpText = (props:props) => {

    const [currentClass, setCurrentClass] = useState("meh");
    const textRef = useRef<HTMLDivElement | null>(null);
  
    // ensures that the animation restarts when the class changes
    const changeClass = (newClass:string) => {
      if (textRef.current) {
        // Remove the existing class
        textRef.current.classList.remove(style.ok, style.perfect, style.meh);
        // Trigger reflow to restart animation
        void textRef.current.offsetWidth;
        // Add the new class
        textRef.current.classList.add(style[newClass]);
      }
      setCurrentClass(newClass);
    };

    const returnStyle = (text: string) => {
        if (text === "Perfect!") {
            return changeClass("perfect");
        }
        else if (text === "OK") {
            return changeClass("ok");
        }
        else{
            return changeClass("meh");
        }
    };

    useEffect(() => {returnStyle(props.text);}, [props.text, props.rerender]);
    
  return (
    <div ref={textRef} className={style.currentClass}>
        {props.text}
    </div>
  );
}

export default PopUpText;