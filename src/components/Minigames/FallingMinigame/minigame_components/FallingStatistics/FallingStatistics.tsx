
interface props{
    score: number;
    highscore: number;
    setGameStarted: (value:boolean) => void;
    setRenderStats: (value:boolean) => void;
}

const FallingStatistics = (props:props) => {

    return(
        <div className="flex justify-center items-center flex-col h-[calc(100vh-4.5rem)] gap-16">

            <div className="flex flex-col items-center gap-4">
                <div className="mb-9 text-3xl">Game Over</div>
                <div className="text-xl">Score: {props.score}</div>
                <div className="text-xl text-cyan-400">{props.highscore === props.score ? "New Highscore!":null}</div>
            </div>
            
            <div className="flex items-center gap-9">
                <button onClick={() => {props.setGameStarted(false); props.setRenderStats(false)}}><div className="border border-slate-700 px-6 py-3 rounded-full hover:bg-slate-600 transition duration-300 ease-in-out">Menu</div></button>
               <button onClick={() => props.setRenderStats(false)}> <div className="border border-slate-700 px-6 py-3 rounded-full hover:bg-slate-600 transition duration-300 ease-in-out">Restart</div></button>
            </div>
        </div>
    )
}

export default FallingStatistics;