using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.SceneManagement;

public class ScoreManager : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void GameOver(int waveCt, int score);

    private static int score = 0;
    private static int waveCt = 1;
    public static void OnGameOver()
    {
        TheEnd(waveCt,score);
        
    }

    private static void TheEnd(int waveCt, int score)
    {
        GameOver(waveCt, score);

    }



}
