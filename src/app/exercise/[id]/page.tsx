import ExcersiseWrapper from "@/components/ExcersiseWrapper/ExcersiseWrapper";
import {ExerciseContentQuerry, ExerciseTypeQuerry, GetStars, GetUserExercise} from "../../../../database/querries/exercises";

const exercise = async({params} : any) =>{
    const exerciseData = await ExerciseContentQuerry(params.id); //get excersise by id in url
    const exerciseTypes = await ExerciseTypeQuerry(params.id); //get excersise types by id in url
    let userExercise = await GetUserExercise(params.id); //get user excersise by id in url
    const prevExeStars = exerciseData && exerciseData[0].next_exercise ? await GetStars(exerciseData[0].next_exercise):null; //get stars of previous excersise
    
    

    return(
        <div>
            <ExcersiseWrapper exerciseID={params.id} exerciseData={exerciseData? exerciseData[0]:null} exerciseTypes={exerciseTypes? exerciseTypes[0]:null} userExercise={userExercise} nextExerciseStars={prevExeStars && prevExeStars[0] ? prevExeStars[0].stars:0} ></ExcersiseWrapper>
        </div>
    )
}

export default exercise;