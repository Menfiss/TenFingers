using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using TMPro;

public class GameEnd : MonoBehaviour
{

    [SerializeField] private TMP_Text scoreText;
    [SerializeField] private TMP_Text waveText;
    [SerializeField] private TMP_Text[] killCts;
    [SerializeField] private EnemySO[] enemies; // horrible solution but it is what it is

    private void Start()
    {
        scoreText.text = "Score: " + ScoreManager.Instance.GetScore().ToString();
        waveText.text = "Wave: " + ScoreManager.Instance.GetWaveCt().ToString();
        for (int i = 0; i < enemies.Length; i++)
        {
            killCts[i].text = ScoreManager.Instance.GetKillCt(enemies[i]).ToString();
        }
    }
    public void OnRestartClick()
    {
        ScoreManager.Instance.SelfDestruct();
        SceneManager.LoadScene("Minigame");
    }
}
