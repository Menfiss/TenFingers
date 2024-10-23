import ExerciseButton from "../ExerciseButton/ExerciseButton";



interface props{
    section:{
        id:string;
        name: string;
        prev_section: string | null;
        next_section: string | null;
        exercises: {
            prev_exercise: string | null;
            next_exercise: string | null;
            id: string;
        }[];
    };
    userExercises:{stars:number, exercise_id:string}[] | undefined;
    firstExerciseUnlocked:boolean;
}

const ExerciseSection = (props:props) => {
    let unlocked = props.firstExerciseUnlocked;

    function checkIfUnlocked(stars:number){
        if(stars > 0){
            unlocked = stars > 1 ? true:false;
            return true;
        }
        else if(unlocked){
            unlocked = false;
            return true;
        }
        else{
            return false;
        }
        
    }

    function calculateStars(){
        let stars = 0;
        if(props.userExercises){
            for(let i = 0; i < props.userExercises.length; i++){
                    stars += props.userExercises[i].stars;
                }
        }
        return stars
    }

    function getOrderedExercises(){
        
        let nextExeId:any = "";
        let orderedExercises:number[] = [];
        for(let i = 0; i < props.section.exercises.length; i++){
            if(props.section.exercises[i].prev_exercise === null){
                nextExeId = props.section.exercises[i].next_exercise;
                orderedExercises.push(i);
                break;
            }
        } 

        for(let i = 0; i < props.section.exercises.length; i++){
            if(props.section.exercises[i].id === nextExeId){
                orderedExercises.push(i);
                nextExeId = props.section.exercises[i].next_exercise;
                if(nextExeId === null){
                    
                    break;
                }
                i=-1;
            }
        }
        return orderedExercises;
    }

    const orderedExercises = getOrderedExercises();
    
    return (
        <div>
           {props.section.name}
           {" " + calculateStars() + "/"+ props.section.exercises.length*3}
              {orderedExercises.map((exercise_index, index) => {
                let stars = 0;
                if(props.userExercises){
                     for(let i = 0; i < props.userExercises.length; i++){
                          if(props.userExercises[i].exercise_id === props.section.exercises[orderedExercises[index]]?.id){
                            stars = props.userExercises[i].stars;
                            break;
                          }
                     }
                }
                return(
                     <ExerciseButton unlocked={checkIfUnlocked(stars)} stars={stars} id={props.section.exercises[exercise_index].id}></ExerciseButton>
                )
              })}
        </div>
    )
}

export default ExerciseSection;