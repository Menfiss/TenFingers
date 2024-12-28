"use server"
import { createClient } from "../../utils/supabase/server";

export const updateHighScore = async(highscore:number) => {
    const supabase = createClient();
    if(supabase.auth.getUser() === null) return;
    let userID = (await supabase.auth.getUser()).data.user?.id;
    if(!userID) return;
    
    const { data, error } = await supabase.from('minigame_drop_tiles').update({highscore: highscore}).eq('user_id', userID);
    
    if(error) return;
    return data;
}

export const getHighScore = async() => {
    const supabase = createClient();
    if(supabase.auth.getUser() === null) return;
    

    const { data, error } = await supabase.from('minigame_drop_tiles').select("highscore");

    if(error) return;
    return data[0];
}

export const insertHighScore = async(score:number) => {
    const supabase = createClient();
    if(supabase.auth.getUser() === null) return;
    let userID = (await supabase.auth.getUser()).data.user?.id;
    if(!userID) return;

    const { data, error } = await supabase.from('minigame_drop_tiles').insert({highscore: score, user_id: userID})

    if(error) return;
    return data;
}