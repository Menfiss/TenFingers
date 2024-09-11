import FallingMinigame from "@/components/Minigames/FallingMinigame/FallingMinigame";
import TypingText from "../components/Minigames/TypingText/TypingText";
import IdleMinigame from "../components/Minigames/IdleMinigame/IdleMinigame";
import { createClient } from "../../utils/supabase/server";

export default function Home() {

  
  
  
  return (
   <>
    {/* <TypingText text="jfjffjj ffjfjjjff fjfjfj fjfjfjfj"></TypingText> */}
    {/* <FallingMinigame /> */}
    {/* <IdleMinigame /> */}
    
   </>
  );
}

// async function updateNickname(){
//   const supabase = createClient()
//   if(!(await supabase.auth.getUser()).data.user){
//     return "You are not logged in"
//   }
//   const {error} = await supabase.from('users').update({nickname: "98d5eefc-abab-405f-884d-87680dff43ba"}).eq("id", (await supabase.auth.getUser()).data.user?.id);
//   return error?.message
// }


