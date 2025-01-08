using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using TMPro;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class ScoreManager : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void GameOver(int waveCt, int score);

    public static ScoreManager Instance;

    [SerializeField] private Slider slider;
    [SerializeField] private TMP_Text scoreText;
    [SerializeField] private TMP_Text comboText;

    private void Awake()
    {
        DontDestroyOnLoad(this);
        if (Instance != null && Instance != this)
        {
            Destroy(this);
            return;
        }

        Instance = this;
    }

    private void Start()
    {
        slider.maxValue = comboPoints[0];
        slider.value = 0;
        comboText.text = "1x";
        scoreText.text = "0";
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
        scoreText.text = score.ToString();
    }

    public int GetScore()
    {
        return score;
    }
    public void IncreaseCombo()
    {
        if (combo == 5) return;
        comboMeter++;
        slider.value = comboMeter;
        if (comboMeter == comboPoints[combo - 1])
        { 
            combo++;
            comboText.text = combo.ToString() + "x";
            comboMeter = combo == 5 ? 60:0;
            slider.maxValue = combo == 5 ? 60 : comboPoints[combo - 1];
            slider.value = comboMeter;
        }
    }

    public void ResetCombo()
    {
        combo = 1;
        comboMeter = 0;
        comboText.text = "1x";
        slider.maxValue = comboPoints[0];
        slider.value = 0;
    }

    public void TheEnd()
    {
        #if UNITY_WEBGL && !UNITY_EDITOR
        GameOver(waveCt, score);
        #endif

    }



}
