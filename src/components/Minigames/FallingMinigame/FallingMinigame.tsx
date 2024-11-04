"use client";
import { useEffect, useState, useRef } from "react";
import Column from "./minigame_components/Column/Column";
import style from "./FallingMinigame.module.css";

interface props{
  onCompletion: (score:number) => void;
}

export interface ITile {
    char: string;
    coll: number;
    pos: number;
}
const FallingMinigame = (props:props) => {
    const [tiles, setTiles] = useState<ITile[]>([]);
    const tilesRef = useRef(tiles);
    const [speed, setSpeed] = useState<number>(10);
    const [speedIncrease, setSpeedIncrease] = useState<number>(10000); //time after which the speed increases
    const [spawnRate, setSpawnRate] = useState<number>(1000);
    const [gameEnded, setGameEnded] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [combo, setCombo] = useState<number>(1);
    const requestRef = useRef<number>();
    

    // figures out the collumn number based on the key pressed
    const getCollNum = (key:string) => {

      switch (key) {
          case "a": case "q": case "y":
              return 1;
          case "s": case "w": case "x":
              return 2;
          case "d": case "e": case "c":
              return 3;
          case "f": case "r": case "v": case "t": case "g": case "b":
              return 4;
          case "h": case "n": case "u": case "j": case "m": case "z":
              return 5;
          case "k": case "i":
              return 6;
          case "l": case "o":
              return 7;
          case "p":
              return 8;
          default:
              return 0;
      }
  }


    //sets the tilesRef to the current tiles
    useEffect(() => {
        tilesRef.current = tiles;
      }, [tiles]);
    
    //updates the position of the tiles
      useEffect(() => {
        let lastTime = performance.now();

        const updateTiles = (time:number) => {
          const deltaTime = (time - lastTime) / 1000; // Calculate time difference in seconds
          lastTime = time;

          setTiles((prevTiles) => {
            const newTiles = [...prevTiles];
            newTiles.map((tile, index) => {
                tile.pos += (speed * deltaTime);
                if (tile.pos >= 100) {
                    newTiles.splice(index, 1);
                    setGameEnded(true);
                }
            });
            return newTiles;
          });
          requestRef.current = requestAnimationFrame(updateTiles);
        };
    
        requestRef.current = requestAnimationFrame(updateTiles);
        return () => cancelAnimationFrame(requestRef.current!);
      }, [speed]);

    //increases the speed every 10 seconds
    const speedInterval =() => {
      setSpeed((prevSpeed) => prevSpeed + 0.1);
    }; 
    
    // spawns a new tile every spawnRate ms
    const spawnInterval = () => {
      let rand = Math.floor(Math.random() * 8) + 1;
      let randChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97);

      setTiles(prevTiles => {
          const newTiles = [...prevTiles];
          newTiles.push({char: randChar, coll: getCollNum(randChar), pos: -10});
          return newTiles;
      });
    }

    // handles the spawn and speed intervals
    useEffect(() => {

        const SpawnInterval = setInterval( spawnInterval, spawnRate);
        const SpeedInterval = setInterval( speedInterval, speedIncrease);

        const handleVisibilityChange = () => {
          if (document.hidden) {
            clearInterval(SpawnInterval);
            clearInterval(SpeedInterval);
          }
          else {
            setInterval(spawnInterval, spawnRate);
            setInterval(speedInterval, speedIncrease);
          }
        }
        
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
          clearInterval(SpawnInterval);
          clearInterval(SpeedInterval);
          document.removeEventListener('visibilitychange', handleVisibilityChange);
        }
        
    },[spawnRate,speed]);
    
    const handleScore = (position:number) => {
      if (position >= 70 && position <= 80) {
        //perfect
        setCombo((combo) => combo + 1);
        setScore((score) => score + 100 * combo);
        
      }
      else if (position >= 60 && position <= 90){
        //good
        setCombo((combo) => combo + 1);
        setScore((score) => score + 50 * combo);
      }
      else{
        //ok...
        setCombo(1);
        	
      }

    };


    const handleKeyDown = (event: KeyboardEvent) => {
      let found = false;
        tilesRef.current.forEach((tile, index) => {
          if (tile.char === event.key && found === false) {
            found = true;
            handleScore(tile.pos);
            setTiles(prevTiles => {
              const newTiles = [...prevTiles];
              newTiles.splice(index, 1);
              return newTiles;
            });
            
          }
        });
        if (found === false) {
          setGameEnded(true);
        }
      };

    //handles the keydown event
    useEffect(() => {
        
        window.addEventListener('keydown', handleKeyDown);
          
    
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
          };
      },[combo]);


    //run when the game ends
    useEffect(() => {
      if(gameEnded){
        props.onCompletion(score);
      }
        
    },[gameEnded]);

    return (
      <div>
        <div className={style.box}>
            
             <Column tiles={tiles} index={1}/>
             <Column tiles={tiles} index={2}/>
             <Column tiles={tiles} index={3}/>
             <Column tiles={tiles} index={4}/>
             <Column tiles={tiles} index={5}/>
             <Column tiles={tiles} index={6}/>
             <Column tiles={tiles} index={7}/>
             <Column tiles={tiles} index={8}/>
            
             <div className={style.line}></div>
             <div className={style.goodBox}></div>
             
        </div>
          <div>{score}</div>
        </div>
    );
}

export default FallingMinigame;

