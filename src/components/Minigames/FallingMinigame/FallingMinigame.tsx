"use client";
import { useEffect, useState, useRef } from "react";
import Column from "./minigame_components/Column/Column";
import PopUpText from "./minigame_components/PopUpText/PopUpText";
import { GameDifficulty } from "@/components/FallingMinigameWrapper/FallingMinigameWrapper";



interface props{
  onCompletion: (score:number) => void;
  swappedZ: boolean;
  difficulty: GameDifficulty;
}

export interface ITile {
    char: string;
    coll: number;
    pos: number;
}
const FallingMinigame = (props:props) => {
    const [tiles, setTiles] = useState<ITile[]>([]);
    const tilesRef = useRef(tiles);
    const [speed, setSpeed] = useState<number>(10 * props.difficulty);
    const [speedIncrease, setSpeedIncrease] = useState<number>(10000); //time after which the speed increases
    const [spawnRate, setSpawnRate] = useState<number>(1000);
    const [gameEnded, setGameEnded] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [combo, setCombo] = useState<number>(1);
    const [popUp, setPopUp] = useState<string>("");
    const [rerenderPopUp, setRerenderPopUp] = useState<boolean>(false);
    const requestRef = useRef<number>();
    

    // figures out the collumn number based on the key pressed
    const getCollNum = (key:string) => {

      switch (key) {
          case "a": case "q": case props.swappedZ ? "y" : "z":
              return 1;
          case "s": case "w": case "x":
              return 2;
          case "d": case "e": case "c":
              return 3;
          case "f": case "r": case "v": case "t": case "g": case "b":
              return 4;
          case "h": case "n": case "u": case "j": case "m": case props.swappedZ ? "z" : "y":
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
                    console.log(tile.char);
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
        setScore((score) => score + 100 * combo * props.difficulty);
        setPopUp("Perfect!");
        setRerenderPopUp((rerenderPopUp) => !rerenderPopUp);
        
      }
      else if (position >= 60 && position <= 90){
        //good
        setCombo((combo) => combo + 1);
        setScore((score) => score + 50 * combo * props.difficulty);
        setPopUp("OK");
        setRerenderPopUp((rerenderPopUp) => !rerenderPopUp);

      }
      else{
        //ok...
        setCombo(1);
        setPopUp("Meh");
        setRerenderPopUp((rerenderPopUp) => !rerenderPopUp);

        	
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

    //scrolls to the game on render
      useEffect(() => {
        const targetElement = document.getElementById("game");
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "instant" });
        }
      }, [])


    //run when the game ends
    useEffect(() => {
      if(gameEnded){
        props.onCompletion(score);
      }
        
    },[gameEnded]);

    
    return (
      <div id="game" className="flex justify-center overflow-clip">
        <div className="absolute z-10 text-4xl mt-10">{score}</div>
        <div className="absolute z-10 text-4xl mt-24"><PopUpText text={popUp} rerender={rerenderPopUp}/></div>
        <div className="flex justify-center h-screen w-[80vw] object-contain overflow-hidden">
            
             <Column tiles={tiles} index={1}/>
             <Column tiles={tiles} index={2}/>
             <Column tiles={tiles} index={3}/>
             <Column tiles={tiles} index={4}/>
             <Column tiles={tiles} index={5}/>
             <Column tiles={tiles} index={6}/>
             <Column tiles={tiles} index={7}/>
             <Column tiles={tiles} index={8}/>
            
             <div className="absolute border-red-500 border-[1px] top-[80vh] w-[80vw]"></div>
             <div className="absolute -z-10 top-[70vh] w-[80vw] h-[20vh] border-white border-y-[1px]"></div>
        </div>
      </div>
    );
}

export default FallingMinigame;

