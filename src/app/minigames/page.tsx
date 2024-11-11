"use client";
import Link from "next/link";

const Minigames = () => {


    return (
        <>
            <Link href={"minigames/drop_tiles"}>Drop Tiles</Link>
            <Link href={"minigames/sandbox"}>Sandbox</Link>
        </>
    );
}

export default Minigames;