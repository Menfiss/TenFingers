
import Link from "next/link";
import Wpm from "../WpmCalculator/Wpm";

interface props{
    onReset?: () => void;
    nextLink?: string;
    nextFunction?: () => void;
    startTime: number;
    finishTime: number;
    correctWordsCt: number;
    mistakes: number;
    consistencyArray: number[];
    accuracy: number;
    mean: number;
    unfinishedWords: number;
    wordCount: number;

}
const TypingTextStats = (props:props) => {

    return(
        <div className="absolute w-1/2 h-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-gray-700  flex items-center justify-center flex-col h-full w-full">
            <div>
                <div>raw wpm <Wpm startTime={props.startTime} endTime={props.finishTime} numOfWords={props.wordCount - props.unfinishedWords}/> </div>
                <div>wpm <Wpm startTime={props.startTime} endTime={props.finishTime} numOfWords={props.correctWordsCt}/></div>
                <div>{props.accuracy.toString()+"%"}</div>
            </div>
            <div className="flex justify-around w-1/2">
                { props.onReset ? <button onClick={props.onReset}>Restart</button> : null}
                { props.nextLink ? <Link href={{pathname: props.nextLink}}>Next</Link> : null}
                { !props.nextLink && props.nextFunction ? <button onClick={props.nextFunction}>Next</button> : null}
            </div>
        </div>
        
    </div>
    );
};

export default TypingTextStats;