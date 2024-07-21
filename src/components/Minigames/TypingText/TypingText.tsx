"use client"
import { useEffect, useState, useMemo } from "react";
import Letter from "../../Letter/Letter";
import styles from "./TypingText.module.css";
import Wpm from "../../WpmCalculator/Wpm";
import ConsistencyCalculator from "../../ConsistencyCalculator/ConsistencyCalculator";


interface props{
    text:string
}

const TypingText = (props:props) => {
    const [letterClasses, setLetterClasses] = useState<string[]>(Array(props.text.length).fill('undiscovered'));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentLetter, setCurrentLetter] = useState(props.text[0]);
    const [isFinished, setIsFinished] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [finishTime, setFinishTime] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [time, setTime] = useState(new Date().getTime()); //time between each key press
    const [consistencyArray, setConsistencyArray] = useState<number[]>([]); //array of times between each key press in milliseconds
    const [currentRow, setCurrentRow] = useState(1);
    const [rowWidth, setRowWidth] = useState(50); // max number of letters in a row

    const letterArray = useMemo(() => props.text.split(''), [props.text]);
    

    //switches classes of letters
    const updateLetterClasses = (newIndex:number, newClass:string, oldIndex:number, oldClass:string) => {
      setLetterClasses(prevClasses => {
        const newClasses = [...prevClasses];
        newClasses[newIndex] = newClass;
        newClasses[oldIndex] = oldClass;
        return newClasses;
      });
    };

    //calculates the number of words that are without mistakes
    const calculateCompleteWords = () =>{
      let words = 0;
      let wrongCounter = 0;
      for(let i = 0; i < letterArray.length; i++){
        if(letterClasses[i] === "wrong" && letterArray[i] !== " "){
          wrongCounter++;
        }
        else if((letterArray[i] === " " || i === letterArray.length -1) && wrongCounter === 0){
          words++;
        }
        else if(letterArray[i] === " "){
          wrongCounter = 0;
        }
      }
      return words;
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
      console.log(rows);
      return rows;
    }
    const rows:number[] = useMemo(() => prepareRows(),[rowWidth,props.text]) //index array 0-> element1 first row, element1->element2 second row etc.
    

    // this runs every time a key is pressed
    const handleKeyDown = (event:KeyboardEvent) => {

      if(event.key === currentLetter){
        updateLetterClasses(currentIndex, "correct", currentIndex + 1, "current");
        setCurrentLetter(letterArray[currentIndex + 1]);
        setCurrentIndex(prevIndex => prevIndex + 1);

        if(isStarted){
          let timeElapsed = new Date().getTime() - time;
          setConsistencyArray(prevArray => [...prevArray, timeElapsed]);
        }
        else{
          setIsStarted(true);
          setStartTime(new Date().getTime());
        }

        setTime(new Date().getTime());

        }
        else if(event.key === "Backspace"){
          if(currentIndex === 0){
            return;
          }
          updateLetterClasses(currentIndex, "undiscovered", currentIndex - 1, "current");
          setCurrentLetter(letterArray[currentIndex - 1]);
          setCurrentIndex(prevIndex => prevIndex - 1);
        }
        else if(event.key === "Alt" || event.key === "Control" || event.key === "Shift" || event.key === "AltGraph" || event.key === "CapsLock" || event.key === "Tab" || event.key === "Enter" || event.key === "Escape" || event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "Delete" || event.key === "Home" || event.key === "End" || event.key === "PageUp" || event.key === "PageDown" || event.key === "Insert"){
          return;
        }
        else if (event.key !== currentLetter){
          updateLetterClasses(currentIndex, "wrong", currentIndex + 1, "current");
          setCurrentLetter(letterArray[currentIndex + 1]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        }

        if(currentIndex === letterArray.length - 1){
          calculateCompleteWords();
          setIsFinished(true);
          setFinishTime(new Date().getTime());          
        }
    };
  
    // set the first letter to be the current letter
    useEffect(() => {
      setLetterClasses(prevClasses => {
        const newClasses = [...prevClasses];
        newClasses[0] = "current";
        return newClasses;
      });
    }, []);

    //takes care of the keydown event listener
    useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      
      if(currentIndex > rows[currentRow] && currentRow+4 < rows.length){
        setCurrentRow(prevRow => prevRow + 1);
      }
      else if(currentIndex <= rows[currentRow - 1] && currentRow !== 1){
        setCurrentRow(prevRow => prevRow - 1);
      }

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [currentIndex]);
  
    return (
      <>
      <div className={styles.box}>

        <div className={styles.row}>
          {letterArray.slice(rows[currentRow - 1], rows[currentRow]).map((letter, index) => (
            <Letter key={index} letter={letter} className={letterClasses[index + rows[currentRow - 1]]}/>
          ))}
        </div>
        <div className={styles.row}>
          {rows.length >= 2 ? letterArray.slice(rows[currentRow], rows[currentRow + 1]).map((letter, index) => (
            <Letter key={index} letter={letter} className={letterClasses[index + rows[currentRow]]}/>
          )) : null}
        </div>
        <div className={styles.row}>
          {rows.length >= 3 ?letterArray.slice(rows[currentRow + 1], rows[currentRow + 2]).map((letter, index) => (
            <Letter key={index} letter={letter} className={letterClasses[index + rows[currentRow + 1]]}/>
          )) : null}
        </div>
        <div className={styles.row}>
          {rows.length >= 4 ? letterArray.slice(rows[currentRow + 2], rows[currentRow + 3]).map((letter, index) => (
            <Letter key={index} letter={letter} className={letterClasses[index + rows[currentRow + 2]]}/>
          )) : null}
        </div>
       
      </div>
      <div>
        {isFinished ? <Wpm startTime={startTime} endTime={finishTime} numOfWords={props.text.split(' ').length}/> : null}
        {isFinished ? <Wpm startTime={startTime} endTime={finishTime} numOfWords={calculateCompleteWords()}/> : null}
        {isFinished ? <ConsistencyCalculator consistencyArray={consistencyArray}/> : null}
      </div>
      </>
    );
};


export default TypingText;

