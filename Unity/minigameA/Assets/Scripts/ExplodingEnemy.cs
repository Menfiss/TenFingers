using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ExplodingEnemy : BaseEnemy
{
    private void OnDestroy()
    {
        // get colliders
        LayerMask mask = LayerMask.GetMask("Enemy");
        Collider2D[] colliders = Physics2D.OverlapCircleAll(transform.position, 4f,mask);

        //check every gameobject in colliders with enemies
        foreach (Collider2D hit in colliders)
        {
           for(int i = 0; i < enemySpawning.typingScript.enemies.Count; i++)
            {
                if(hit.gameObject == enemySpawning.typingScript.enemies[i].enemy)
                {
                    //if match, destroy it 
                    Destroy(enemySpawning.typingScript.enemies[i].enemy);
                    enemySpawning.typingScript.enemies.RemoveAt(i);
                    break;
                }
            }
        }
        


    }
}
