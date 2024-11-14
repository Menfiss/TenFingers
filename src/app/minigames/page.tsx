"use client";
import Link from "next/link";

const Minigames = () => {


    return (
        <>
            <Link href={"minigames/drop_tiles"}>Drop Tiles</Link>
            <Link href={"minigames/sandbox"}>Sandbox</Link>
            <Link href={"minigames/quotes"}>Quotes</Link>
        </>
    );
}

export default Minigames;