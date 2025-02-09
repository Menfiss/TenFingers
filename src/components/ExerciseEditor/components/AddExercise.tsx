"use client"

import { useState } from "react";
import { AddExerciseFunc } from "../../../../server-actions/admin-actions/actions";
import AddType from "./AddType";

interface props{
    btnText: string;
    backspaceType : backspaceType;
    backwardsType : backwardsType;
    timerType : timerType;
    survivalType : survivalType;
    currentSectionId: string | null;
    currentExerciseId: string | null;
    mode: string | null;
    data:Section
}


const AddExercise = (props:props) => {
    const [showForm, setShowForm] = useState<boolean>(false);

    

    return (
        <div>

            {!showForm && <button onClick={() => setShowForm(true)}>{props.btnText}</button>}
            
            {showForm &&
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 w-2/3 h-2/3 rounded-xl">
                <form action="#" method="post">
                    <div>
                        <div>
                            <textarea className="text-black w-1/2" placeholder="Content" id="content" name="content"/>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="backspace">Backspace</label>
                                <select className="text-black" id="backspace" name="backspace" defaultValue="">
                                    <option value="">True</option>
                                    <option value={props.backspaceType ? props.backspaceType[0].id:""}>False</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="backwards">Backwards</label>
                                <select className="text-black" id="backwards" name="backwards" defaultValue="">
                                    <option value={props.backwardsType ? props.backwardsType[0].id:""}>True</option>
                                    <option value="">False</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="time">Time</label>
                                <select className="text-black" id="time" name="time" defaultValue="0">
                                    <option value="">off</option>
                                    {props.timerType?.map((timer,index) => {
                                        return(<option key={index} value={timer.id}>{timer.time_sec}</option>)
                                    })}
                                </select>
                                
                            </div>

                            <div>
                                <label htmlFor="health">Health</label>
                                <select className="text-black" id="health" name="health" defaultValue="0">
                                    <option value="">off</option>
                                    {props.survivalType?.map((survival, index) => {
                                        return(<option key={index} value={survival.id}>{survival.health}</option>)
                                    })}
                                </select>
                                
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setShowForm(false)}>Cancel</button>
                    <button type="submit" formAction={(e) => {AddExerciseFunc(e,props.currentSectionId,props.mode,props.currentExerciseId, props.data); setShowForm(false)}}>Submit</button>
                </form>
                <AddType plholder="Health" typeName="survival" btnName="Add Health Type"/>
                <AddType plholder="Time in seconds" typeName="timer" btnName="Add Timer Type"/>
            </div>
            
            }
            
        </div>
    );
};

export default AddExercise;