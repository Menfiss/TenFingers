"use client";
import { useCallback, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

interface props{
  onCompleted: (waveCt:number, score:number) => void;
}

function ShapeStrike(props:props) {
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
      <div >
        <div className="flex flex-col justify-center items-center">
          <Unity unityProvider={unityProvider} className="h-[540px] w-[960px]"/>
        </div>
        <div className="flex flex-col items-end">
          <button className="p-8" onClick={() => {requestFullscreen(true)}}>
            <svg className="w-[50px] h-[50px] fill-[#8e8e8e]" viewBox="0 0 448 512">
              <path d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"></path>
            </svg>
          </button>
          </div>
      </div>
    
    );
  }

export default ShapeStrike;