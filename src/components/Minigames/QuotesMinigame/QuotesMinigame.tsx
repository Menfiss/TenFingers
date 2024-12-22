"use client"

import JsonFilePicker from "@/components/JsonPicker/JsonPicker";
import { QuotesPaths } from "../../../../public/texts/quotes/QuotePaths";
import { useEffect, useState } from "react";
import TypingText from "../TypingText/TypingText";
import TypingTextStats from "@/components/TypingTextStats/TypingTextStats";

interface Quotes{
    language: string;
    quotes: {
        text:string,
        source : string,
        length: number,
        id: number
    }[];
};

const QuotesMinigame = () => {
    const [quotes, setQuotes] = useState<Quotes>();
    const [text, setText] = useState<string>("");
    const [source, setSource] = useState<string>("");
    const [startTime, setStartTime] = useState(0);
    const [finishTime, setFinishTime] = useState(0);
    const [correctWordsCt, setCorrectWordsCt] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [consistencyArray, setConsistencyArray] = useState<number[]>([]);
    const [accuracy, setAccuracy] = useState(0);
    const [mean, setMean] = useState(0);
    const [unfinishedWords, setUnfinishedWords] = useState(0);

    const [rerender, setRerender] = useState(0);

    const handleFileSelect = (data: any) => {
        setQuotes(data);
    };


    const getNewQuote = () => {
        if(quotes){
            const randomQuote = quotes.quotes[Math.floor(Math.random() * (quotes.quotes.length-1))];
            setText(randomQuote.text);
            setSource(randomQuote.source);
            setRerender(rerender + 1);
        }
    };
    
    const onReset = () => {
        getNewQuote();
        setFinishTime(0);
    };

    useEffect(() => {
        getNewQuote();
    }, [quotes]);

    const onCompletion = (startTime:number, fininshTime:number, correctWordsCt:number, mistakes:number, consistencyArray:number[], accuracy:number, mean:number, unfinishedWords:number) =>{
        setStartTime(startTime);
        setFinishTime(fininshTime);
        setCorrectWordsCt(correctWordsCt);
        setMistakes(mistakes);
        setConsistencyArray(consistencyArray);
        setAccuracy(accuracy);
        setMean(mean);
        setUnfinishedWords(unfinishedWords);
    }

    return (
        <div>
           
            
               
                {finishTime === 0 ? 
                <>
                    <div className="flex justify-center items-center flex-col mt-[10vh] mb-20">
                        <div className="flex mb-32">
                            <JsonFilePicker jsonFilePaths={QuotesPaths} onFileSelect={handleFileSelect}/>
                            <button onClick={(e) => {getNewQuote(); e.currentTarget.blur()}}><svg className="h-8 w-8 text-white hover:text-orange-500 transition duration-300"  width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5" />  <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5" /></svg></button>
                        </div>
                        <div className="text-xl">By: {source}</div>
                    </div>
                    <TypingText key={rerender} text={text} backspace={true} backwards={false} survival={0} timer={0} onCompletion={onCompletion} />
                </>
                :
                <TypingTextStats
                    startTime={startTime}
                    finishTime={finishTime}
                    correctWordsCt={correctWordsCt}
                    mistakes={mistakes}
                    consistencyArray={consistencyArray}
                    accuracy={accuracy}
                    mean={mean}
                    unfinishedWords={unfinishedWords}
                    wordCount={text.split(' ').length}
                    onReset={onReset}
                />}
                
            
        </div>
    );
};

export default QuotesMinigame;