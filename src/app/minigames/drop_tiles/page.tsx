
import { getHighScore} from "../../../../database/querries/drop_tiles";
import FallingMinigameWrapper from "@/components/FallingMinigameWrapper/FallingMinigameWrapper";


const DropTilesPage = async() => {
   const highscore = await getHighScore();
    
    
    return(
        <>  
            <FallingMinigameWrapper highscore={highscore? highscore.highscore:0}/>
        </>
    );
};

export default DropTilesPage;
