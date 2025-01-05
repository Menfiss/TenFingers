"use client"

import { useState } from "react";
import ShapeStrike from "../Minigames/ShapeStrike/ShapeStrike";
import NotMobile from "../NotMobile/NotMobile";

interface props{
    highScore: number;
    waveCt: number;
}
const ShapeStrikeWrapper = (props:props) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    

    return (
    <div>
        <NotMobile setIsMobile={setIsMobile}/>

        {!isMobile && <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-center items-center">
            <ShapeStrike />
            </div>
        </div>}
    </div>
    );
}

export default ShapeStrikeWrapper;