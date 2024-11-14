"use server"

import { InsertUserExercise, UpdateUserExercise } from "../../database/querries/exercises";
import { revalidatePath } from "next/cache";
import { Tables } from "@/types/supabase";

export const updateUserExercise = async(userExercise: Tables<"user_exercises">, stars:number, finishTime:number, startTime:number, correctWordsCt:number, accuracy:number) =>{

    let wpm = Math.round(correctWordsCt / ((finishTime - startTime) / 60000))
    let time = Math.round((finishTime-startTime)/1000)

    if(userExercise.accuracy > accuracy)
        accuracy = userExercise.accuracy;
    if(userExercise.stars > stars)
        stars = userExercise.stars;
    if(userExercise.wpm > wpm)
        wpm = userExercise.wpm;
    if(userExercise.time < time)
        time = userExercise.time;

    revalidatePath('/sections', 'page');
    const data = await UpdateUserExercise(userExercise.exercise_id, stars, wpm, accuracy, time);
}

export const insertUserExercise = async (exercise_id:string, stars:number, finishTime:number, startTime:number, correctWordsCt:number, accuracy:number) =>{
    revalidatePath('/sections', 'page');
    const data = await InsertUserExercise(exercise_id, stars, Math.round(correctWordsCt / ((finishTime - startTime) / 60000)), accuracy, Math.round((finishTime-startTime)/1000));
}