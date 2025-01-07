"use client"

import { useState } from "react";
import ShapeStrike from "../Minigames/ShapeStrike/ShapeStrike";
import NotMobile from "../NotMobile/NotMobile";
import { updateHighScore,insertHighScore } from "../../../database/querries/shape_strike";

interface props{
    highScore: number;
    waveCt: number;
}
const ShapeStrikeWrapper = (props:props) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [highScore, setHighScore] = useState<number>(props.highScore);
    const [waveCt, setWaveCt] = useState<number>(props.waveCt);
    
    const onCompleted = async(waveCt:number, score:number) => {
        if(highScore === 0 && score > 0){
            setHighScore(score);
            setWaveCt(waveCt);
            await insertHighScore(score, waveCt);

        }
        else if(score > highScore){
            setHighScore(score);
            setWaveCt(waveCt);
            await updateHighScore(score, waveCt);

        }
    }

    return (
    <div>
        <NotMobile setIsMobile={setIsMobile}/>

        {!isMobile && <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-11">
            <div className="flex flex-col justify-center items-center">
                {isStarted ? <ShapeStrike onCompleted={onCompleted}></ShapeStrike>:
            
                <div className="h-[540px] w-[960px] flex flex-col justify-center items-center bg-slate-700">
                    <button onClick={()=>setIsStarted(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">Play</button>
                        
                </div>}
            </div>
        </div>}
    </div>
    );
}

export default ShapeStrikeWrapper;