"use client"


interface props{
    numOfWords:number
    startTime:number
    endTime:number
}
const Wpm = (props:props) => {

    return (
        <div>
            {calculateWPM(props.startTime, props.endTime, props.numOfWords)}
        </div>
    )
}

export default Wpm;

export function calculateWPM(startTime:number, endTime:number, words:number){
    return Math.round(words / ((endTime - startTime) / 60000));
}