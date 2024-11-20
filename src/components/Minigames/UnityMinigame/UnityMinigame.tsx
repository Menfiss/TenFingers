"use client";
import { Unity, useUnityContext } from "react-unity-webgl";



function UnityMinigame() {
    const { unityProvider } = useUnityContext({
      loaderUrl: "../../WebGL/MinigameA/Build/Minigame.loader.js",
      dataUrl: "../../WebGL/MinigameA/Build/Minigame.data",
      frameworkUrl: "../../WebGL/MinigameA/Build/Minigame.framework.js",
      codeUrl: "../../WebGL/MinigameA/Build/Minigame.wasm",
      streamingAssetsUrl: "../../WebGL/MinigameA/StreamingAssets",
    });
  
    return <Unity unityProvider={unityProvider} className="h-1/2 w-1/2"/>;
  }

export default UnityMinigame;