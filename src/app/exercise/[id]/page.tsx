import ExcersiseWrapper from "@/components/ExcersiseWrapper/ExcersiseWrapper";
import {ExerciseContentQuerry, GetUserExercise, NextExercise} from "../../../../database/querries/exercises";

const exercise = async({params} : any) =>{
    const data = await ExerciseContentQuerry(params.id); //get excersise by id in url

    // let nextExerciseID; // try to get another excersise id in the same section
    // let nextExeStarsCt = 0;
    // if(data !== undefined && data[0].section_id !== null){
    //     nextExerciseID = await NextExercise(data[0].excercise_order, data[0].section_id);
    //     nextExeStarsCt = nextExerciseID !== undefined ?  await GetUserExercise(nextExerciseID):0;
        
    // }
    
    
    return(
        <div>
            {/* <ExcersiseWrapper text={data !== undefined ? data[0].content: "Loading..."} nextExerciseID={nextExerciseID !== undefined ? nextExerciseID:""} nextExerciseStarsCt={nextExeStarsCt}></ExcersiseWrapper> */}
            <ExcersiseWrapper data={data? data[0]:null}></ExcersiseWrapper>

        </div>
    )
}

export default exercise;