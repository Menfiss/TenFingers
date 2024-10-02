
import Link from "next/link";
import { ExercisesQuerry, GetUserExercises } from "../../../database/querries/exercises";
import ExerciseButton from "@/components/ExerciseButton/ExerciseButton";


export const revalidate = 300;
export default async function Sections() {
    const data = await ExercisesQuerry();
    const userExcersiseData = await GetUserExercises();

    const renderPage = () =>{
        if(!data) return;

        let unlocked = true;
        let prevUnlocked = true;
        //make a excercice component
        // make a function that will find the number of stars in the userExcersiseData by excersise id --DONE--
        // possible optimization make a variable so that you dont have to check each excercise with each completed excercise two times something like [[],[],[]] where each sub array is a section and each element is a number of stars and id

        function getStarsForExc(id:string) : number{
            // get the number of stars for a excercise by id
            if(!userExcersiseData) return 0;
            for(let i = 0; i < userExcersiseData.length; i++){
                if(userExcersiseData[i].exercise_id === id){
                    return userExcersiseData[i].stars;
                }
            }
            return 0;
        }

        function getStarsForSection(index:number){
            //iterate exc in section and get the number of stars for each completed exc
            if(!data) return;
            let totalStars = 0;
            for(let i = 0; i < data[index].exercises.length; i++){
                totalStars += getStarsForExc(data[index].exercises[i].id);
            }
            return totalStars;
        }

        function checkIfUnlocked(stars:number){
            //check if the excercise is unlocked
            if(stars <= 1){
                if(prevUnlocked){
                    unlocked = true;
                    prevUnlocked = false;
                }
                else{
                    unlocked = false;
                }
            }
            else{
                prevUnlocked = true;
                unlocked = true;
            }
        }
        
        return(
            <div>
                {data.map((section,index) => {
                    return(
                        <div key={index}>
                            <div>
                                <div>{section.name}</div>
                                <div>{getStarsForSection(index)}</div>
                            </div>
                            {section.exercises.map((exc,index) => {
                                let stars = getStarsForExc(exc.id);
                               checkIfUnlocked(stars);
                                return(
                                    <div key={index}>
                                        <ExerciseButton unlocked={unlocked} stars={stars} id={exc.id}/>
                                    </div>
                                );
                            })}
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

