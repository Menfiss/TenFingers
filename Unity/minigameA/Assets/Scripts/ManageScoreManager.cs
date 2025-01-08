using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;


public class ManageScoreManager : MonoBehaviour
{
    [SerializeField] private Slider slider;
    [SerializeField] private TMP_Text scoreText;
    [SerializeField] private TMP_Text comboText;
    [SerializeField] private GameObject scoreManager;

    private void Awake()
    {
        Instantiate(scoreManager);
        ScoreManager.Instance.slider = slider;
        ScoreManager.Instance.scoreText = scoreText;
        ScoreManager.Instance.comboText = comboText;
    }
}
