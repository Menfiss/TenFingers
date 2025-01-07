"use server"
import { createClient } from "../../utils/supabase/server";

export const updateHighScore = async(highscore:number, waveCt:number) => {
    const supabase = createClient();
    if(supabase.auth.getUser() === null) return;
    let userID = (await supabase.auth.getUser()).data.user?.id;
    if(!userID) return;
    
    const { data, error } = await supabase.from('minigame_shape_strike').update({highscore: highscore,wave_count:waveCt}).eq('user_id', userID);
    
    if(error) return;
    return data;
}

export const insertHighScore = async(score:number, waveCt:number) => {
    const supabase = createClient();
    if(supabase.auth.getUser() === null) return;
    let userID = (await supabase.auth.getUser()).data.user?.id;
    if(!userID) return;

    const { data, error } = await supabase.from('minigame_shape_strike').insert({highscore: score, user_id: userID, wave_count: waveCt})

    if(error) return;
    return data;
}

export const getHighScore = async() => {
    const supabase = createClient();
    if(supabase.auth.getUser() === null) return;
    

    const { data, error } = await supabase.from('minigame_shape_strike').select("highscore, wave_count");

    if(error) return;
    return data[0];
}