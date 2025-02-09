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
        
        await supabase.from("sections").insert([{id:uuid ,name: sectionName, prev_section: data.length > 0 ? data[data.length-1].id:null}]);
        
        data.length > 0 ? await supabase.from("sections").update({next_section: uuid}).eq("id",data[data.length-1].id):null;
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

export async function AddExerciseFunc(formData: FormData, currentSectionId: string | null, mode: string | null, currentExerciseId: string | null, data:Section){
    const exerciseContent = formData.get("content")?.toString();
    if(currentSectionId === null || exerciseContent === undefined || data === undefined || exerciseContent === "") return;

    const backspace = formData.get("backspace")?.toString();
    const backwards = formData.get("backwards")?.toString();
    let time = formData.get("time")?.toString();
    const health = formData.get("health")?.toString();

    let generateType = true;

    if(backspace === "" && backwards === "" && time === "" && health === "") generateType = false;

    const sectionIndex = data !== undefined ? data.findIndex(section => section.id === currentSectionId):0;


    const supabase = createClient();
    const uuid = randomUUID();

    if(mode === null){
        await supabase.from("exercises").insert([{id:uuid, content: exerciseContent, section_id: currentSectionId, prev_exercise: data[sectionIndex].exercises.length === 0 ? null : data[sectionIndex].exercises[data[sectionIndex].exercises.length-1].id}]);

        data[sectionIndex].exercises.length > 0 ? await supabase.from("exercises").update({next_exercise: uuid}).eq("id",data[sectionIndex].exercises[data[sectionIndex].exercises.length-1].id):null;
    }
    else if(mode === "down" && currentExerciseId !== null){

        await supabase.from("exercises").insert([{id:uuid, content: exerciseContent, section_id: currentSectionId, prev_exercise: currentExerciseId, next_exercise: data[sectionIndex].exercises[data[sectionIndex].exercises.length-1].id !== currentExerciseId ? data[sectionIndex].exercises[data[sectionIndex].exercises.findIndex(exercise => exercise.id === currentExerciseId)+1].id:null}]);

        await supabase.from("exercises").update({next_exercise: uuid}).eq("id",currentExerciseId);

        if(data[sectionIndex].exercises[data[sectionIndex].exercises.length-1].id !== currentExerciseId){
            await supabase.from("exercises").update({prev_exercise: uuid}).eq("id",data[sectionIndex].exercises[data[sectionIndex].exercises.findIndex(exercise => exercise.id === currentExerciseId)+1].id);
        }

    }
    else if(mode === "up" && currentExerciseId !== null){

        await supabase.from("exercises").insert([{id:uuid, content: exerciseContent, section_id: currentSectionId, next_exercise: currentExerciseId, prev_exercise: data[sectionIndex].exercises[0].id !== currentExerciseId ? data[sectionIndex].exercises[data[sectionIndex].exercises.findIndex(exercise => exercise.id === currentExerciseId)-1].id:null}]);

        await supabase.from("exercises").update({prev_exercise: uuid}).eq("id",currentExerciseId);

        if(data[sectionIndex].exercises[0].id !== currentExerciseId){
            await supabase.from("exercises").update({next_exercise: uuid}).eq("id",data[sectionIndex].exercises[data[sectionIndex].exercises.findIndex(exercise => exercise.id === currentExerciseId)-1].id);
        }

    }

   
    if(generateType){
        let backspace_id = backspace === "" || backspace === undefined ? null : backspace;
        let backwards_id = backwards === "" || backwards === undefined ? null : backwards;
        let time_id = time === "" || time === undefined ? null : time;
        let health_id = health === "" || health === undefined ? null : health;

        const {error} = await supabase.from("exercise_types").insert({exercise_id: uuid, backspace_id: backspace_id, backwards_id: backwards_id, timer_id: time_id, survival_id: health_id});

    }

    revalidatePath("/admin");
}

export async function AddTypeFunc(formData: FormData, typeName:string){
    const typeValue = formData.get("typeValue")?.toString();
    if(typeValue === "" || typeValue === undefined) return;

    const supabase = createClient();

    if(typeName === "survival"){
        await supabase.from("survival_type_exe").insert([{health: Number(typeValue)}]);
    }
    else if(typeName === "timer"){
        await supabase.from("timer_type_exe").insert([{time_sec: Number(typeValue)}]);
    }

    revalidatePath("/admin");
}

export async function DeleteExerciseFunc(currentExerciseId: string | null, currentSectionId: string | null, data:Section){
    if(currentExerciseId === null || currentSectionId === null || data === undefined) return;

    const supabase = createClient();

    const sectionIndex = data.findIndex(section => section.id === currentSectionId);

    await supabase.from("exercises").delete().eq("id",currentExerciseId);

    if(data[sectionIndex].exercises.length === 1){ revalidatePath("/admin"); return;}

    if(currentExerciseId === data[sectionIndex].exercises[0].id){
        await supabase.from("exercises").update({prev_exercise: null}).eq("id",data[sectionIndex].exercises[1].id);
    }
    else if(currentExerciseId === data[sectionIndex].exercises[data[sectionIndex].exercises.length-1].id){
        await supabase.from("exercises").update({next_exercise: null}).eq("id",data[sectionIndex].exercises[data[sectionIndex].exercises.length-2].id);
    }
    else{
        await supabase.from("exercises").update({next_exercise: data[sectionIndex].exercises[data[sectionIndex].exercises.findIndex(exercise => exercise.id === currentExerciseId)+1].id}).eq("id",data[sectionIndex].exercises[data[sectionIndex].exercises.findIndex(exercise => exercise.id === currentExerciseId)-1].id);
        await supabase.from("exercises").update({prev_exercise: data[sectionIndex].exercises[data[sectionIndex].exercises.findIndex(exercise => exercise.id === currentExerciseId)-1].id}).eq("id",data[sectionIndex].exercises[data[sectionIndex].exercises.findIndex(exercise => exercise.id === currentExerciseId)+1].id);
    }

    revalidatePath("/admin");
}