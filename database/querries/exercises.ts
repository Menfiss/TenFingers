"use server"
import { createClient } from "../../utils/supabase/server";


export async function ExercisesQuerry(){
    const supabase = createClient();

    const { data, error } = await supabase.from('sections').select('id, name, prev_section, next_section, exercises( prev_exercise, next_exercise, id)')

    if(error) return;
    return data;
}

export async function ExerciseContentQuerry(id:string){
    const supabase = createClient();
    const { data, error } = await supabase.from('exercise_types').select("exercises(content, next_exercise), backwards_type_exe(backwards), timer_type_exe(time_sec), survival_type_exe(health), backspace_type_exe(backspace)").eq("exercise_id",id);
    return data;
}

export const GetUserExercises = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.from('user_exercises').select("stars, exercise_id, exercises(section_id)").order('exercises(section_id)');
    if(error) return;
    
    return data;
}

export async function GetUserExercise(exercise_id:string){
    const supabase = createClient();

    const { data } = await supabase.from('user_exercises').select("*").eq("exercise_id",exercise_id);
    
    return data ? data[0]:null;
    
}

export async function GetStars(exercise_id:string){
    const supabase = createClient();

    const { data } = await supabase.from('user_exercises').select("stars").eq("exercise_id",exercise_id);

    return data;
}

export async function ExerciseCriteriaQuerry(id:string){
    const supabase = createClient();

    const { data } = await supabase.from('exercise_criteria').select("time_criteria_exe(time_sec), wpm_criteria_exe(wpm), accuracy_criteria_exe(accuracy_percentage), mistake_criteria_exe(mistakes_allowed)").eq("exercise_id",id);
    
    return data? data[0]:null;
}

export async function UpdateUserExercise(exercise_id:string, stars:number, wpm:number, accuracy:number, time:number){
    const supabase = createClient();

    const { data, error } = await supabase.from('user_exercises').update({stars:stars, wpm:wpm, accuracy:accuracy, time:time}).eq('exercise_id',exercise_id);

    if(error) return;
    return data;
}

export async function InsertUserExercise(exercise_id:string, stars:number, wpm:number, accuracy:number, time:number){
    const supabase = createClient();
    let userID = (await supabase.auth.getUser()).data.user?.id;
    if(!userID) return;
    
    const { data, error } = await supabase.from('user_exercises').insert({exercise_id:exercise_id, stars:stars, wpm:wpm, accuracy:accuracy, time:time, user_id:userID});
    
    if(error) return;
    return data;
}


