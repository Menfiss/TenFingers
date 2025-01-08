using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using TMPro;

public class GameEnd : MonoBehaviour
{

    [SerializeField] private TMP_Text scoreText;

    private void Start()
    {
        scoreText.text = ScoreManager.Instance.GetScore().ToString();
    }
    public void OnRestartClick()
    {
        SceneManager.LoadScene("Minigame");
    }
}
