"use client"
import { useState } from "react";
import SandboxConfigurator from "./minigame_components/SandboxConfigurator/SandboxConfigurator";
import TypingText from "../TypingText/TypingText";



const Sandbox = () => {
    const [text, setText] = useState<string>("");
    const [backspace, setBackspace] = useState<boolean>(true);
    const [backwards, setBackwards] = useState<boolean>(false);
    const [survival, setSurvival] = useState<number>(0);
    const [time, setTime] = useState<number>(0);

    const [rerender, setRerender] = useState<number>(0);

    const handleConfiguratorChange = (text:string, backspace:boolean, backwards:boolean, survival:number, time:number) => {
        setText(text);
        setBackspace(backspace);
        setBackwards(backwards);
        setSurvival(survival);
        setTime(time);
        setRerender(rerender+1);
        
    };
    const onCompletion = (startTime:number, fininshTime:number, completeWordsCt:number, mistakes:number, consistencyArray:number[], accuracy:number, mean:number, unfinishedWords:number) => {

    }
    return (
        <div>
            <SandboxConfigurator setConfiguratorChanges={handleConfiguratorChange}/>
            <TypingText key={rerender} onCompletion={onCompletion} text={text} survival={survival} backspace={backspace} backwards={backwards} timer={time}></TypingText>
        </div>
    );
};

export default Sandbox;