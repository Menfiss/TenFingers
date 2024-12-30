import ExcersiseWrapper from "@/components/ExcersiseWrapper/ExcersiseWrapper";
import {ExerciseContentQuerry, GetStars, GetUserExercise} from "../../../../database/querries/exercises";

const exercise = async({params} : any) =>{
    const data = await ExerciseContentQuerry(params.id); //get excersise by id in url
    let userExercise = await GetUserExercise(params.id); //get user excersise by id in url
    const prevExeStars = data && data[0].exercises?.next_exercise ? await GetStars(data[0].exercises?.next_exercise):null; //get stars of previous excersise
    
    

    return(
        <div>
            <ExcersiseWrapper exerciseID={params.id} data={data? data[0]:null} userExercise={userExercise} nextExerciseStars={prevExeStars && prevExeStars[0] ? prevExeStars[0].stars:0} ></ExcersiseWrapper>
        </div>
    )
}

export default exercise;