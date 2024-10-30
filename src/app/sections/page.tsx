
import { ExercisesQuerry, GetUserExercises } from "../../../database/querries/exercises";
import ExerciseSection from "@/components/ExerciseSection/ExerciseSection";
import { revalidatePath } from 'next/cache'
revalidatePath('/blog/[slug]', 'page')

export const revalidate = 0;
export default async function Sections() {    
    const data = await ExercisesQuerry();
    const userExcersiseData = await GetUserExercises();

    const renderPage = () =>{
        if(!data) return;
        
        function getuserExercisesSubArray(section_id:string){
            if(!userExcersiseData) return [];
            let subArray:{stars:number, exercise_id:string}[] = [];
            for(let i = 0; i < userExcersiseData.length; i++){
                if(userExcersiseData[i].exercises?.section_id === section_id){
                    subArray.push(userExcersiseData[i]);
                }
            }
            return subArray;
        }
        function checkIfLastExerciseCompleted(prevSectionIndex:number,subArray:{stars:number, exercise_id:string}[]){
            if(!data) return false;
            for(let i = 0; i < data[prevSectionIndex].exercises.length; i++){
                if(data[prevSectionIndex].exercises[i].next_exercise === null){
                    for(let j = 0; j < subArray.length; j++){
                        if(subArray[j].exercise_id === data[prevSectionIndex].exercises[i].id && subArray[j].stars > 1){
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        function getSectionIndex(section_id:string | null){
            if(!data) return -1;
            for(let i = 0; i < data.length; i++){
                if(data[i].id === section_id){
                    return i;
                }
            }
            return -1;
        }
        function getOrderedSections(){
            if(!data) return [-1];
            let orderedSections:number[] = [];
            for(let i = 0; i < data.length; i++){
                if(data[i].prev_section === null){
                    orderedSections.push(i);
                    break;
                }
            } 

            for(let i = 0; i < data.length; i++){
                if(data[orderedSections[i]].next_section === null){
                    break;
                }else{
                    orderedSections.push(getSectionIndex(data[orderedSections[i]!].next_section));
                }
            }
            return orderedSections;

            
            
        }
        const orderedSections = getOrderedSections();

        let subArray = [];
        return(
            <div>
                {orderedSections.map((section_index:number,index) => {
                    subArray.push(getuserExercisesSubArray(data[section_index].id));
                    return(
                        <div key={index}>
                            <ExerciseSection section={data[section_index]} userExercises={subArray[index]} firstExerciseUnlocked={section_index === 0 ? true : checkIfLastExerciseCompleted(orderedSections[index-1],subArray[index-1])}></ExerciseSection>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div>
            
           { data ? renderPage() : null}
            
        </div>
    );
}

