"use client";

import { useState } from "react";
import AddSection from "./components/AddSection";
import { DeleteSectionFunc, MoveSectionFunc } from "../../../server-actions/admin-actions/actions";
import EditSection from "./components/EditSection";

interface props{
    data: Section;
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
                            <div><div>Section{" " + (index+1) + ": "}</div><div>{section.name}</div></div>
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

    return (
        <div className="mt-16">
            <div className="flex gap-48 justify-center">
                <div className="flex flex-col items-center">
                    <div className="mb-8 text-2xl">Sections</div>
                    {renderSections()}
                </div>
                <div className="flex flex-col items-center">
                    <div className="mb-8 text-2xl">Exercises</div>
                    {renderExercises(currentSectionId)}
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <AddSection btnText="Add Section" currentSectionId={currentSectionId} data={props.data} mode={null} />

                    </div>
                    {currentSectionId !== null && 
                    <div>
                        <AddSection btnText="Add Up" currentSectionId={currentSectionId} data={props.data} mode={"up"} />
                        <AddSection btnText="Add Down" currentSectionId={currentSectionId} data={props.data} mode={"down"} />
                        <button onClick={() => MoveSectionFunc("up",currentSectionId,props.data)}>Move Up</button>
                        <button onClick={() => MoveSectionFunc("down",currentSectionId,props.data)}>Move Down</button>
                        <EditSection SectionName={props.data?.find(section => section.id === currentSectionId)?.name} currentSectionId={currentSectionId} />
                        <button onClick={() => DeleteSectionFunc(currentSectionId,props.data)}>Delete Section</button>
                        <button>Add Exercise</button>
                    </div>}</div>
                <div>
                    {currentExerciseId !== null && 
                    <div>
                        <button>Add Up</button>
                        <button>Add Down</button>
                        <button>Move Up</button>
                        <button>Move Down</button>
                        <button>Edit Exercise</button>
                        <button>Delete Exercise</button>
                    </div>
                    }</div> 
            </div>
            
        </div>
    )
}

export default ExerciseEditor;