using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.SceneManagement;

public class ScoreManager : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void GameOver(int waveCt, int score);

    public static ScoreManager Instance;

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(this);
            return;
        }

        Instance = this;
    }

    private int[] comboPoints = { 5, 15, 30, 60 };
    int comboMeter = 0;
    private int score = 0;
    private int waveCt = 0;
    private int combo = 1;

    public void increaseWave()
    {
        waveCt++;
    }
    public void AddScore(int scoreToAdd)
    {
        score += scoreToAdd*combo;
    }

    public void IncreaseCombo()
    {
        if (combo == 5) return;
        comboMeter++;
        if (comboMeter == comboPoints[combo - 1])
        { 
            combo++;
            comboMeter = combo == 5 ? 60:0;
        }
    }

    public void ResetCombo()
    {
        combo = 1;
        comboMeter = 0;
    }

    public void TheEnd()
    {
        GameOver(waveCt, score);

    }



}
