"use client"
import FallingMinigame from "@/components/Minigames/FallingMinigame/FallingMinigame";
import { getHighScore, updateHighScore, insertHighScore } from "../../../../database/querries/drop_tiles";
import { useEffect, useState } from "react";

const DropTilesPage = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [highscore,setHighScore] = useState(0);
    const [highscoreExists, setHighScoreExists] = useState(true);
    const GetHighScore = async() => {
        let data = await getHighScore();
        if(data === undefined || data.length === 0){
            setHighScoreExists(false);
            return;
        }
        setHighScore(data[0].highscore);
    };
    
    const UpdateHighScore = async(score:number) => {
        let data = await updateHighScore(score);
    };

    const InsertHighScore = async(score:number) => {
        let data = await insertHighScore(score);
        setHighScoreExists(true);
    }

    const OnCompletion = (score:number) => {
        if(!highscoreExists){
            InsertHighScore(score);
        }
        else{
            if(score > highscore){
                UpdateHighScore(score);
            }
        }
        setGameStarted(false);
    }


    //get highscrore from database on render
    useEffect(()=>{
        GetHighScore();
    },[]);
    
    
    return(
        <>  
            
            {gameStarted ? 
            
                <FallingMinigame onCompletion={OnCompletion}/>
                
                :
                
                <div>
                    <button onClick={()=>setGameStarted(true)}>Start Game</button>
                    <div>{highscore}</div>
                </div>
            }
        </>
    );
};

export default DropTilesPage;
  