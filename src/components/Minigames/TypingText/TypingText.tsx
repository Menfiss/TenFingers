"use client"
import { useEffect, useState, useMemo } from "react";
import Letter from "./minigame_components/Letter/Letter";
import Timer from "./minigame_components/Timer/Timer";
import Health from "@/components/Minigames/TypingText/minigame_components/Health/Health";


interface props{
    text:string
    onCompletion: (startTime:number, fininshTime:number, completeWordsCt:number, mistakes:number, consistencyArray:number[], accuracy:number, mean:number, unfinishedWords:number, totalMistakes:number) => void
    backspace:boolean
    survival:number // health counter
    timer:number //in seconds
    backwards:boolean
    onStart?: () => void
}


const TypingText = (props:props) => {
    const [letterClasses, setLetterClasses] = useState<string[]>(Array(props.text.length).fill('undiscovered')); //array of classes for each letter
    const [currentIndex, setCurrentIndex] = useState(props.backwards ? props.text.length-1:0); //current index of the letter that the user is typing
    const [currentLetter, setCurrentLetter] = useState(props.backwards ? props.text[props.text.length-1]:props.text[0]); //current letter that the user is typing
    const [isFinished, setIsFinished] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [time, setTime] = useState(new Date().getTime()); //time between each key press
    const [totalTime, setTotalTime] = useState(0); //sum of all times between each key press
    const [consistencyArray, setConsistencyArray] = useState<number[]>([]); //array of times between each key press in milliseconds
    const [currentRow, setCurrentRow] = useState(1); 
    const [rowWidth, setRowWidth] = useState(50); // max number of letters in a row
    const [totalMistakes, setTotalMistakes] = useState(0);
    const [finishedWords, setFinishedWords] = useState(0);

    const letterArray = useMemo(() => props.text.split(''), [props.text]);
    const totalWords = useMemo(() => props.text.split(' ').length, [props.text]);

    
    //switches classes of letters
    const updateLetterClasses = (oldIndex:number, oldClass:string, newIndex:number, newClass:string) => {
      setLetterClasses(prevClasses => {
        const newClasses = [...prevClasses];
        newClasses[newIndex] = newClass;
        newClasses[oldIndex] = oldClass;
        return newClasses;
      });
    };

    //if the text is backwards, the class is changed to backwards for style compatibility
    const IsBackwardsClassChanger = (className:string) =>{
      if(props.backwards){
        return className + "backwards";
      }
      return className;
    }

    //calculates the number of correct words, incorrect words and mistakes
    const calculateTextStats = () =>{

      let correctClass = props.backwards ? "correctbackwards" : "correct";
      let stats: [number,number,number] = [0,0,0]; // 0-> correct words, 1-> incorrect words, 2-> mistakes
      let mistakesCounter = 0;

      for(let i = 0; i < letterArray.length; i++){
        if(letterClasses[i] != correctClass){
          mistakesCounter++;
        }
        if((letterArray[i] === " " || i === letterArray.length -1) && mistakesCounter === 0){
          stats[0]++;
        }
        else if(letterArray[i] === " " || i === letterArray.length -1){
          stats[1]++;
          stats[2] += mistakesCounter;
          mistakesCounter = 0;
        }
      }
      return stats;
    }

    //prepares the rows of the text
    const prepareRows = () => {
      let rows = [];
      rows.push(0);
      let lettCt = 0;
      let spaceIndex = -1;
      for(let i = 0; i < letterArray.length; i++){
        lettCt++;
        if (letterArray[i] === " "){
          spaceIndex = i;
        }
        if (lettCt === rowWidth){
          if(spaceIndex !== -1){
            rows.push(spaceIndex+1);
            i = spaceIndex;
            lettCt = 0;
            spaceIndex = -1;
          }
          else{
            rows.push(i+1);
            lettCt = 0;
          }
        }
        
      }
      if (lettCt !== 0){
        rows.push(letterArray.length -1);
      }
      rows[rows.length - 1] += 1;

      if (props.backwards && rows.length > 5){
        setCurrentRow(rows.length - 4);
      }

      return rows;
    }
    let rows:number[] = useMemo(() => prepareRows(),[rowWidth,props.text]) //index array 0-> element1 first row, element1->element2 second row etc.
    
    // this runs every time a key is pressed
    const handleKeyDown = (event:KeyboardEvent) => {
      const addNumber = props.backwards ? -1 : 1;
      
      if(isStarted){
        let timeElapsed = new Date().getTime() - time;
        setTotalTime(prevTime => prevTime + timeElapsed);
        setConsistencyArray(prevArray => [...prevArray, timeElapsed]);
      }
      else{
        setIsStarted(true);
        props.onStart ? props.onStart() : null;
        setStartTime(new Date().getTime());
      }
      setTime(new Date().getTime());

      if(event.key === currentLetter){
        currentLetter === " " ? setFinishedWords(prevWords => prevWords + 1) : null;
        updateLetterClasses(currentIndex, IsBackwardsClassChanger("correct"), currentIndex + addNumber, IsBackwardsClassChanger("current"));
        setCurrentLetter(letterArray[currentIndex + addNumber]);
        setCurrentIndex(prevIndex => prevIndex + addNumber);
      }
      else if(event.key === "Backspace"){
        if((currentIndex === 0 && !props.backwards) || !props.backspace || (currentIndex === letterArray.length-1 && props.backwards)){
          return;
        }
        letterArray[currentIndex - addNumber] === " " ? setFinishedWords(prevWords => prevWords - 1) : null;
        updateLetterClasses(currentIndex, "undiscovered", currentIndex - addNumber, IsBackwardsClassChanger("current"));
        setCurrentLetter(letterArray[currentIndex - addNumber]);
        setCurrentIndex(prevIndex => prevIndex - addNumber);
        return;
      }
      else if(event.key === "Alt" || event.key === "Control" || event.key === "Shift" || event.key === "AltGraph" || event.key === "CapsLock" || event.key === "Dead"){
        return;
      }
      else if (event.key !== currentLetter){
        currentLetter === " " ? setFinishedWords(prevWords => prevWords + 1) : null;
        updateLetterClasses(currentIndex, IsBackwardsClassChanger("wrong"), currentIndex + addNumber, IsBackwardsClassChanger("current"));
        setCurrentLetter(letterArray[currentIndex + addNumber]);
        setCurrentIndex(prevIndex => prevIndex + addNumber);
        setTotalMistakes(prevMistakes => prevMistakes + 1);
      }

      //check if on end of the excersise
      if(!props.backwards && currentIndex === letterArray.length - 1){
        setIsFinished(true);
      }
      else if(props.backwards && currentIndex === 0){
        setIsFinished(true);
      }
    };

    
  
    // set the first letter to be the current letter on Start
    useEffect(() => {
      setLetterClasses(prevClasses => {
        const newClasses = [...prevClasses];
        props.backwards ? newClasses[newClasses.length-1] = "currentbackwards":newClasses[0] = "current";
        return newClasses;
      });
    }, []);
    
    //manages current row and key down event
    useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);

      
      if(props.backwards){
        if(currentIndex < rows[currentRow] && currentRow !== 1){
          setCurrentRow(prevRow => prevRow - 1);
        }
        else if(currentIndex >= rows[currentRow + 1] && currentRow < rows.length - 4){
          setCurrentRow(prevRow => prevRow + 1);
        }
      }
      else{
        if(currentIndex > rows[currentRow] && currentRow+4 < rows.length){
          setCurrentRow(prevRow => prevRow + 1);
        }
        else if(currentIndex <= rows[currentRow - 1] && currentRow !== 1){
          setCurrentRow(prevRow => prevRow - 1);
        }
      }
      
        
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [currentIndex]);

    // On completion of the exercise
    useEffect(() => {
      if(isFinished){
        window.removeEventListener('keydown', handleKeyDown);

        let [correctWords, incorrectWords, currMistakes] = calculateTextStats();
        let unfinishedLetters = props.backwards ? currentIndex + 1 : letterArray.length - currentIndex;
        let unfinishedWords = unfinishedLetters > 0 ? props.text.substring(0, unfinishedLetters).split(" ").length : 0;
        let accuracy = totalMistakes > letterArray.length ? 0 : Math.round(((letterArray.length - (totalMistakes + unfinishedLetters))/ letterArray.length) *100);
        props.onCompletion(startTime,new Date().getTime(),correctWords,currMistakes,consistencyArray, accuracy, totalTime/consistencyArray.length, unfinishedWords, totalMistakes);
      }
    },[isFinished]);
  
    return (
      <>
        
        <div className="flex justify-center items-center flex-col mx-auto">
          
          
          <div className="flex flex-col justify-start items-start gap-1">
            <div className="flex flex-row justify-between items-center w-full">
              <div className="items-start text-3xl pb-2">
                {finishedWords}/{totalWords}
              </div>
              <div className="flex flex-row gap-10 text-xl mr-4">
                {props.survival > 0 && !isFinished ? <Health health={props.survival} totalMistakes={totalMistakes} setFinish={setIsFinished}/>:null}
                {props.timer > 0 ? <Timer time={props.timer} start={isStarted} setFinish={setIsFinished}/> : null}
                {props.backspace ? null : <div>No Backspace</div>}
              </div>
            </div>
            <div className="flex justify-center items-center gap-1">
              {letterArray.slice(rows[currentRow - 1], rows[currentRow]).map((letter, index) => ( 
                <Letter key={index} letter={letter} className={letterClasses[index + rows[currentRow - 1]]}/>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-1">
            {rows.length >= 2 ? letterArray.slice(rows[currentRow], rows[currentRow + 1]).map((letter, index) => (
              <Letter key={index} letter={letter} className={letterClasses[index + rows[currentRow]]}/>
            )) : null}
          </div>

          <div className="flex justify-center items-center gap-1">
            {rows.length >= 3 ?letterArray.slice(rows[currentRow + 1], rows[currentRow + 2]).map((letter, index) => (
              <Letter key={index} letter={letter} className={letterClasses[index + rows[currentRow + 1]]}/>
            )) : null}
          </div>

          <div className="flex justify-center items-center gap-1">
            {rows.length >= 4 ? letterArray.slice(rows[currentRow + 2], rows[currentRow + 3]).map((letter, index) => (
              <Letter key={index} letter={letter} className={letterClasses[index + rows[currentRow + 2]]}/>
            )) : null}
          </div>
        
        </div>
      </>
    );
};


export default TypingText;

