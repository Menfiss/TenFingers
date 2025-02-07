"use server";
import ExerciseEditor from "@/components/ExerciseEditor/ExerciseEditor"
import { ExercisesQuerry } from "../../../../database/querries/exercises";



const exercise_editor = async () => {
    //fetch data
    const SectionData = await ExercisesQuerry();

    
    
    const sortData = (data:Section) => {
        if (data === undefined) return;
        let plData:Section = [];
        let nextIndex:string|null = "";
        data.forEach(section => {
            if(section.prev_section === null){
                plData.push(section);
                nextIndex = section.next_section;
            }
        });
        
        while(nextIndex !== null){
            data?.forEach(section => {
                if(section.id === nextIndex){
                    plData?.push(section);
                    nextIndex = section.next_section;
                }
            });
        }

        return plData;
        
    }

    const sortedData = sortData(SectionData);

    
    return(
        <div>
            <ExerciseEditor data={sortedData} />
        </div>
    )
   

}


export default exercise_editor;