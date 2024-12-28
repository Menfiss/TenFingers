"use client"
import { useEffect, useState } from "react";
import SandboxConfigurator from "./minigame_components/SandboxConfigurator/SandboxConfigurator";
import TypingText from "../TypingText/TypingText";
import TypingTextStats from "@/components/TypingTextStats/TypingTextStats";
import NotMobile from "@/components/NotMobile/NotMobile";



const Sandbox = () => {
    const [text, setText] = useState<string>("");
    const [backspace, setBackspace] = useState<boolean>(true);
    const [backwards, setBackwards] = useState<boolean>(false);
    const [survival, setSurvival] = useState<number>(0);
    const [time, setTime] = useState<number>(0);

    const [rerender, setRerender] = useState<number>(0);
    const [isMobile, setIsMobile] = useState(false);

    const [finishTime, setFinishTime] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [correctWordsCt, setCorrectWordsCt] = useState(0);
    const [consistencyArray, setConsistencyArray] = useState<number[]>([]);
    const [mean, setMean] = useState(0);
    const [unfinishedWords, setUnfinishedWords] = useState(0);

    const handleConfiguratorChange = (text:string, backspace:boolean, backwards:boolean, survival:number, time:number) => {
        setText(text);
        setBackspace(backspace);
        setBackwards(backwards);
        setSurvival(survival);
        setTime(time);
        setRerender(rerender+1);
        
    };

    const onCompletion = (startTime:number, fininshTime:number, completeWordsCt:number, mistakes:number, consistencyArray:number[], accuracy:number, mean:number, unfinishedWords:number) => {
        setFinishTime(fininshTime);
        setStartTime(startTime);
        setCorrectWordsCt(completeWordsCt);  
        setMistakes(mistakes);
        setConsistencyArray(consistencyArray);
        setAccuracy(Math.ceil(accuracy));
        setMean(mean);
        setUnfinishedWords(unfinishedWords);
    }

    const onReset = () => {
        setRerender(rerender+1);
        setFinishTime(0);
    };
      
    return (
        <div>
            <NotMobile setIsMobile={setIsMobile}/>
            {!isMobile ?
            <div>
                {finishTime === 0 ? 
                <>
                    <SandboxConfigurator setConfiguratorChanges={handleConfiguratorChange}/>
                    <TypingText key={rerender} onCompletion={onCompletion} text={text} survival={survival} backspace={backspace} backwards={backwards} timer={time}></TypingText>
                </>
                :

                <TypingTextStats 
                    onReset={onReset}
                    startTime={startTime}
                    finishTime={finishTime}
                    correctWordsCt={correctWordsCt}
                    mistakes={mistakes}
                    consistencyArray={consistencyArray}
                    accuracy={accuracy}
                    mean={mean}
                    unfinishedWords={unfinishedWords}
                    wordCount={text.split(" ").length}
                />}
            </div> :null}
        </div>
    );
};

export default Sandbox;