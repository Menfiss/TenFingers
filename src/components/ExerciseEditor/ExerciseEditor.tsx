"use client";

import { useState } from "react";
import AddSection from "./components/AddSection";
import { DeleteExerciseFunc, DeleteSectionFunc, MoveExerciseFunc, MoveSectionFunc } from "../../../server-actions/admin-actions/actions";
import EditSection from "./components/EditSection";
import AddExercise from "./components/AddExercise";
import EditExercise from "./components/EditExercise";

interface props{
    data: Section;
    backspaceType : backspaceType;
    backwardsType : backwardsType;
    timerType : timerType;
    survivalType : survivalType;
    exerciseTypes: ExerciseTypes;
}


const ExerciseEditor = (props:props) => {

    const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
    const [currentExerciseId, setCurrentExerciseId] = useState<string | null>(null);

    const renderSections = () => {

        return(
            <div className="overflow-y-auto h-96 w-96 flex flex-col gap-4">
                {props.data?.map((section,index) => {
                    return(
                        <button className={currentSectionId === section.id ? "text-blue-500" : ""} key={section.id} onClick={() => {setCurrentSectionId(section.id);setCurrentExerciseId(null)}}>
                            <div>Section{" " + (index+1) + ": "}</div>
                            <div>{section.name}</div>
                        </button>
                    )
                })}
            </div>
        )
    };
    
    const renderExercises = (sectionID : string|null) => {
        if(sectionID === null) return;  

        return(
            <div className="overflow-y-auto h-96 w-96 flex flex-col gap-4">
                {props.data?.find(section => section.id === sectionID)?.exercises.map((exercise,index) => {
                    return(
                        <button className={currentExerciseId === exercise.id ? "text-blue-500" : ""} key={exercise.id} onClick={() => setCurrentExerciseId(exercise.id)}>
                            <div>Exercise{" " + (index+1)}</div>
                        </button>
                    )
                })}
            </div>
        )

    };

    const renderExerciseContent = (sectionID : string|null, exerciseID : string|null) => {
        if(sectionID === null || exerciseID === null) return;

        const exercise = props.data?.find(section => section.id === sectionID)?.exercises.find(exercise => exercise.id === exerciseID);
        if(exercise === undefined) return;

        return(
            <div className="flex flex-col items-center">
                <div className="max-w-72 mb-4 text-center">{exercise.content}</div>
                <div>{renderExerciseTypes(sectionID,exerciseID)}</div>
            </div>
        )
    }

    const renderExerciseTypes = (sectionID : string|null, exerciseID : string|null) => {
        if(sectionID === null || exerciseID === null || props.exerciseTypes === null) return;

        const exercise = props.exerciseTypes.find(exercise => exercise.exercise_id === exerciseID);
        if(exercise === undefined){
            return(
                <div>
                    <div>No exercise type</div>
                </div>
            )
        }
        else{
            return(
                <div>
                    <div>{exercise.backspace_id !== null ? "Backspace: OFF":null}</div>
                    <div>{exercise.backwards_id !== null ? "Backwards: ON":null}</div>
                    <div>{exercise.timer_id !== null ? "Time(s): " + props.timerType?.find((type) => type.id === exercise.timer_id)?.time_sec.toString() : null}</div>
                    <div>{exercise.survival_id !== null ? "Health: " + props.survivalType?.find((type) => type.id === exercise.survival_id)?.health.toString():null}</div>
                </div>
            )
        }
    }

    

    return (
        <div className="mt-16">
            <div className="flex gap-8 justify-center">
                <div className="flex flex-col items-center">
                    <div className="mb-8 text-2xl">Sections</div>
                    {renderSections()}
                    <div className="flex flex-col items-center mt-6">
                        <AddSection btnText="Add Section" currentSectionId={currentSectionId} data={props.data} mode={null} />
                        {currentSectionId !== null && 
                        <div className="flex flex-col items-center">
                            <AddSection btnText="Add Up" currentSectionId={currentSectionId} data={props.data} mode={"up"} />
                            <AddSection btnText="Add Down" currentSectionId={currentSectionId} data={props.data} mode={"down"} />
                            <button onClick={() => MoveSectionFunc("up",currentSectionId,props.data)}>Move Up</button>
                            <button onClick={() => MoveSectionFunc("down",currentSectionId,props.data)}>Move Down</button>
                            <EditSection SectionName={props.data?.find(section => section.id === currentSectionId)?.name} currentSectionId={currentSectionId} />
                            <button onClick={() => {DeleteSectionFunc(currentSectionId,props.data);setCurrentSectionId(null);setCurrentExerciseId(null)}}>Delete Section</button>
                        </div>}
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center mx-16">
                    <div className="flex items-center">{renderExerciseContent(currentSectionId,currentExerciseId)}</div>
                </div>

                <div className="flex flex-col items-center">
                    {currentSectionId !== null && <div className="mb-8 text-2xl">Exercises</div>}
                    {renderExercises(currentSectionId)}
                    <div className="flex flex-col items-center mt-6">
                    {currentSectionId !== null && <AddExercise btnText="Add Exercise" mode={null} currentExerciseId={currentExerciseId} currentSectionId={currentSectionId} backspaceType={props.backspaceType} backwardsType={props.backwardsType} timerType={props.timerType} survivalType={props.survivalType} data={props.data}></AddExercise>}

                    {currentExerciseId !== null && 
                    <div className="flex flex-col items-center">
                        <AddExercise btnText="Add Up" mode={"up"} currentExerciseId={currentExerciseId} currentSectionId={currentSectionId} backspaceType={props.backspaceType} backwardsType={props.backwardsType} timerType={props.timerType} survivalType={props.survivalType} data={props.data} />
                        <AddExercise btnText="Add Down" mode={"down"} currentExerciseId={currentExerciseId} currentSectionId={currentSectionId} backspaceType={props.backspaceType} backwardsType={props.backwardsType} timerType={props.timerType} survivalType={props.survivalType} data={props.data} />
                        <button onClick={()=> {MoveExerciseFunc("up",props.data,currentExerciseId,currentSectionId)}}>Move Up</button>
                        <button onClick={()=> {MoveExerciseFunc("down",props.data,currentExerciseId,currentSectionId)}}>Move Down</button>
                        <EditExercise currentExerciseId={currentExerciseId} currentSectionId={currentSectionId} backspaceType={props.backspaceType} backwardsType={props.backwardsType} timerType={props.timerType} survivalType={props.survivalType} data={props.data} exerciseTypes={props.exerciseTypes}/>
                        <button onClick={() => {DeleteExerciseFunc(currentExerciseId,currentSectionId,props.data); setCurrentExerciseId(null)}}>Delete Exercise</button>
                    </div>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExerciseEditor;