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
}

export {};