"use client";
import { useEffect, useState, useRef } from "react";
import Column from "./minigame_components/Column/Column";
import style from "./FallingMinigame.module.css";

export interface ITile {
    char: string;
    coll: number;
    pos: number;
    spawnTime: number;
}
const FallingMinigame = () => {
    const [tiles, setTiles] = useState<ITile[]>([]);
    const tilesRef = useRef(tiles);
    const [speed, setSpeed] = useState<number>(1);
    const [spawnRate, setSpawnRate] = useState<number>(750);
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

  const level:ITile[] = [{char: "a", coll:getCollNum("a"), pos:1, spawnTime:0.4}, {char: "s", coll:getCollNum("s"), pos:1, spawnTime:1}, {char: "d", coll:getCollNum("d"), pos:1, spawnTime:2}, {char: "f", coll:getCollNum("f"), pos:1, spawnTime:4}, {char: "g", coll:getCollNum("g"), pos:1, spawnTime:5}, {char: "h", coll:getCollNum("h"), pos:1, spawnTime:6}, {char: "j", coll:getCollNum("j"), pos:1, spawnTime:7}, {char: "k", coll:getCollNum("k"), pos:1, spawnTime:8}, {char: "l", coll:getCollNum("l"), pos:1, spawnTime:9}, {char: "p", coll:getCollNum("p"), pos:1, spawnTime:10}];

    //sets the tilesRef to the current tiles
    useEffect(() => {
        tilesRef.current = tiles;
      }, [tiles]);
    
    //updates the position of the tiles
      useEffect(() => {
        const updateTiles = () => {
          setTiles((prevTiles) => {
            const newTiles = [...prevTiles];
            newTiles.map((tile, index) => {
                tile.pos += (speed * 0.1);
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
    useEffect(() => {
        const speedInterval = setInterval(() => {
          setSpeed((prevSpeed) => prevSpeed + 0.1);
        }, 10000); 
    
        return () => clearInterval(speedInterval);
      }, []);

    //spawn tiles in level
    const currTile = useRef(0);
    const currTime = useRef(0);
    const SpawnLevelInterval = () => {
      currTime.current = currTime.current + 0.1;
      while(true){
        if (level[currTile.current].spawnTime <= currTime.current) 
        {
          console.log(currTile.current)

          setTiles(prevTiles => {
            const newTiles = [...prevTiles];
            newTiles.push({char: level[currTile.current].char, coll: level[currTile.current].coll, pos: -10, spawnTime: level[currTile.current].spawnTime});
            return newTiles;
          });
          currTile.current++;
        }
        else{
          break;
        }
        if (currTile.current >= level.length) {
          currTile.current = 0;
          currTime.current = 0;
          break;
        }
      }
    }

    //spawns a new tile every spawnRate ms
    // const SpawnInterval = () => {
    //   let rand = Math.floor(Math.random() * 8) + 1;
    //         let randChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97);

    //         setTiles(prevTiles => {
    //             const newTiles = [...prevTiles];
    //             newTiles.push({char: randChar, coll: getCollNum(randChar), pos: -10});
    //             return newTiles;
    //         });
    // }

    //--------------------------------------------------------------------------------
    // const intervalIdRef = useRef(null);

    // const startSpawnInterval = () => {
    //   if (!intervalIdRef.current) {
    //     intervalIdRef.current = setInterval(() => SpawnInterval, spawnRate);
    //   }
    // }

    // const stopSpawnInterval = () => {
    //   if (intervalIdRef.current) {
    //     clearInterval(intervalIdRef.current);
    //     intervalIdRef.current = null;
    //   }
    // }



    useEffect(() => {

        // const Interval = setInterval( SpawnInterval, spawnRate);
        const Interval = setInterval( SpawnLevelInterval, 100);

        const handleVisibilityChange = () => {
          if (document.hidden) {
            clearInterval(Interval);
          }
          else {
            // setInterval(SpawnInterval, spawnRate);
            setInterval(SpawnLevelInterval, 100);
          }
        }
        
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
          clearInterval(Interval);
          document.removeEventListener('visibilitychange', handleVisibilityChange);
        }
        
    },[]);
    
    const handleScore = (position:number) => {
      if (position >= 70 && position <= 80) {
        //perfect
        console.log("perfect");
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


// add a score
// pre do the level with music
// stop when out of focus
// game ending
// when there are two same tiles there is a bug where two tiles are removed (maybe fixed)

export default FallingMinigame;

