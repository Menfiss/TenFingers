import { useEffect, useState } from "react";


const IdleMinigame = () => {

    const [score, setScore] = useState(0);
    const [currentChar, setCurrentChar] = useState("");

    

    const handleKeyDown = (event: KeyboardEvent) => {
        
    };

     //handles the keydown event
     useEffect(() => {
        
        window.addEventListener('keydown', handleKeyDown);
          
    
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
          };
      },[]);

    return (
        <div>
        </div>
    );
}

export default IdleMinigame;