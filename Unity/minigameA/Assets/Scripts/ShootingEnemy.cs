using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ShootingEnemy : BaseEnemy
{

    [SerializeField] private EnemySO projectile;
    public float timer = 3;
    public float time = 0;

    new void Update()
    {
        base.Update();
        time += Time.deltaTime;
        if (time >= timer)
        {
            time = 0;
            enemySpawning.SpawnEnemy(projectile, transform);
        }
    }
}
