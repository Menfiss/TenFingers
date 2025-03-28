"use client"

import { useState } from "react";
import ExerciseButton from "../ExerciseButton/ExerciseButton";

interface props{
    section:{
        id:string;
        name: string;
        prev_section: string | null;
        next_section: string | null;
        exercises: {
            prev_exercise: string | null;
            next_exercise: string | null;
            id: string;
        }[];
    };
    userExercises:{
        stars: number;
        wpm: number;
        accuracy: number;
        time: number;
        exercise_id: string;
    }[] | undefined
    firstExerciseUnlocked:boolean;
}

const ExerciseSection = (props:props) => {
    const [loadExercises, setLoadExercises] = useState(false);
    let unlocked = props.firstExerciseUnlocked; // should the first exercise be unlocked

    function checkIfUnlocked(stars:number){
        if(stars > 0){
            unlocked = stars > 0 ? true:false;
            return true;
        }
        else if(unlocked){
            unlocked = false;
            return true;
        }
        else{
            return false;
        }
        
    }

    // calculates amount of completed exercises in the section
    function calculateStars(){
        let stars = 0;
        if(props.userExercises){
            for(let i = 0; i < props.userExercises.length; i++){
                if(props.userExercises[i].stars === 3)
                    stars += 1;
                }
        }
        return stars
    }

    // returns indexes of exercises in the order they should be displayed
    function getOrderedExercises(){
        
        let nextExeId:any = "";
        let orderedExercises:number[] = [];
        // first for loop finds the first exercise
        for(let i = 0; i < props.section.exercises.length; i++){
            if(props.section.exercises[i].prev_exercise === null){
                nextExeId = props.section.exercises[i].next_exercise;
                orderedExercises.push(i);
                break;
            }
        } 
        // second for loop finds the rest of the exercises
        for(let i = 0; i < props.section.exercises.length; i++){
            if(props.section.exercises[i].id === nextExeId){
                orderedExercises.push(i);
                nextExeId = props.section.exercises[i].next_exercise;
                if(nextExeId === null){
                    
                    break;
                }
                i=-1;
            }
        }
        return orderedExercises;
    }

    const orderedExercises = getOrderedExercises();
    
    return (
        <div>
            <button onClick={() => setLoadExercises(!loadExercises)} className="w-full mb-4 mt-4">
                <div className="flex  justify-between border-slate-600 border-[1px] px-6 py-3 rounded-2xl hover:bg-slate-600 transition duration-300 ease-in-out">
                    <div className="flex">
                        <h2 className="text-xl">{props.section.name}</h2>
                        <div className="flex">
                            <h2 className="text-xl leading-8 ml-4">{" " + calculateStars() + "/"+ props.section.exercises.length}</h2>
                            <svg className="w-4 h-4 mt-2 text-yellow-300 ms-1" aria-hidden="true" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <svg className="h-8 w-8 text-white"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="6 9 12 15 18 9" /></svg>
                    </div>
                </div>
            </button>
            {loadExercises &&
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {orderedExercises.map((exercise_index, index) => {
                let stars = 0;
                let wpm = 0;
                let accuracy = 0;
                let time = 0;
                if(props.userExercises){
                     for(let i = 0; i < props.userExercises.length; i++){
                          if(props.userExercises[i].exercise_id === props.section.exercises[orderedExercises[index]]?.id){
                            stars = props.userExercises[i].stars;
                            wpm = props.userExercises[i].wpm;
                            accuracy = props.userExercises[i].accuracy;
                            time = props.userExercises[i].time;
                            break;
                          }
                     }
                }
                return(
                     <ExerciseButton key={index} unlocked={checkIfUnlocked(stars)} stars={stars} wpm={wpm} accuracy={accuracy} time={time} id={props.section.exercises[exercise_index].id}></ExerciseButton>
                )
                })}
            </div>}
        </div>
    )
}

export default ExerciseSection;