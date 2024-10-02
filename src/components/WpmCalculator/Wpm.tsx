"use client"


interface props{
    numOfWords:number
    startTime:number
    endTime:number
}
const Wpm = (props:props) => {

    const calculateWPM = (startTime:number, endTime:number, words:number) => {
        let timeElapsed = (endTime - startTime) / 60000;
        return Math.round(words / timeElapsed);
      }
    
    
    return (
        <div>
            {calculateWPM(props.startTime, props.endTime, props.numOfWords)}
        </div>
    )
}

export default Wpm;