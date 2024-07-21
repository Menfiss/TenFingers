

interface props{
    pos: number;
    char: string;
}
const Tile = (props:props) => {
    let tileStyle: React.CSSProperties ={
        position: 'absolute',
        top: `${props.pos}vh`,        
        width: '10vw',
        height: '10vh',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2em',
        border: '1px solid blue',
    };


    return(
        <div style={tileStyle}>{props.char}</div>
    );
}

export default Tile;