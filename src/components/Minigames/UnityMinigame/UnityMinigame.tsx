"use client";
import { Unity, useUnityContext } from "react-unity-webgl";



function UnityMinigame() {
    const { unityProvider } = useUnityContext({
      loaderUrl: "../../build/webgl/Minigame.loader.js",
      dataUrl: "../../build/webgl/Minigame.data",
      frameworkUrl: "../../build/webgl/Minigame.framework.js",
      codeUrl: "../../build/webgl/Minigame.wasm",
    });
  
    return <Unity unityProvider={unityProvider} className="h-1/2 w-1/2"/>;
  }

export default UnityMinigame;