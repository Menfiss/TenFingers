"use client"

import { useEffect, useState } from "react";
import ShapeStrike from "../Minigames/ShapeStrike/ShapeStrike";
import NotMobile from "../NotMobile/NotMobile";
import { updateHighScore,insertHighScore } from "../../../database/querries/shape_strike";
import Image from "next/image";
import basicEnemy from "../../../public/img/basicEnemy.png";
import fastEnemy from "../../../public/img/fastEnemy.png";
import shootingEnemy from "../../../public/img/shootingEnemy.png";
import healingEnemy from "../../../public/img/healingEnemy.png";
import explodingEnemy from "../../../public/img/explodingEnemy.png";


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

    useEffect(() => {setIsStarted(false)}, [isMobile]);

    return (
    <div>
        <NotMobile setIsMobile={setIsMobile}/>

        {!isMobile && <div className="mx-auto max-w-[960px] px-4 md:px-0 mt-11">
            <div className="flex flex-col justify-center items-center">
                {isStarted ? <ShapeStrike onCompleted={onCompleted}></ShapeStrike>:
            
                <div className="h-[540px] w-[960px] flex flex-col justify-center items-center bg-slate-700 rounded-xl">
                    <button onClick={()=>setIsStarted(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">Play</button>
                        
                </div>}
                
            </div>
            <div className="flex flex-col">
                    <div className="my-4 text-3xl">Shape Strike</div>
                    <div>HighScore: {highScore}</div>
                    <div>Wave: {waveCt}</div>
                    <div className="my-4 text-2xl">How to play:</div>
                    <div>Just type the word that appears above the shape to destroy it. </div>
                    <div>But beware that some shapes are better to destroy sooner than later.</div>
                    <div className="my-4 text-2xl">Score:</div>
                    <div>Each time you destroy a shape, its word length is multiplied by combo and the result adds to your score.</div>
                    <div>You get combo by typing letters, it fills your combo bar and raises up to 5x.</div>
                    <div>If you get the letter wrong it resets to 1x, so be careful what you type.</div>
                    <div className="my-4 text-2xl">Enemies:</div>
                    <div className="flex flex-row mb-8">
                        <div><Image src={basicEnemy} alt=""></Image></div>
                        <div className="flex justify-center items-end ml-4">...Nothing speacial just basic enemy</div>
                    </div>
                    <div className="flex flex-row mb-8">
                        <div><Image src={fastEnemy} alt="" width={64} height={64}></Image></div>
                        <div className="flex justify-center items-end ml-4">...Now this guy is speed itself. Most of the time you will die to this guy.</div>
                    </div>
                    <div className="flex flex-row mb-8">
                        <div><Image src={shootingEnemy} alt="" width={64} height={64}></Image></div>
                        <div className="flex justify-center items-end ml-4">...Ever heard of a guy taking a gun to a knife fight? This is him he will stay back and shoot at ya.</div>
                    </div>
                    <div className="flex flex-row mb-8">
                        <div><Image src={healingEnemy} alt=""></Image></div>
                        <div className="flex justify-center items-end ml-4">...If you need medic this is the guy you call. He will sometimes heal the shape you are trying to destroy.</div>
                    </div>
                    <div className="flex flex-row mb-8">
                        <div><Image src={explodingEnemy} alt="" width={64} height={64}></Image></div>
                        <div className="flex justify-center items-end ml-4">...This guy has big anger issues. If you destroy him, he will take everyone close to him to hell.</div>
                    </div>
                </div>
        </div>}
    </div>
    );
}

export default ShapeStrikeWrapper;