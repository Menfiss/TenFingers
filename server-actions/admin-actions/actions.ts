import { Database } from './../../src/types/supabase';
"use server"

import { revalidatePath } from "next/cache";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";


export async function AddSectionFunc(formData: FormData, data: Section, currentSectionId: string | null, mode: string | null) {
    

    const sectionName = formData.get("sectionName")?.toString();
    if(sectionName === "" || sectionName === undefined || data === undefined) return;

    const supabase = createClient()

    const uuid = randomUUID();
    if(mode === null){ // insert at the end
        
        await supabase.from("sections").insert([{id:uuid ,name: sectionName, prev_section: data[data.length-1].id}]);
        
        await supabase.from("sections").update({next_section: uuid}).eq("id",data[data.length-1].id);
    }
    else if(mode === "down" && currentSectionId !== null){ // insert below selected section

        if(currentSectionId === data[data.length-1].id){ // if selected section is last section

            await supabase.from("sections").insert([{id:uuid ,name: sectionName, prev_section: currentSectionId}]);
            
            await supabase.from("sections").update({next_section: uuid}).eq("id",currentSectionId);
        }
        else{ // if selected section is not last section

            await supabase.from("sections").insert([{id:uuid ,name: sectionName, prev_section: currentSectionId, next_section: data[data.findIndex(section => section.id === currentSectionId)+1].id}]);
            
            await supabase.from("sections").update({next_section: uuid}).eq("id",currentSectionId);
            await supabase.from("sections").update({prev_section: uuid}).eq("id",data[data.findIndex(section => section.id === currentSectionId)+1].id);
        }

    }
    else if(mode === "up" && currentSectionId !== null){ // insert above selected section

        if(currentSectionId === data[0].id){ // if selected section is first section

            await supabase.from("sections").insert([{id:uuid ,name: sectionName, next_section: currentSectionId}]);
            
            await supabase.from("sections").update({prev_section: uuid}).eq("id",currentSectionId);
        }
        else{ // if selected section is not first section

            await supabase.from("sections").insert([{id:uuid ,name: sectionName, next_section: currentSectionId, prev_section: data[data.findIndex(section => section.id === currentSectionId)-1].id}]);
            
            await supabase.from("sections").update({prev_section: uuid}).eq("id",currentSectionId);
            await supabase.from("sections").update({next_section: uuid}).eq("id",data[data.findIndex(section => section.id === currentSectionId)-1].id);
        }

    }

    revalidatePath("/admin");
}

export async function DeleteSectionFunc(currentSectionId: string | null, data:Section){
    if(currentSectionId === null || data === undefined) return;

    const supabase = createClient();

    await supabase.from("sections").delete().eq("id",currentSectionId);

    if(currentSectionId === data[0].id){ // if first section is deleted

        const {error} = await supabase.from("sections").delete().eq("id",currentSectionId);

        !error ? await supabase.from("sections").update({prev_section: null}).eq("id",data[1].id) : null;
    }
    else if(currentSectionId === data[data.length-1].id){ // if last section is deleted

        const {error} = await supabase.from("sections").delete().eq("id",currentSectionId);

        !error ? await supabase.from("sections").update({next_section: null}).eq("id",data[data.length-2].id) : null;
    }
    else{ // if section in the middle is deleted

        const {error} = await supabase.from("sections").delete().eq("id",currentSectionId);

        !error ? await supabase.from("sections").update({next_section: data[data.findIndex(section => section.id === currentSectionId)+1].id}).eq("id",data[data.findIndex(section => section.id === currentSectionId)-1].id) : null;
        !error ? await supabase.from("sections").update({prev_section: data[data.findIndex(section => section.id === currentSectionId)-1].id}).eq("id",data[data.findIndex(section => section.id === currentSectionId)+1].id) : null;
    }

    revalidatePath("/admin");

}

export async function EditSectionFunc(formData: FormData, currentSectionId: string | null){
    if(currentSectionId === null) return;

    const sectionName = formData.get("sectionName")?.toString();
    if(sectionName === "" || sectionName === undefined) return;

    const supabase = createClient();

    await supabase.from("sections").update({name: sectionName}).eq("id",currentSectionId);

    revalidatePath("/admin");
}

