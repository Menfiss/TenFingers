using System.Collections;
using System.Collections.Generic;
using System.IO;
using TMPro;
using UnityEngine;
using UnityEngine.Networking;

public class EnemySpawning : MonoBehaviour
{
    public TypingScript typingScript;
    [SerializeField] private GameObject[] spawnpoints;
    [SerializeField] private EnemySO[] enemySO;

    private List<EnemySO> currWave;
    private GameObject lastUsedSpawnpoint;

    int wave = 0;

    bool textLoaded = false;

    private Data simpleEnglish;
    private Data normalEnglish;
    private Data advancedEnglish;
    private Data expertEnglish;

    string simplePath = Path.Combine(Application.streamingAssetsPath, "english.json");
    string normalPath = Path.Combine(Application.streamingAssetsPath, "english_1k.json");
    string advancedPath = Path.Combine(Application.streamingAssetsPath, "english_5k.json");
    string expertPath = Path.Combine(Application.streamingAssetsPath, "english_25k.json");
    private void Awake()
    {
        StartCoroutine(LoadJson(simplePath, normalPath,advancedPath, expertPath));
        currWave = new List<EnemySO>();
    }

    float spawnTimer = 1f;
    float time = 0;
    void Update()
    {
        getWave();

        if(time >= spawnTimer && currWave.Count != 0 && textLoaded)
        {
            time = 0;
            spawnTimer = Random.Range(.5f, 3f);
            SpawnEnemy(currWave[0]);
            currWave.RemoveAt(0);
        }
        time += Time.deltaTime;
    }

    IEnumerator LoadJson(string simplePath, string normalPath, string advancedPath, string expertPath)
    {
        UnityWebRequest request1 = UnityWebRequest.Get(simplePath);
        yield return request1.SendWebRequest();

        UnityWebRequest request2 = UnityWebRequest.Get(normalPath);
        yield return request2.SendWebRequest();

        UnityWebRequest request3 = UnityWebRequest.Get(advancedPath);
        yield return request3.SendWebRequest();

        UnityWebRequest request4 = UnityWebRequest.Get(expertPath);
        yield return request4.SendWebRequest();

        if (request1.result == UnityWebRequest.Result.ConnectionError || request1.result == UnityWebRequest.Result.ProtocolError)
        {
            Debug.LogError($"Error loading JSON: {request1.error}");
        }
        else if (request2.result == UnityWebRequest.Result.ConnectionError || request2.result == UnityWebRequest.Result.ProtocolError)
        {
            Debug.LogError($"Error loading JSON: {request2.error}");
        }
        else if (request3.result == UnityWebRequest.Result.ConnectionError || request3.result == UnityWebRequest.Result.ProtocolError)
        {
            Debug.LogError($"Error loading JSON: {request3.error}");
        }
        else if (request4.result == UnityWebRequest.Result.ConnectionError || request4.result == UnityWebRequest.Result.ProtocolError)
        {
            Debug.LogError($"Error loading JSON: {request4.error}");
        }
        else
        {
            string jsonText = request1.downloadHandler.text;
            string jsonText2 = request2.downloadHandler.text;
            string jsonText3 = request3.downloadHandler.text;
            string jsonText4 = request4.downloadHandler.text;

            simpleEnglish = JsonUtility.FromJson<Data>(jsonText);
            normalEnglish = JsonUtility.FromJson<Data>(jsonText2);
            advancedEnglish = JsonUtility.FromJson<Data>(jsonText3);
            expertEnglish = JsonUtility.FromJson<Data>(jsonText4);

            textLoaded = true;

        }
    }


    private List<EnemySO> getUnlockedEnemies()
    {
        List<EnemySO> unlockedEnemies = new List<EnemySO>();

        for (int i = 0; i < enemySO.Length; i++)
        {
            if (enemySO[i].availableAtWave <= wave)
            {
                unlockedEnemies.Add(enemySO[i]);
            }
        }
        return unlockedEnemies;
    }

    private void getWave()
    {
        if (currWave.Count != 0 || typingScript.enemies.Count != 0) return;
        
        wave++;
        List<EnemySO> unlockedEnemies = getUnlockedEnemies();
        int value = 5 * wave;

        while (value != 0)
        {
            EnemySO enemy = unlockedEnemies[Random.Range(0, unlockedEnemies.Count)];
            if (enemy.cost <= value)
            {
                currWave.Add(enemy);
                value -= enemy.cost;
            }
        }
    }

    public void SpawnEnemy(EnemySO enemySO, Transform pos = null)
    {
        GameObject enemyObj;
        if (pos)
        {
            enemyObj = Instantiate(enemySO.enemyPrefab, pos.position,Quaternion.identity);
        }
        else
        {
            GameObject spawnpoint = spawnpoints[Random.Range(0, spawnpoints.Length)];
            while(spawnpoint == lastUsedSpawnpoint)
            {
                spawnpoint = spawnpoints[Random.Range(0, spawnpoints.Length)];
            }
            enemyObj = Instantiate(enemySO.enemyPrefab, spawnpoint.transform, false);
            lastUsedSpawnpoint = spawnpoint;
        }

        BaseEnemy baseEnemy = enemyObj.GetComponent<BaseEnemy>();
        baseEnemy.enemySO = enemySO;
        baseEnemy.enemySpawning = this;

        string textik = getText(enemySO);
        baseEnemy.CanvasPrefab.Find("Text").GetComponent<TMP_Text>().text = textik;
        baseEnemy.CanvasPrefab.Find("Text Highlighted").GetComponent<TMP_Text>().text = textik;

        typingScript.enemies.Add(new Enemy(enemyObj, textik));
    }

    private string getText(EnemySO enemySO)
    {
        switch(enemySO.difficulty)
        {
            case wordDifficulty.Letter:
                return ((char)('a' + Random.Range(0, 26))).ToString();
            case wordDifficulty.Simple:
                return simpleEnglish.words[Random.Range(0, simpleEnglish.words.Length - 1)];
            case wordDifficulty.Normal:
                return normalEnglish.words[Random.Range(0, normalEnglish.words.Length - 1)];
            case wordDifficulty.Advanced:
                return advancedEnglish.words[Random.Range(0, advancedEnglish.words.Length - 1)];
            case wordDifficulty.Expert:
                return expertEnglish.words[Random.Range(0, expertEnglish.words.Length - 1)];
            default:
                return simpleEnglish.words[Random.Range(0, simpleEnglish.words.Length - 1)];
        }
    }


}

public class Data
{
    private string name;
    public string[] words;
}

public class Enemy
{
    public GameObject enemy;
    public string text;
    public string defaultText;

    public Enemy(GameObject Enemy, string Text)
    {
        text = Text;
        defaultText = Text;
        enemy = Enemy;
    }
}

