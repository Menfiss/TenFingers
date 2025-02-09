"use server";
import ExerciseEditor from "@/components/ExerciseEditor/ExerciseEditor"
import { AllTypesQuerry, ExercisesQuerry } from "../../../../database/querries/exercises";



const exercise_editor = async () => {
    //fetch data
    const SectionData = await ExercisesQuerry();
    const  {backspace, backwards, timer, survival} = await AllTypesQuerry();

    
    
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

        for(let i = 0; i < plData.length; i++){
          let sortedExercises: {
            prev_exercise: string | null;
            next_exercise: string | null;
            id: string;
        }[] = [];

          plData[i].exercises.forEach(exercise => {
            if(exercise.prev_exercise === null){
              sortedExercises.push(exercise);
              nextIndex = exercise.next_exercise;
            }
          });

            while(nextIndex !== null){
                plData[i].exercises.forEach(exercise => {
                if(exercise.id === nextIndex){
                    sortedExercises.push(exercise);
                    nextIndex = exercise.next_exercise;
                }
                });
            }

            plData[i].exercises = sortedExercises;
        }

        return plData;
        
    }

    const sortedData = sortData(SectionData);

    
    return(
        <div>
            <ExerciseEditor data={sortedData} backspaceType={backspace} backwardsType={backwards} timerType={timer} survivalType={survival}/>
        </div>
    )
   

}


export default exercise_editor;