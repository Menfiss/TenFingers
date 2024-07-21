
import style from "./Column.module.css";
import { ITile } from "../../FallingMinigame";
import Tile from "../Tile/Tile";

interface props{
    tiles: ITile[];
    index: number;
}
const Column = (props:props) => {
   
    return (
        <div className={style.coll} >
            {props.tiles.map((tile, index) => {
                if (tile.coll === props.index) {
                    return <Tile key={index} pos={tile.pos} char={tile.char} />;
                }
            })}
        </div>
    );
}

export default Column;