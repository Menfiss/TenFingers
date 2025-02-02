"use server"
import { createClient } from "../../utils/supabase/server";


export async function UserQuerry(){
    const supabase = createClient();

    const { data, error } = await supabase.from('users').select('nickname,email')

    if(error) return;
    return data;
}

export async function AllUserExercisesQuerry(){
    const supabase = createClient();

    const { data, error } = await supabase.from('user_exercises').select('wpm, accuracy, time, stars')

    if(error) return;
    return data;
}




