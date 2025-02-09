"use client";

import { useState } from "react";
import AddType from "./AddType";
import { EditExerciseFunc } from "../../../../server-actions/admin-actions/actions";

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

const EditExercise = (props:props) => {

        const [showForm, setShowForm] = useState<boolean>(false);

        let exerciseType : ExerciseType|undefined = props.exerciseTypes ? props.exerciseTypes.find((exercise) => exercise.exercise_id === props.currentExerciseId):null;
    
    return (
        <div>
            {!showForm && <button onClick={() => setShowForm(true)}>Edit Exercise</button>}
                
            {showForm &&
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 w-2/3 h-2/3 rounded-xl">
                <form action="#" method="post">
                    <div>
                        <div>
                            <textarea className="text-black w-1/2" placeholder="Content" id="content" defaultValue={props.data ? props.data[props.data?.findIndex((x) => x.id === props.currentSectionId)].exercises[props.data[props.data.findIndex((x) => x.id === props.currentSectionId)].exercises.findIndex((x) => x.id === props.currentExerciseId)].content:""} name="content"/>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="backspace">Backspace</label>
                                <select className="text-black" id="backspace" name="backspace" defaultValue={exerciseType !== undefined && exerciseType !== null && exerciseType.backspace_id !== null ? exerciseType.backspace_id:""}>
                                    <option value="">True</option>
                                    <option value={props.backspaceType ? props.backspaceType[0].id:""}>False</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="backwards">Backwards</label>
                                <select className="text-black" id="backwards" name="backwards" defaultValue={exerciseType !== undefined && exerciseType !== null && exerciseType.backwards_id !== null ? exerciseType.backwards_id:""}>
                                    <option value={props.backwardsType ? props.backwardsType[0].id:""}>True</option>
                                    <option value="">False</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="time">Time</label>
                                <select className="text-black" id="time" name="time" defaultValue={exerciseType !== undefined && exerciseType !== null && exerciseType.timer_id !== null ? exerciseType.timer_id:""}>
                                    <option value="">off</option>
                                    {props.timerType?.map((timer,index) => {
                                        return(<option key={index} value={timer.id}>{timer.time_sec}</option>)
                                    })}
                                </select>
                                
                            </div>

                            <div>
                                <label htmlFor="health">Health</label>
                                <select className="text-black" id="health" name="health" defaultValue={exerciseType !== undefined && exerciseType !== null && exerciseType.survival_id !== null ? exerciseType.survival_id:""}>
                                    <option value="">off</option>
                                    {props.survivalType?.map((survival, index) => {
                                        return(<option key={index} value={survival.id}>{survival.health}</option>)
                                    })}
                                </select>
                                
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setShowForm(false)}>Cancel</button>
                    <button type="submit" formAction={(e) => {EditExerciseFunc(e,props.currentExerciseId, exerciseType); setShowForm(false)}}>Submit</button>
                </form>
                <AddType plholder="Health" typeName="survival" btnName="Add Health Type"/>
                <AddType plholder="Time in seconds" typeName="timer" btnName="Add Timer Type"/>
            </div>}
        </div>
    );
}

export default EditExercise;