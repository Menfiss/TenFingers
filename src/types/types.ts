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
}

export {};