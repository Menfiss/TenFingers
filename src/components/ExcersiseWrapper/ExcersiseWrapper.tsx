"use client"

import { useState} from "react";
import { Tables } from "@/types/supabase";
import TypingText from "../Minigames/TypingText/TypingText";
import ConsistencyCalculator from "../ConsistencyCalculator/ConsistencyCalculator";
import { GetUserExercise } from "../../../database/querries/exercises";
import { updateUserExercise, insertUserExercise } from "../../../server-actions/exercise-actions/actions";
import TypingTextStats from "../TypingTextStats/TypingTextStats";
import NotMobile from "../NotMobile/NotMobile";



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
    const [correctWordsCt, setCorrectWordsCt] = useState(0);
    const [consistencyArray, setConsistencyArray] = useState<number[]>([]);
    const [mean, setMean] = useState(0);
    const [unfinishedWords, setUnfinishedWords] = useState(0);
    
    const [isMobile, setIsMobile] = useState(false);



    const onCompletion = (startTime:number, finishTime:number, correctWordsCt:number, mistakes:number, consistencyArray:number[], accuracy:number, mean:number, unfinishedWords:number) =>{
        setFinishTime(finishTime);
        setStartTime(startTime);
        setCorrectWordsCt(correctWordsCt);  
        setMistakes(mistakes);
        setConsistencyArray(consistencyArray);
        setAccuracy(Math.ceil(accuracy));
        setMean(mean);
        setUnfinishedWords(unfinishedWords);
        
        if (unfinishedWords !== 0) return;

        props.userExercise ? updateUserExercise(props.userExercise, finishTime, startTime, correctWordsCt, accuracy):insertUserExercise(props.exerciseID, finishTime, startTime, correctWordsCt, accuracy);
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
            <NotMobile setIsMobile={setIsMobile}/>

            {!isMobile ?
            <div>
                {finishTime === 0 ? 
                <div className="mt-72">
                    <TypingText key={resetCt} onCompletion={onCompletion} text={props.data?.exercises?.content} 
                    backspace={props.data?.backspace_type_exe?.backspace ? props.data?.backspace_type_exe?.backspace:true} 
                    survival={props.data?.survival_type_exe?.health ? props.data?.survival_type_exe.health:-1} 
                    timer={props.data?.timer_type_exe?.time_sec ? props.data?.timer_type_exe.time_sec:-1} 
                    backwards={props.data?.backwards_type_exe?.backwards ? props.data?.backwards_type_exe?.backwards:false}></TypingText>
                </div>
                :

                <TypingTextStats 
                    stars={props.userExercise ? (props.userExercise.stars + 1 > 3 ? 3 : props.userExercise.stars) : 0}
                    startTime={startTime} 
                    finishTime={finishTime} 
                    correctWordsCt={correctWordsCt} 
                    mistakes={mistakes} 
                    consistencyArray={consistencyArray} 
                    accuracy={accuracy} 
                    mean={mean} 
                    unfinishedWords={unfinishedWords} 
                    wordCount={props.data?.exercises?.content.split(" ").length}
                    onReset={onReset}
                    nextLink={props.data.exercises.next_exercise && ( props.nextExerciseStars >= 1 || ( props.userExercise && props.userExercise.stars >= 1) || unfinishedWords === 0 ) ? `/exercise/${props.data.exercises.next_exercise}`: undefined}
                />
                }
            </div>:null}
        </div>
    );
}

export default ExcersiseWrapper;