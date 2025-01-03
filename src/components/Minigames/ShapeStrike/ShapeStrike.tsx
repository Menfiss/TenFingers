"use client";
import { Unity, useUnityContext } from "react-unity-webgl";



function ShapeStrike() {
    const { unityProvider } = useUnityContext({
      loaderUrl: "../../WebGL/ShapeStrike/Build/Minigame.loader.js",
      dataUrl: "../../WebGL/ShapeStrike/Build/Minigame.data",
      frameworkUrl: "../../WebGL/ShapeStrike/Build/Minigame.framework.js",
      codeUrl: "../../WebGL/ShapeStrike/Build/Minigame.wasm",
      streamingAssetsUrl: "../../WebGL/ShapeStrike/StreamingAssets",
      
    });
  
    return <Unity unityProvider={unityProvider} className="h-screen w-screen"/>;
  }

export default ShapeStrike;