export async function MoveSectionFunc(mode:string, currentSectionId:string, data:Section){
    if(currentSectionId === null || data === undefined) return;

    const supabase = createClient();

    if(mode === "up" && currentSectionId !== data[0].id){

        if(currentSectionId === data[1].id){
            await supabase.from("sections").update({prev_section: null, next_section: data[0].id}).eq("id",currentSectionId);
            await supabase.from("sections").update({prev_section: currentSectionId, next_section: data.length >= 3 ? data[2].id :null}).eq("id",data[0].id);
            data.length >= 3 ? await supabase.from("sections").update({prev_section: data[0].id}).eq("id",data[2].id) : null;
        }
        else if(currentSectionId === data[data.length -1].id){
            await supabase.from("sections").update({prev_section: data.length >= 3 ? data[data.length-3].id:null, next_section: data[data.length-2].id}).eq("id",currentSectionId);
            await supabase.from("sections").update({next_section: null, prev_section: currentSectionId}).eq("id",data[data.length-2].id);
            data.length >= 3 ? await supabase.from("sections").update({next_section: currentSectionId}).eq("id",data[data.length-3].id):null;
        }
        else{

            await supabase.from("sections").update({next_section: data[data.findIndex(section => section.id === currentSectionId)-1].id, prev_section: data[data.findIndex(section => section.id === currentSectionId)-2].id}).eq("id",currentSectionId);
            await supabase.from("sections").update({prev_section: currentSectionId, next_section: data[data.findIndex(section => section.id === currentSectionId)+1].id}).eq("id",data[data.findIndex(section => section.id === currentSectionId)-1].id);
            await supabase.from("sections").update({next_section: currentSectionId}).eq("id",data[data.findIndex(section => section.id === currentSectionId)-2].id);
            await supabase.from("sections").update({prev_section: data[data.findIndex(section => section.id === currentSectionId)-1].id}).eq("id",data[data.findIndex(section => section.id === currentSectionId)+1].id);
        }

    }
    else if(mode === "down" && currentSectionId !== data[data.length-1].id){

        if(currentSectionId === data[data.length-2].id){
            await supabase.from("sections").update({next_section: null, prev_section: data[data.length-1].id}).eq("id",currentSectionId);
            await supabase.from("sections").update({next_section: currentSectionId, prev_section: data.length >= 3 ? data[data.length-3].id:null}).eq("id",data[data.length-1].id);
            data.length >= 3 ? await supabase.from("sections").update({next_section: data[data.length-1].id}).eq("id",data[data.length-3].id) : null
        }
        else if(currentSectionId === data[0].id){
            await supabase.from("sections").update({prev_section: data[1].id, next_section: data.length >= 3 ? data[2].id:null}).eq("id",currentSectionId);
            await supabase.from("sections").update({prev_section: null, next_section: currentSectionId}).eq("id",data[1].id);
            data.length >= 3 ? await supabase.from("sections").update({prev_section: currentSectionId}).eq("id",data[2].id):null;
        }
        else{
            await supabase.from("sections").update({prev_section: data[data.findIndex(section => section.id === currentSectionId)+1].id, next_section: data[data.findIndex(section => section.id === currentSectionId)+2].id}).eq("id",currentSectionId);
            await supabase.from("sections").update({next_section: currentSectionId, prev_section: data[data.findIndex(section => section.id === currentSectionId)-1].id}).eq("id",data[data.findIndex(section => section.id === currentSectionId)+1].id);
            await supabase.from("sections").update({prev_section: currentSectionId}).eq("id",data[data.findIndex(section => section.id === currentSectionId)+2].id);
            await supabase.from("sections").update({next_section: data[data.findIndex(section => section.id === currentSectionId)+1].id}).eq("id",data[data.findIndex(section => section.id === currentSectionId)-1].id);
        }
    }
    revalidatePath("/admin");

}