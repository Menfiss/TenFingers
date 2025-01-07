"use server";
import ShapeStrikeWrapper from "@/components/ShapeStrikeWrapper/ShapeStrikeWrapper";
import { getHighScore } from "../../../../database/querries/shape_strike";


export default async function ShapeStrike() {
  const data = await getHighScore();

  return (
   <ShapeStrikeWrapper highScore={data ? data.highscore:0} waveCt={data ? data.wave_count:0}/>
  );

};

