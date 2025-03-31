"use client";

import { useState } from "react";
import AddType from "./AddType";
import { EditExerciseFunc } from "../../../../server-actions/admin-actions/actions";
import JsonFilePicker from "@/components/JsonPicker/JsonPicker";
import { LanguagePaths } from "../../../../public/texts/languages/LanguagePaths";

interface props{
    backspaceType : backspaceType;
    backwardsType : backwardsType;
    timerType : timerType;
    survivalType : survivalType;
    currentSectionId: string | null;
    currentExerciseId: string | null;
    data:Section
    exerciseTypes: ExerciseTypes;
}

interface Language{
    name:string,
    words:string[]
}
const EditExercise = (props:props) => {

        const [showForm, setShowForm] = useState<boolean>(false);
        const [jsonData, setJsonData] = useState<Language>({name:"", words:[]});
        const [text, setText] = useState<string>(props.data ? props.data[props.data?.findIndex((x) => x.id === props.currentSectionId)].exercises[props.data[props.data.findIndex((x) => x.id === props.currentSectionId)].exercises.findIndex((x) => x.id === props.currentExerciseId)].content:"");
        const [letters, setLetters] = useState<string>("");
        const [wordCt, setWordCt] = useState<number>(10);

        const handleFileSelect = (data: any) => {
            setJsonData(data);
        };
    
        const generateText = (data:Language, letters:string[], wordCt:number) => {
            let possibleWords = []; 
            for(let i = 0; i < data.words.length; i++){
                let good = true;
                for(let j = 0; j < data.words[i].length; j++){
                    if(letters.includes(data.words[i][j])){
                        
                    }
                    else{
                        good = false;
                        break;
                    }
                }
                if(good){
                    possibleWords.push(data.words[i]);
                }
            }
            if(possibleWords.length === 0){
                return "No words with these letters";
            }
            let text:string = "";
            for(let i = 0; i < wordCt; i++){
                let word = possibleWords[Math.floor(Math.random()*possibleWords.length)];
                text += word + " ";
            }
    
            return text.trimEnd();
        }
        
        let exerciseType : ExerciseType|undefined = props.exerciseTypes ? props.exerciseTypes.find((exercise) => exercise.exercise_id === props.currentExerciseId):null;
    
    return (
        <div>
            {!showForm && <button onClick={() => {setShowForm(true);setText(props.data ? props.data[props.data?.findIndex((x) => x.id === props.currentSectionId)].exercises[props.data[props.data.findIndex((x) => x.id === props.currentSectionId)].exercises.findIndex((x) => x.id === props.currentExerciseId)].content:"");}}>Edit Exercise</button>}
                
            {showForm &&
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 w-2/3 h-2/3 rounded-xl">
                <form action="#" method="post">
                    <div className="flex gap-4 pt-4 px-4 pb-2">
                        
                        <textarea className="text-black w-1/2 p-2" placeholder="Content" id="content" value={text} onChange={(e) => setText(e.target.value)} name="content"/>
                        <div>
                            <div>
                                <label className="p-2" htmlFor="backspace">Backspace</label>
                                <select className="text-black" id="backspace" name="backspace" defaultValue={exerciseType !== undefined && exerciseType !== null && exerciseType.backspace_id !== null ? exerciseType.backspace_id:""}>
                                    <option value="">True</option>
                                    <option value={props.backspaceType ? props.backspaceType[0].id:""}>False</option>
                                </select>
                            </div>

                            <div>
                                <label className="p-2" htmlFor="backwards">Backwards</label>
                                <select className="text-black" id="backwards" name="backwards" defaultValue={exerciseType !== undefined && exerciseType !== null && exerciseType.backwards_id !== null ? exerciseType.backwards_id:""}>
                                    <option value={props.backwardsType ? props.backwardsType[0].id:""}>True</option>
                                    <option value="">False</option>
                                </select>
                            </div>

                            <div>
                                <label className="p-2" htmlFor="time">Time</label>
                                <select className="text-black" id="time" name="time" defaultValue={exerciseType !== undefined && exerciseType !== null && exerciseType.timer_id !== null ? exerciseType.timer_id:""}>
                                    <option value="">off</option>
                                    {props.timerType?.map((timer,index) => {
                                        return(<option key={index} value={timer.id}>{timer.time_sec}</option>)
                                    })}
                                </select>
                                
                            </div>

                            <div>
                                <label className="p-2" htmlFor="health">Health</label>
                                <select className="text-black" id="health" name="health" defaultValue={exerciseType !== undefined && exerciseType !== null && exerciseType.survival_id !== null ? exerciseType.survival_id:""}>
                                    <option value="">off</option>
                                    {props.survivalType?.map((survival, index) => {
                                        return(<option key={index} value={survival.id}>{survival.health}</option>)
                                    })}
                                </select>
                                
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-8 ml-8">
                        <button onClick={() => {setShowForm(false);}}>Cancel</button>
                        <button type="submit" formAction={(e) => {EditExerciseFunc(e,props.currentExerciseId, exerciseType); setShowForm(false)}}>Submit</button>
                    </div>
                </form>
                <div className="ml-4 mt-5 flex items-center justify-start gap-4">
                    <div>
                        <JsonFilePicker onFileSelect={handleFileSelect} jsonFilePaths={LanguagePaths} />
                    </div>
                    <label>Allowed Letters: </label>
                    <input value={letters} onChange={(e) => setLetters(e.target.value)} className="text-black pl-2" type="text" placeholder="a,b,c" id="letters" name="letters"/>
                    <label>Word Count: </label>
                    <input className="text-black" type="number" id="wordCt" name="wordCt" value={wordCt} onChange={(e) => setWordCt(Number(e.target.value))}/>
                    <button onClick={() => setText(generateText(jsonData, letters.split(","), wordCt))}>Generate Text</button>
                </div>
                <div className="mt-10 ml-4 flex flex-col gap-2">
                <AddType plholder="Health" typeName="survival" btnName="Add Health Type"/>
                <AddType plholder="Time in seconds" typeName="timer" btnName="Add Timer Type"/>
                </div>
            </div>}
        </div>
    );
}

export default EditExercise;