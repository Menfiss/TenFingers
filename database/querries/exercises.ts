"use server"
import { createClient } from "../../utils/supabase/server";



export async function ExercisesQuerryWithContent(){
    const supabase = createClient();

    const { data, error } = await supabase.from('sections').select('id, name, prev_section, next_section, exercises( prev_exercise, next_exercise, id, content)')

    if(error) return;
    return data;
}

export async function ExercisesQuerry(){
    const supabase = createClient();

    const { data, error } = await supabase.from('sections').select('id, name, prev_section, next_section, exercises( prev_exercise, next_exercise, id)')

    if(error) return;
    return data;
}

export async function AllExerciseTypesQuerry(){
    const supabase = createClient();
    
    const {data} = await supabase.from('exercise_types').select("exercise_id, backwards_id, timer_id, survival_id, backspace_id");
    return data;
}

export async function AllTypesQuerry(){
    const supabase = createClient();

    let backspace = (await supabase.from('backspace_type_exe').select("id,backspace")).data;
    let backwards = (await supabase.from('backwards_type_exe').select("id,backwards")).data;
    let timer = (await supabase.from('timer_type_exe').select("id,time_sec")).data;
    let survival = (await supabase.from('survival_type_exe').select("id,health")).data;

    return {backspace, backwards, timer, survival};
    
}

export async function ExerciseTypeQuerry(id:string){
    const supabase = createClient();
    const { data, error } = await supabase.from('exercise_types').select("backwards_type_exe(backwards), timer_type_exe(time_sec), survival_type_exe(health), backspace_type_exe(backspace)").eq("exercise_id",id);
    
    return data;
}

export async function ExerciseContentQuerry(id:string){
    const supabase = createClient();
    const { data, error } = await supabase.from('exercises').select("content, next_exercise").eq("id",id);
    console.log(error);
    return data;
}

export const GetUserExercises = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.from('user_exercises').select("stars, wpm, accuracy, time, exercise_id, exercises(section_id)").order('exercises(section_id)');
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


