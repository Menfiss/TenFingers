"use client";
import { useCallback, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";



function ShapeStrike() {
    const { unityProvider,requestFullscreen,addEventListener, removeEventListener } = useUnityContext({
      loaderUrl: "../../WebGL/ShapeStrike/Build/ShapeStrike.loader.js",
      dataUrl: "../../WebGL/ShapeStrike/Build/ShapeStrike.data",
      frameworkUrl: "../../WebGL/ShapeStrike/Build/ShapeStrike.framework.js",
      codeUrl: "../../WebGL/ShapeStrike/Build/ShapeStrike.wasm",
      streamingAssetsUrl: "../../WebGL/ShapeStrike/StreamingAssets",
      
    });

    const [score, setScore] = useState();
    const [waveCt, setWaveCt] = useState();

    const handleSetScore = useCallback((waveCt:any,score:any) => {
      setScore(score);
      setWaveCt(waveCt);
    }, []);
    
    useEffect(() => {
      addEventListener("GameOver", handleSetScore);
      return () => {
        removeEventListener("GameOver", handleSetScore);
      };
    }, [addEventListener, removeEventListener, handleSetScore]);
    
  
    return (
      <>
        <Unity unityProvider={unityProvider} className="h-[540px] w-[960px]"/>
        <button onClick={() => {requestFullscreen(true)}}>a</button>
        <div>{score}</div>
      </>
    
    );
  }

export default ShapeStrike;