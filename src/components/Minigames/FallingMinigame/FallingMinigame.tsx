"use client";
import { useEffect, useState } from "react";
import Column from "./minigame_components/Column/Column";
import style from "./FallingMinigame.module.css";

export interface Tile {
    char: string;
    coll: number;
    pos: number;
}
const FallingMinigame = () => {
    const [tiles, setTiles] = useState<Tile[]>([{char: "a", coll: 1, pos:-10}, {char: "b", coll: 2, pos:-10}, {char: "c", coll: 3, pos:-10}, {char: "d", coll: 4, pos:-10}, {char: "e", coll: 5, pos:-10}, {char: "f", coll: 6, pos:-10}, {char: "g", coll: 7, pos:-10}, {char: "h", coll: 8, pos:-10}]);
    const [speed, setSpeed] = useState<number>(100);

    useEffect(() => {
        const interval = setInterval(() => {
            setTiles(prevTiles => {
                const newTiles = [...prevTiles];
                newTiles.map((tile) => {
                    tile.pos += 10;
                });
                return newTiles;
            });
            
        }, speed);
        return () => clearInterval(interval);
    }, []);
    

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

//every coll has its own use state for tiles
//make tile comnponent
//find a way to make the tiles fall smoother maybe: requestAnimationFrame
//handle keypresses
// music and sound effects
// add a score
// pre do the level with music

export default FallingMinigame;

