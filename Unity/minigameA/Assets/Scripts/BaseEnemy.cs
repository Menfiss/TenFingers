using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class BaseEnemy : MonoBehaviour
{
    public EnemySO enemySO;
    public EnemySpawning enemySpawning;
    public Transform CanvasPrefab;
    public bool canMove = true; 
    public string text;

    public void Update()
    {
        if (canMove)
        {
            transform.position += Vector3.left * enemySO.speed * Time.deltaTime;
        }
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        ScoreManager.Instance.TheEnd();
        SceneManager.LoadScene("GameEnd");
        Destroy(gameObject);

    }

    public void OnDestroy()
    {
        enemySpawning.lettersInUse[(text[0] - 'a')] = 0;
    }
}
