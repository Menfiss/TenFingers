using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BaseEnemy : MonoBehaviour
{
    public EnemySO enemySO;
    public EnemySpawning enemySpawning;
    public Transform CanvasPrefab;
    public bool canMove = true; 

    public void Update()
    {
        if (canMove)
        {
            transform.position += Vector3.left * enemySO.speed * Time.deltaTime;
        }
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        Destroy(gameObject);
    }
}
