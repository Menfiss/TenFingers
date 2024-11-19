"use client";
import Link from "next/link";

const Minigames = () => {


    return (
        <>
            <Link href={"minigames/drop_tiles"}>Drop Tiles</Link><br/>
            <Link href={"minigames/sandbox"}>Sandbox</Link><br/>
            <Link href={"minigames/quotes"}>Quotes</Link><br/>
            <Link href={"minigames/unity_minigame"}>Unity Minigame</Link><br/>
        </>
    );
}

export default Minigames;