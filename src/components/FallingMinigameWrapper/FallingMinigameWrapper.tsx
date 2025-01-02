"use client";
import {updateHighScore, insertHighScore } from "@/../database/querries/drop_tiles";
import { useEffect, useState } from "react";
import FallingMinigame from "../Minigames/FallingMinigame/FallingMinigame";
import NotMobile from "../NotMobile/NotMobile";
import FallingStatistics from "../Minigames/FallingMinigame/minigame_components/FallingStatistics/FallingStatistics";

interface props{
    highscore: number;
}

export enum GameDifficulty {
    EASY = 1,
    MEDIUM = 2,
    HARD = 3,
}

const FallingMinigameWrapper = (props:props) => {
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [renderStats, setRenderStats] = useState<boolean>(false);
    const [highscore, setHighScore] = useState<number>(props.highscore);
    const [prevScore, setPrevScore] = useState<number>(0);
    const [highscoreExists, setHighScoreExists] = useState<boolean>(props.highscore !== 0 ? true : false);
    const [swappedZ, setSwappedZ] = useState<boolean>(false); //false = qwerty
    const [difficulty, setDifficulty] = useState<GameDifficulty>(GameDifficulty.EASY);

    const [isMobile, setIsMobile] = useState<boolean>(false);

    const UpdateHighScore = async(score:number) => {
        let data = await updateHighScore(score);
    };

    const InsertHighScore = async(score:number) => {
        let data = await insertHighScore(score);
    }

    const OnCompletion = (score:number) => {
        setPrevScore(score);
        setRenderStats(true);
        if(!highscoreExists){
            InsertHighScore(score);
            setHighScoreExists(true);
        }
        else if (score > highscore){
            UpdateHighScore(score);
        }
        if(score > highscore){
            setHighScore(score);
        }
    }

    const handleCheckboxChange = (event:any) => {
        setSwappedZ(event.target.checked);
        localStorage.setItem("swappedZ", event.target.checked);
      };

      // check localstorage for checkbox state
      useEffect(() => {
        const storedData = localStorage.getItem("swappedZ");
        if (storedData) {
          setSwappedZ(storedData === "true" ? true : false);
        }
      }, []);

    return(
        <div>

            <NotMobile setIsMobile={setIsMobile}/>
            {!isMobile ? <div>
            {!gameStarted ? <div className="flex flex-col items-center h-[calc(100vh-4.5rem)] justify-around">
            <div className="text-2xl flex flex-col items-center"><div>{highscore}</div><div>highscore</div></div>
            <div>
                <div className="flex text-xl items-center justify-center mb-4">Select difficulty</div>
                <div className="flex flex-row gap-8">
                    <button className="p-28 border-slate-700 border rounded-2xl hover:bg-slate-600 transition duration-300 ease-in-out" onClick={() => {setDifficulty(GameDifficulty.EASY);setGameStarted(true)}}>EASY</button>
                    <button className="p-28 border-slate-700 border rounded-2xl hover:bg-slate-600 transition duration-300 ease-in-out" onClick={() => {setDifficulty(GameDifficulty.MEDIUM);setGameStarted(true)}}>MEDIUM</button>
                    <button className="p-28 border-slate-700 border rounded-2xl hover:bg-slate-600 transition duration-300 ease-in-out" onClick={() => {setDifficulty(GameDifficulty.HARD);setGameStarted(true)}}>HARD</button>
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" onClick={(e) => e.currentTarget.blur()} checked={swappedZ} onChange={(e) => handleCheckboxChange(e)}/>
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600"></div>
                    <span className="absolute w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform peer-checked:translate-x-5 peer-checked:border-white top-0.5 left-0.5 dark:border-gray-600"></span>
                </label>
                <div>Swap Z with Y</div>
                <div className="text-gray-600">Off = QWERTY</div>
            </div>
            
            </div>
            :
            <div>

            {renderStats ? <FallingStatistics score={prevScore} highscore={highscore} setGameStarted={setGameStarted} setRenderStats={setRenderStats}/> 
            :<FallingMinigame onCompletion={OnCompletion} swappedZ={swappedZ} difficulty={difficulty}/>}

            </div>
            }</div>:null}
        </div>
    );
};

export default FallingMinigameWrapper;