using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using TMPro;


public class TypingScript : MonoBehaviour
{
    
    

    public List<Enemy> enemies = new List<Enemy>();
    private int currentEnemyIndex = -1;

    private void Update()
    {
        string letter = GetEXACTKey();

        if (letter == "") return;

        if(currentEnemyIndex >= 0)
        {
            TakeDamage(letter);
            return;
        }

        bool isFound = false;   
        for (int i = 0; i < enemies.Count; i++) 
        {
            if (enemies[i].text[0].ToString().ToLower() == letter)
            {
                currentEnemyIndex = i;
                TakeDamage(letter);
                isFound = true;
                break;
            }
        }
        if (!isFound)
        {
            ScoreManager.Instance.ResetCombo();
        }


    }
    private void TakeDamage(string letter)
    {
        string str = enemies[currentEnemyIndex].text;
        if (str[0].ToString().ToLower() == letter)
        {
            ScoreManager.Instance.IncreaseCombo();
            enemies[currentEnemyIndex].text = str.Substring(1, str.Length - 1);
            enemies[currentEnemyIndex].enemy.transform.Find("Canvas").transform.Find("Text").GetComponent<TMP_Text>().text = enemies[currentEnemyIndex].text.PadLeft(enemies[currentEnemyIndex].defaultText.Length);
        }
        else
        {
            ScoreManager.Instance.ResetCombo();
        }
        if (enemies[currentEnemyIndex].text == "")
        {
            ScoreManager.Instance.AddScore(enemies[currentEnemyIndex].defaultText.Length);
            Destroy(enemies[currentEnemyIndex].enemy);
            enemies.RemoveAt(currentEnemyIndex);
            currentEnemyIndex = -1;
        }
    }

    public void Heal()
    {
        if (currentEnemyIndex >= 0)
        {
            enemies[currentEnemyIndex].text = enemies[currentEnemyIndex].defaultText;
            enemies[currentEnemyIndex].enemy.transform.Find("Canvas").transform.Find("Text").GetComponent<TMP_Text>().text = enemies[currentEnemyIndex].text;
        }
    }
    
    private string GetEXACTKey()
    {
        string letter;

        if (Input.GetKeyDown(KeyCode.Q)) { letter = "q"; }
        else if (Input.GetKeyDown(KeyCode.W)) { letter = "w"; }
        else if (Input.GetKeyDown(KeyCode.E)) { letter = "e"; }
        else if (Input.GetKeyDown(KeyCode.R)) { letter = "r"; }
        else if (Input.GetKeyDown(KeyCode.T)) { letter = "t"; }
        else if (Input.GetKeyDown(KeyCode.Z)) { letter = "z"; }
        else if (Input.GetKeyDown(KeyCode.U)) { letter = "u"; }
        else if (Input.GetKeyDown(KeyCode.I)) { letter = "i"; }
        else if (Input.GetKeyDown(KeyCode.O)) { letter = "o"; }
        else if (Input.GetKeyDown(KeyCode.P)) { letter = "p"; }
        else if (Input.GetKeyDown(KeyCode.A)) { letter = "a"; }
        else if (Input.GetKeyDown(KeyCode.S)) { letter = "s"; }
        else if (Input.GetKeyDown(KeyCode.D)) { letter = "d"; }
        else if (Input.GetKeyDown(KeyCode.F)) { letter = "f"; }
        else if (Input.GetKeyDown(KeyCode.G)) { letter = "g"; }
        else if (Input.GetKeyDown(KeyCode.H)) { letter = "h"; }
        else if (Input.GetKeyDown(KeyCode.J)) { letter = "j"; }
        else if (Input.GetKeyDown(KeyCode.K)) { letter = "k"; }
        else if (Input.GetKeyDown(KeyCode.L)) { letter = "l"; }
        else if (Input.GetKeyDown(KeyCode.Y)) { letter = "y"; }
        else if (Input.GetKeyDown(KeyCode.X)) { letter = "x"; }
        else if (Input.GetKeyDown(KeyCode.C)) { letter = "c"; }
        else if (Input.GetKeyDown(KeyCode.V)) { letter = "v"; }
        else if (Input.GetKeyDown(KeyCode.B)) { letter = "b"; }
        else if (Input.GetKeyDown(KeyCode.N)) { letter = "n"; }
        else if (Input.GetKeyDown(KeyCode.M)) { letter = "m"; }
        else { return ""; }

        return letter;
    }
}

