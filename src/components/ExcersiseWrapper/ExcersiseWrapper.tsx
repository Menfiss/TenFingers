"use client"

import { useState } from "react";
import Link from "next/link";
import TypingText from "../Minigames/TypingText/TypingText";
import Wpm from "../WpmCalculator/Wpm";
import ConsistencyCalculator from "../ConsistencyCalculator/ConsistencyCalculator";

interface props{
    data:{exercises: {
        content: string;
        } | null;
        backwards_type_exe: {
            backwards: boolean;
        } | null;
        timer_type_exe: {
            time_sec: number;
        } | null;
        survival_type_exe: {
            health: number;
        } | null;
        backspace_type_exe: {
            backspace: boolean;
        } | null;
    } | null
    // nextExerciseID: string
    // nextExerciseStarsCt: number
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
    const [unfinishedWords, setUnfinishedWords] = useState(0);
    
    const onCompletion = (startTime:number, finishTime:number, completeWordsCt:number, mistakes:number, consistencyArray:number[], accuracy:number, mean:number, unfinishedWords:number) =>{
        setFinishTime(finishTime);
        setStartTime(startTime);
        setCompleteWordsCt(completeWordsCt);  
        setMistakes(mistakes);
        setConsistencyArray(consistencyArray);
        setAccuracy(Math.ceil(accuracy).toString()+"%");
        setMean(mean);
        setUnfinishedWords(unfinishedWords);
    }

    const onCompletionStars = () =>{
        
    }

    const onReset = () =>{
        setFinishTime(0);
        setResetCt(ct => ct + 1);
    }
    if(props.data?.exercises?.content === undefined){
        return(<>Something went wrong</>);
    }
    return (
        <div>
            <TypingText key={resetCt} onCompletion={onCompletion} text={props.data?.exercises?.content} 
            backspace={props.data?.backspace_type_exe?.backspace ? props.data?.backspace_type_exe?.backspace:true} 
            survival={props.data?.survival_type_exe?.health ? props.data?.survival_type_exe.health:-1} 
            timer={props.data?.timer_type_exe?.time_sec ? props.data?.timer_type_exe.time_sec:-1} 
            backwards={props.data?.backwards_type_exe?.backwards ? props.data?.backwards_type_exe?.backwards:false}></TypingText>

            {finishTime !== 0 ? 
            <div className="absolute w-1/2 h-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
                <div className="bg-gray-700  flex items-center justify-center flex-col h-full w-full">
                    <div>
                        raw wpm <Wpm startTime={startTime} endTime={finishTime} numOfWords={props.data?.exercises?.content.substring(0,props.data?.exercises?.content.length - unfinishedWords).split(' ').length}/>
                        wpm <Wpm startTime={startTime} endTime={finishTime} numOfWords={completeWordsCt}/>
                        <div>{accuracy}</div>
                    </div>
                    <div className="flex justify-around w-1/2">
                        <button onClick={onReset}>Restart</button>
                        {/* { props.nextExerciseID !== "" ? <Link href={{pathname:`/exercise/${props.nextExerciseID}`}}>Next</Link>: null} */}
                    </div>
                </div>
                
            </div>
            
             : null}
    
        </div>
        
    );
}

export default ExcersiseWrapper;