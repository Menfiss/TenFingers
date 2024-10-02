
import Link from "next/link";
import path from "path/posix";

interface props{
    unlocked: boolean;
    stars: number;
    id:string;
}

function ExerciseButton (props:props) {
    const unlockedStyle = "";
    const lockedStyle = "text-gray-500";

    return (
        <Link
        className={!props.unlocked ? 'pointer-events-none' : ''}
        href={`/exercise/${props.id}`}>
            <div className={props.unlocked ? unlockedStyle:lockedStyle}>
                <div>{props.stars}</div>
                <div>Exercise</div>
            </div>
        </Link>
    );
}

export default ExerciseButton;