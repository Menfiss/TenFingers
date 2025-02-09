declare global{
    type Section = {
        id: string;
        name: string;
        prev_section: string | null;
        next_section: string | null;
        exercises: {
            prev_exercise: string | null;
            next_exercise: string | null;
            id: string;
            content: string;
        }[];
    }[] | undefined;

    type backspaceType = {
        id: string;
        backspace: boolean;
    }[] | null

    type backwardsType = {
        id: string;
        backwards: boolean;
    }[] | null

    type timerType = {
        id: string;
        time_sec: number;
    }[] | null

    type survivalType = {
        id: string;
        health: number;
    }[] | null

    type ExerciseTypes = {
        exercise_id: string;
        backwards_id: string | null;
        timer_id: string | null;
        survival_id: string | null;
        backspace_id: string | null;
    }[] | null

    type ExerciseType = {
        exercise_id: string;
        backwards_id: string | null;
        timer_id: string | null;
        survival_id: string | null;
        backspace_id: string | null;
    } | null
}

export {};