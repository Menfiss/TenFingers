"use client"

import {  useEffect, useMemo } from "react";

interface props{
    health:number,
    totalMistakes:number,
    setFinish: (Finish: boolean) => void
}
const Health = (props:props) => {

    const prepareHeartsArray = () =>{
        let heartsArray = [];
        for(let i = 0; i < props.health - props.totalMistakes; i++){
          heartsArray.push("♥");
        }
        for(let i = 0; i < props.totalMistakes; i++){
          heartsArray.push("x");
        }
        return heartsArray;
    }
    useEffect(() => {
      if(props.health - props.totalMistakes <= 0){
        props.setFinish(true);
      }
    }, [props.totalMistakes,props.health]);
    

    let heartsArray = useMemo(() => prepareHeartsArray(),[props.totalMistakes]);
    return( 
    <div className="flex">
        {heartsArray.map((heart, index) => (
        <div className="mx-px" key={index}>{heart}</div>
        ))}
    </div>
    );
};

export default Health;