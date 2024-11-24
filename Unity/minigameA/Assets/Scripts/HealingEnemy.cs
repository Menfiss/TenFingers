using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HealingEnemy : BaseEnemy
{
    public float timer = 5;
    private float time = 0;

    private new void Update()
    {
        base.Update();
        time += Time.deltaTime;
        if (time >= timer)
        {
            time = 0;
           enemySpawning.typingScript.Heal();
        }
    }
}
