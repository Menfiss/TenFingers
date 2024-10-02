"use client"

import { useState } from "react";
import Link from "next/link";
import TypingText from "../Minigames/TypingText/TypingText";
import Wpm from "../WpmCalculator/Wpm";
import ConsistencyCalculator from "../ConsistencyCalculator/ConsistencyCalculator";

interface props{
    text:string
    nextExerciseID: string
    nextExerciseStarsCt: number
}

const ExcersiseWrapper = (props:props) => {
    const [resetCt, setResetCt] = useState(0);
    const [finishTime, setFinishTime] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [accuracy, setAccuracy] = useState("");
    const [completeWordsCt, setCompleteWordsCt] = useState(0);
    const [consistencyArray, setConsistencyArray] = useState<number[]>([]);
    const [mean, setMean] = useState(0);
    
    const onCompletion = (startTime:number, finishTime:number, completeWordsCt:number, mistakes:number, consistencyArray:number[], accuracy:number, mean:number) =>{
        setFinishTime(finishTime);
        setStartTime(startTime);
        setCompleteWordsCt(completeWordsCt);  
        setMistakes(mistakes);
        setConsistencyArray(consistencyArray);
        setAccuracy(Math.ceil(accuracy).toString()+"%");
        setMean(mean);
    }

    const onCompletionStars = () =>{
        
    }

    const onReset = () =>{
        setFinishTime(0);
        setResetCt(ct => ct + 1);
    }

    return (
        <div>
            <TypingText key={resetCt} onCompletion={onCompletion} text={props.text} backspace={true}></TypingText>

            {finishTime !== 0 ? 
            <div className="absolute w-1/2 h-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
                <div className="bg-gray-700  flex items-center justify-center flex-col h-full w-full">
                    <div>
                        raw wpm <Wpm startTime={startTime} endTime={finishTime} numOfWords={props.text.split(' ').length}/>
                        wpm <Wpm startTime={startTime} endTime={finishTime} numOfWords={completeWordsCt}/>
                        <div>{accuracy}</div>
                    </div>
                    <div className="flex justify-around w-1/2">
                        <button onClick={onReset}>Restart</button>
                        { props.nextExerciseID !== "" ? <Link href={{pathname:`/exercise/${props.nextExerciseID}`}}>Next</Link>: null}
                    </div>
                </div>
                
            </div>
            
             : null}
    
        </div>
        
    )
}

export default ExcersiseWrapper;