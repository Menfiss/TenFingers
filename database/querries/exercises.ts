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

    const { data, error } = await supabase.from('exercise_types').select("exercises(content), backwards_type_exe(backwards), timer_type_exe(time_sec), survival_type_exe(health), backspace_type_exe(backspace)").eq("exercise_id",id);

    if(error) return;
    return data;
}

export async function NextExercise(excercise_order:number, section_id:string){
    const supabase = createClient();

    const { data, error } = await supabase.from('exercises').select("id").eq("excercise_order",excercise_order+1).eq("section_id",section_id);

    if(error) return;
    if (typeof(data[0]) !== "undefined"){
        return data[0].id;
    }
    else{
        return "";
    }
}

export async function GetUserExercises(){
    const supabase = createClient();

    const { data, error } = await supabase.from('user_exercises').select("stars, exercise_id, exercises(section_id)").order('exercises(section_id)');
    if(error) return;
    return data;
}

export async function GetUserExercise(id:string){
    const supabase = createClient();

    const { data, error } = await supabase.from('user_exercises').select("stars").eq("exercise_id",id);

    if(error || typeof(data[0]) === "undefined") return 0;
    return data[0].stars;
    
}

export async function getExerciseWithTypes(){
    const supabase = createClient();

    const { data, error } = await supabase.from('exercise_types').select("exercises(content), backwards_type_exe(backwards))");

    if(error || typeof(data) === "undefined") return;
    return data;
}