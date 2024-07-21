"use client";
import { useEffect, useState, useRef } from "react";
import Column from "./minigame_components/Column/Column";
import style from "./FallingMinigame.module.css";

export interface ITile {
    char: string;
    coll: number;
    pos: number;
}
const FallingMinigame = () => {
    const [tiles, setTiles] = useState<ITile[]>([]);
    const tilesRef = useRef(tiles);
    const [speed, setSpeed] = useState<number>(1.5);
    const [distance, setDistance] = useState<number>(1);   
    const [spawnRate, setSpawnRate] = useState<number>(750);
    const [currentLetter, setCurrentLetter] = useState<string>("");
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
        const updateTiles = () => {
          setTiles((prevTiles) => {
            const newTiles = [...prevTiles];
            newTiles.map((tile, index) => {
                tile.pos += (speed * 0.1);
                if (tile.pos >= 100) {
                    newTiles.splice(index, 1);
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
        console.log(speed);
        const speedInterval = setInterval(() => {
          setSpeed((prevSpeed) => prevSpeed + 0.1);
        }, 10000); // Increase speed every 10 seconds
    
        return () => clearInterval(speedInterval);
      }, []);

    //spawns a new tile every spawnRate ms
    useEffect(() => {

        const interval = setInterval(() => {
            let rand = Math.floor(Math.random() * 8) + 1;
            let randChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97);

            setTiles(prevTiles => {
                const newTiles = [...prevTiles];
                newTiles.push({char: randChar, coll: getCollNum(randChar), pos: -10});
                return newTiles;
            });
        }, spawnRate);
        return () => clearInterval(interval);
        
    },[]);
    
    //handles the keydown event
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            tilesRef.current.forEach((tile, index) => {
              if (tile.char === event.key) {
                setTiles(prevTiles => {
                  const newTiles = [...prevTiles];
                  newTiles.splice(index, 1);
                  return newTiles;
                });
              }
            });
          };

        window.addEventListener('keydown', handleKeyDown);
          
    
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
          };
      },[]);

    return (
        <div className={style.box}>
             <Column tiles={tiles} index={1}/>
             <Column tiles={tiles} index={2}/>
             <Column tiles={tiles} index={3}/>
             <Column tiles={tiles} index={4}/>
             <Column tiles={tiles} index={5}/>
             <Column tiles={tiles} index={6}/>
             <Column tiles={tiles} index={7}/>
             <Column tiles={tiles} index={8}/>
        </div>
    );
}


// add a score
// pre do the level with music
// stop when out of focus
// game ending
// when there are two same tiles there is a bug where two tiles are removed (maybe fixed)

export default FallingMinigame;

