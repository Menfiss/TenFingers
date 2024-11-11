"use client"

import JsonFilePicker from "@/components/JsonPicker/JsonPicker";
import { LanguagePaths } from "../../../../../../public/texts/languages/LanguagePaths";
import { useEffect, useState } from "react";
import CustomSettings from "../CustomSettings/CustomSettings";

interface Language{
    name:string,
    words:string[]
}

interface props{
    setConfiguratorChanges: (text:string, backspace:boolean, backwards:boolean, survival:number, time:number) => void
};

enum settings{
    wordsMode,
    timeMode,
    survivalMode,
    customMode
}

enum textCreationMode{
    json,
    custom
}

const SandboxConfigurator = (props:props) => {
    const [settingsMode, setSettingsMode] = useState<settings>(settings.wordsMode);
    const [textMode, setTextMode] = useState<textCreationMode>(textCreationMode.json);
    const [jsonData, setJsonData] = useState<Language>({name:"", words:[]});
    const [customData, setCustomData] = useState<string[]>([]);
    const [wordCt, setWordCt] = useState<number>(100);
    const [time, setTime] = useState<number>(0);
    const [backwards, setBackwards] = useState<boolean>(false);
    const [backspace, setBackspace] = useState<boolean>(true);
    const [survival, setSurvival] = useState<number>(0);
    const [punctuation, setPunctuation] = useState<boolean>(false);
    const [numbers, setNumbers] = useState<boolean>(false);

    const handleFileSelect = (data: any) => {
        setJsonData(data);
        setTextMode(textCreationMode.json);
    };

    const handleCustomData = (data: string[]) => {
        setCustomData(data);
        data.length > 0 ? setTextMode(textCreationMode.custom) : setTextMode(textCreationMode.json);
        
    };

    useEffect(() => {
        function generateStringJson(punctuation: boolean, numbers: boolean, words: string[], n: number): string {
            // Define possible punctuation characters and digits
            const punctuationChars = ['.', ',', '!', '?', ';', ':', '-', '(', ')', '[', ']', '{', '}', '"', "'"];
            const numberChars = '0123456789';
          
            const resultWords: string[] = [];
          
            // Helper function to get a random item from an array
            const getRandomItem = (array: string[]): string => array[Math.floor(Math.random() * array.length)];
          
            for (let i = 0; i < n; i++) {
              let word = getRandomItem(words);
          
              // Randomly add a number to the word if numbers are enabled
              if (numbers && Math.random() > 0.7) {
                word += getRandomItem(numberChars.split(''));
              }
          
              // Randomly add punctuation to the word if punctuation is enabled
              if (punctuation && Math.random() > 0.7) {
                word += getRandomItem(punctuationChars);
              }
          
              resultWords.push(word);
            }
          
            // Join all words with a space and return the final string
            return resultWords.join(' ');
        }

        function generateStringCustom(){

        };
        
        let a = generateStringJson(punctuation, numbers, jsonData.words,wordCt);
        props.setConfiguratorChanges(a, backspace, backwards, survival, time);
    }, [jsonData, wordCt, time, backwards, backspace, survival, punctuation, numbers, textMode]);


    const WordsSettings = () => {
        return (
            <div>
                <button className={wordCt === 10 ? "mx-1 text-orange-500": "mx-1"} onClick={() => setWordCt(10)}>10</button>
                <button className={wordCt === 25 ? "mx-1 text-orange-500": "mx-1"} onClick={() => setWordCt(25)}>25</button>
                <button className={wordCt === 50 ? "mx-1 text-orange-500": "mx-1"} onClick={() => setWordCt(50)}>50</button>
                <button className={wordCt === 100 ? "mx-1 text-orange-500": "mx-1"} onClick={() => setWordCt(100)}>100</button>
                <button className={wordCt === 250 ? "mx-1 text-orange-500": "mx-1"} onClick={() => setWordCt(250)}>250</button>
            </div>
        );
    };

    const TimeSettings = () => {
        return (
            <div>
                <button className={time === 0 ? "mx-1 text-orange-500": "mx-1"} onClick={() => setTime(0)}>off</button>
                <button className={time === 15 ? "mx-1 text-orange-500": "mx-1"} onClick={() => setTime(15)}>15</button>
                <button className={time === 30 ? "mx-1 text-orange-500": "mx-1"} onClick={() => setTime(30)}>30</button>
                <button className={time === 60 ? "mx-1 text-orange-500": "mx-1"} onClick={() => setTime(60)}>60</button>
                <button className={time === 120 ? "mx-1 text-orange-500": "mx-1"} onClick={() => setTime(120)}>120</button>
            </div>
        );
    };

    const SurvivalSettings = () => {
        return (
            <div>
                <button className={survival === 0 ? "mx-1 text-orange-500": "mx-1"} onClick={() => setSurvival(0)}>off</button>
                <button className={survival === 1 ? "mx-1 text-orange-500": "mx-1"} onClick={() => setSurvival(1)}>1</button>
                <button className={survival === 3 ? "mx-1 text-orange-500": "mx-1"} onClick={() => setSurvival(3)}>3</button>
                <button className={survival === 5 ? "mx-1 text-orange-500": "mx-1"} onClick={() => setSurvival(5)}>5</button>
            </div>
        );
    };


    return (
        <div onBlur={() => console.log("s")}>
            <div className="flex justify-evenly">
                <JsonFilePicker onFileSelect={handleFileSelect} jsonFilePaths={LanguagePaths} />
                <button className={settingsMode === settings.wordsMode ? "text-orange-500": ""} onClick={() => setSettingsMode(settings.wordsMode)}>Words</button>
                <button className={settingsMode === settings.timeMode ? "text-orange-500": ""} onClick={() => setSettingsMode(settings.timeMode)}>Time</button>
                <button className={settingsMode === settings.survivalMode ? "text-orange-500": ""} onClick={() => setSettingsMode(settings.survivalMode)}>Survival</button>
                <button className={settingsMode === settings.customMode || textMode === textCreationMode.custom ? "text-orange-500": ""} onClick={() => setSettingsMode(settings.customMode)}>Custom</button>
                <>|</>
                <button className= {backspace ? "text-orange-500":""} onClick={() => setBackspace(!backspace)}>No Backspace</button>
                <button className= {backwards ? "text-orange-500":""} onClick={() => setBackwards(!backwards)}>Backwards</button>
                <button className= {punctuation ? "text-orange-500":""} onClick={() => setPunctuation(!punctuation)}>Punctuation</button>
                <button className= {numbers ? "text-orange-500":""} onClick={() => setNumbers(!numbers)}>Numbers</button>
            </div>
            <div className="ml-[400px]">
                {settingsMode === settings.wordsMode ? WordsSettings() : null}
                {settingsMode === settings.timeMode ? TimeSettings() : null}
                {settingsMode === settings.survivalMode ? SurvivalSettings() : null}
                {settingsMode === settings.customMode ? <CustomSettings customData={customData} setCustomData={handleCustomData}/> : null}
            </div>
        </div>
    );
};

export default SandboxConfigurator;