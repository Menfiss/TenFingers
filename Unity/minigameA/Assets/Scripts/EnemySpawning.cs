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
    [SerializeField] private GameObject waveText;
    public int[] lettersInUse;

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
        lettersInUse = new int[26];
    }

    float spawnTimer = 1f;
    float time = 0;
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Alpha1))
        {
            SpawnEnemy(enemySO[0]);
        }
        else if (Input.GetKeyDown(KeyCode.Alpha2))
        {
            SpawnEnemy(enemySO[1]);
        }
        else if(Input.GetKeyDown(KeyCode.Alpha3))
        {
            SpawnEnemy(enemySO[2]);
        }
        else if (Input.GetKeyDown(KeyCode.Alpha4))
        {
            SpawnEnemy(enemySO[3]);
        }
        else if (Input.GetKeyDown(KeyCode.Alpha5))
        {
            SpawnEnemy(enemySO[4]);
        }
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
        ScoreManager.Instance.increaseWave();

        GameObject waveTx = Instantiate(waveText, new Vector3(0, 0, 0), Quaternion.identity);
        waveTx.transform.GetChild(0).GetComponent<TMP_Text>().text = "Wave " + wave;
        Destroy(waveTx, 1.5f);

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
        string textik = getText(enemySO);
        if(textik == "")
        {
            spawnTimer = 0;
            return;
        }
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
        baseEnemy.text = textik;

        baseEnemy.CanvasPrefab.Find("Text").GetComponent<TMP_Text>().text = textik;
        baseEnemy.CanvasPrefab.Find("Text Highlighted").GetComponent<TMP_Text>().text = textik;

        typingScript.enemies.Add(new Enemy(enemyObj, textik));
    }

    private string getText(EnemySO enemySO)
    {
        string txt;
        switch (enemySO.difficulty)
        {
            case wordDifficulty.Letter:
                txt = ((char)('a' + Random.Range(0, 26))).ToString();
                break;
            case wordDifficulty.Simple:
                txt = simpleEnglish.words[Random.Range(0, simpleEnglish.words.Length - 1)];
                break;
            case wordDifficulty.Normal:
                txt = normalEnglish.words[Random.Range(0, normalEnglish.words.Length - 1)];
                break;
            case wordDifficulty.Advanced:
                txt = advancedEnglish.words[Random.Range(0, advancedEnglish.words.Length - 1)];
                break;
            case wordDifficulty.Expert:
                txt = expertEnglish.words[Random.Range(0, expertEnglish.words.Length - 1)];
                break;
            default:
                txt = "";
                break;
        }
        
        if (lettersInUse[(txt[0] - 'a')] == 1)
        {
            txt = "";
        }
        else
        {
            lettersInUse[(txt[0] - 'a')] = 1;
        }

        return txt;
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

