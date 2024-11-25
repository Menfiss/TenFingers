using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ShootingEnemy : BaseEnemy
{

    [SerializeField] private EnemySO projectile;
    public float timer = 3;
    public float time = 0;
    private int stopDistance;

    private void Start()
    {
        stopDistance = Random.Range(3, 7);
    }
    new void Update()
    {
        base.Update();
        
        if(transform.position.x <= stopDistance) canMove = false;

        time += Time.deltaTime;
        if (time >= timer)
        {
            time = 0;
            enemySpawning.SpawnEnemy(projectile, transform);
        }
    }
}
