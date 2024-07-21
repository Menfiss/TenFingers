
import style from "./Column.module.css";
import { Tile } from "../../FallingMinigame";

interface props{
    tiles: Tile[];
    index: number;
}
const Column = (props:props) => {
    let stylee: React.CSSProperties ={
        position: "relative",
        top: "-10vh",
        width: "10vw",
        height: "10vh",
        border: "1px solid blue",
        color: "white",
    };
    return (
        <div className={style.coll}>
            {props.tiles.map((tile, index) => {
                if (tile.coll === props.index) {
                    stylee.top = tile.pos;
                    console.log(stylee.top);
                    return <div key={index} style={stylee}>{tile.char}</div>;
                }
            })}
        </div>
    );
}

export default Column;