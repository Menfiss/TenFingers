"use client"

import { format } from "node:path/win32";
import { useEffect, useState } from "react";

interface props{
    time: number;
    start: boolean;
    setFinish: (Finish: boolean) => void;
}

const Timer = (props:props) => {
    const [time, setTime] = useState(props.time);

    useEffect(() => {
        if (time > 0 && props.start) {
          const interval = setInterval(() => {
            setTime(time - 1);
          }, 1000);

          return () => clearInterval(interval); // Cleanup the interval on unmount
        }
        else if(time <= 0){
            props.setFinish(true);
        }
    }, [time,props.start]);

    const formatTime = (secs:number) => {
        const minutes = Math.floor(secs / 60);
        const remainingSeconds = secs % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
      };

    return (
        <div>
            {formatTime(time)}
        </div>
    )
}

export default Timer;