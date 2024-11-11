"use client"

import { useState } from "react";
import { Tables } from "@/types/supabase";
import TypingText from "../Minigames/TypingText/TypingText";
import Wpm from "../WpmCalculator/Wpm";
import { calculateWPM } from "../WpmCalculator/Wpm";
import ConsistencyCalculator from "../ConsistencyCalculator/ConsistencyCalculator";
import { GetUserExercise } from "../../../database/querries/exercises";
import { updateUserExercise, insertUserExercise } from "../../../server-actions/exercise-actions/actions";
import Link from "next/link";



interface props{
    data:{
        exercises: {
            content: string;
            next_exercise: string | null;
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

    exerciseCriteria : {
        time_criteria_exe: {
            time_sec: number;
        } | null;
        wpm_criteria_exe: {
            wpm: number;
        } | null;
        accuracy_criteria_exe: {
            accuracy_percentage: number;
        } | null;
        mistake_criteria_exe: {
            mistakes_allowed: number;
        } | null;
    } | null;
    exerciseID: string;
    userExercise: Tables<"user_exercises"> | null;
    nextExerciseStars:number;  
    
}

const ExcersiseWrapper = (props:props) => {
    const [resetCt, setResetCt] = useState(0);
    const [finishTime, setFinishTime] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
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
        setAccuracy(Math.ceil(accuracy));
        setMean(mean);
        setUnfinishedWords(unfinishedWords);
        
        if (unfinishedWords !== 0) return;

        let stars = onCompletionStars(accuracy,mistakes,finishTime,startTime,completeWordsCt);
        props.userExercise ? updateUserExercise(props.userExercise,stars, finishTime, startTime, completeWordsCt, accuracy):insertUserExercise(props.exerciseID,stars, finishTime, startTime, completeWordsCt, accuracy);
    }

    const onCompletionStars = (accuracy:number, mistakes:number, finishTime:number, startTime:number, completeWordsCt:number) =>{
        let stars = 0;
        if( props.exerciseCriteria?.accuracy_criteria_exe ?  props.exerciseCriteria.accuracy_criteria_exe.accuracy_percentage <= accuracy:false)
            stars++;
        if( props.exerciseCriteria?.mistake_criteria_exe ?  props.exerciseCriteria.mistake_criteria_exe.mistakes_allowed >= mistakes:false)
            stars++;
        if( props.exerciseCriteria?.time_criteria_exe ? props.exerciseCriteria.time_criteria_exe.time_sec >= (finishTime-startTime)/1000:false)
            stars++;
        if(props.exerciseCriteria?.wpm_criteria_exe ? props.exerciseCriteria.wpm_criteria_exe.wpm <= calculateWPM(startTime,finishTime,completeWordsCt):false)
            stars++;
            
        //add condition if another criteria is added
        return stars;

    }

    const onReset = () =>{
        setFinishTime(0);
        setResetCt(ct => ct + 1);
        onResetUpdateUserExercise();
    }

    const onResetUpdateUserExercise = async() => {
        props.userExercise = await GetUserExercise(props.exerciseID);
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
                        <div>raw wpm <Wpm startTime={startTime} endTime={finishTime} numOfWords={props.data?.exercises?.content.substring(0,props.data?.exercises?.content.length - unfinishedWords).split(' ').length}/> </div>
                        <div>wpm <Wpm startTime={startTime} endTime={finishTime} numOfWords={completeWordsCt}/></div>
                        <div>{accuracy.toString()+"%"}</div>
                    </div>
                    <div className="flex justify-around w-1/2">
                        <button onClick={onReset}>Restart</button>
                        { props.data.exercises.next_exercise && ( props.nextExerciseStars >= 2 || onCompletionStars(accuracy,mistakes,finishTime,startTime,completeWordsCt) >= 2) ? <Link href={{pathname:`/exercise/${props.data.exercises.next_exercise}`}}>Next</Link>: null}
                    </div>
                </div>
                
            </div>
            
             : null}
    
        </div>
        
    );
}

export default ExcersiseWrapper;