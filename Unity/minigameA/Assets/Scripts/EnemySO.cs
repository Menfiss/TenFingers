using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public enum wordDifficulty
{
    Letter,
    Simple,
    Normal,
    Advanced,
    Expert

}
[CreateAssetMenu(fileName = "EnemySO", menuName = "EnemySO", order = 1)]
public class EnemySO : ScriptableObject
{
    public int cost;
    public int availableAtWave;
    public GameObject enemyPrefab;
    public float speed;
    public wordDifficulty difficulty;
}
