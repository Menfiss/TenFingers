"use server"
import { createClient } from "../../utils/supabase/server";



export async function ExercisesQuerry(){
    const supabase = createClient();

    const { data, error } = await supabase.from('sections').select('name, section_order, exercises( excercise_order, id)').order("section_order", {ascending:true}).order("excercise_order", {foreignTable:"exercises", ascending:true});

    if(error) return;
    return data;
}

export async function ExerciseContentQuerry(id:string){
    const supabase = createClient();

    const { data, error } = await supabase.from('exercises').select("content, excercise_order, section_id").eq("id",id);

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

    const { data, error } = await supabase.from('user_exercises').select("stars, exercise_id");

    if(error || typeof(data) === "undefined") return;
    return data;
}

export async function GetUserExercise(id:string){
    const supabase = createClient();

    const { data, error } = await supabase.from('user_exercises').select("stars").eq("exercise_id",id);

    if(error || typeof(data[0].stars) === "undefined") return 0;
    return data[0].stars;
}